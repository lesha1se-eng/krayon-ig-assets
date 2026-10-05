#!/usr/bin/env python3
"""Downloads photos for demo sites (runs on GitHub Actions, which has open internet).

Request file format (JSON):
  {"pool": [ {"name": "...", "q": "...", "src": ["unsplash","commons"], "n": 8, "w": 900}, ... ],
   "get":  [ {"url": "...", "out": "demos/x/img/hero.jpg", "w": 2000}, ... ]}
"pool" jobs search and save candidates to demos/_pool/<name>/ plus a manifest.
"get" jobs download exact URLs to exact paths (final, hi-res images).
"""
import io, json, os, re, sys, time, urllib.parse, urllib.request
from PIL import Image

UA = "KrayonDemoFetcher/1.0 (+https://krayon.site; krayon.it.agency@gmail.com)"
BROWSER_UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
              "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


def fetch(url, ua=UA, accept="*/*", tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": ua, "Accept": accept,
                                                       "Accept-Language": "en-US,en;q=0.9"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(2 * (i + 1))
    raise last


def unsplash(q, n, w):
    url = "https://unsplash.com/napi/search/photos?" + urllib.parse.urlencode({"query": q, "per_page": 30})
    data = json.loads(fetch(url, ua=BROWSER_UA, accept="application/json"))
    out = []
    for r in data.get("results", []):
        if r.get("premium") or r.get("plus"):
            continue
        raw = r["urls"]["raw"]
        sep = "&" if "?" in raw else "?"
        out.append({"src": "unsplash", "id": r["id"], "raw": raw,
                    "url": raw + sep + f"w={w}&q=72&fm=jpg&fit=max",
                    "w": r.get("width"), "h": r.get("height"),
                    "alt": r.get("alt_description") or r.get("description") or "",
                    "author": (r.get("user") or {}).get("name", ""),
                    "page": (r.get("links") or {}).get("html", "")})
        if len(out) >= n:
            break
    return out


def commons(q, n, w):
    params = {"action": "query", "format": "json", "generator": "search", "gsrnamespace": 6,
              "gsrsearch": q + " filetype:bitmap", "gsrlimit": 30, "prop": "imageinfo",
              "iiprop": "url|size|extmetadata", "iiurlwidth": w}
    data = json.loads(fetch("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)))
    pages = sorted(((data.get("query") or {}).get("pages") or {}).values(), key=lambda p: p.get("index", 0))
    out = []
    for p in pages:
        ii = (p.get("imageinfo") or [{}])[0]
        if not ii.get("thumburl") or (ii.get("width") or 0) < 1600:
            continue
        meta = ii.get("extmetadata") or {}
        out.append({"src": "commons", "id": p["title"], "url": ii["thumburl"], "orig": ii.get("url"),
                    "w": ii.get("width"), "h": ii.get("height"), "alt": p["title"],
                    "author": re.sub("<[^>]+>", "", (meta.get("Artist") or {}).get("value", ""))[:80],
                    "license": (meta.get("LicenseShortName") or {}).get("value", ""),
                    "page": ii.get("descriptionurl", "")})
        if len(out) >= n:
            break
    return out


def openverse(q, n, w, source=None):
    params = {"q": q, "license_type": "commercial", "page_size": 30, "mature": "false",
              "category": "photograph"}
    if source:
        params["source"] = source
    url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(params)
    data = json.loads(fetch(url, accept="application/json"))
    out = []
    for r in data.get("results", []):
        if (r.get("width") or 0) and r["width"] < 1600:
            continue
        out.append({"src": "openverse", "id": r.get("id"), "url": r.get("url"), "w": r.get("width"),
                    "h": r.get("height"), "alt": r.get("title", ""), "author": r.get("creator", ""),
                    "license": r.get("license", ""), "page": r.get("foreign_landing_url", "")})
        if len(out) >= n:
            break
    return out


SOURCES = {"unsplash": unsplash, "commons": commons, "openverse": openverse}


def save_jpg(data, path, w, quality=74):
    im = Image.open(io.BytesIO(data)).convert("RGB")
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    return im.size


def main(req_path):
    req = json.load(open(req_path))
    log = []
    for job in req.get("pool", []):
        name, q, n, w = job["name"], job["q"], job.get("n", 8), job.get("w", 900)
        items = []
        for s in job.get("src", ["unsplash"]):
            try:
                if s == "openverse":
                    items += openverse(q, n, w, job.get("ov_source"))
                else:
                    items += SOURCES[s](q, n, w)
                time.sleep(1)
            except Exception as e:  # noqa: BLE001
                log.append(f"[{name}] {s} search failed: {e}")
        manifest = []
        for i, it in enumerate(items):
            path = f"demos/_pool/{name}/{i:02d}-{it['src']}.jpg"
            try:
                size = save_jpg(fetch(it["url"], ua=BROWSER_UA if it["src"] == "unsplash" else UA), path, w)
                it.update({"file": path, "saved": size})
                manifest.append(it)
            except Exception as e:  # noqa: BLE001
                log.append(f"[{name}] download failed {it['url'][:90]}: {e}")
        os.makedirs(f"demos/_pool/{name}", exist_ok=True)
        json.dump(manifest, open(f"demos/_pool/{name}/manifest.json", "w"), ensure_ascii=False, indent=1)
        log.append(f"[{name}] saved {len(manifest)}")
    for g in req.get("get", []):
        try:
            ua = BROWSER_UA if ("unsplash" in g["url"] or "pexels" in g["url"]) else UA
            size = save_jpg(fetch(g["url"], ua=ua), g["out"], g.get("w", 2000), g.get("quality", 78))
            log.append(f"[get] {g['out']} {size}")
        except Exception as e:  # noqa: BLE001
            log.append(f"[get] FAILED {g['out']}: {e}")
    os.makedirs("demos/_pool", exist_ok=True)
    open("demos/_pool/fetch-log.txt", "w").write("\n".join(log) + "\n")
    print("\n".join(log))


if __name__ == "__main__":
    main(sys.argv[1])
