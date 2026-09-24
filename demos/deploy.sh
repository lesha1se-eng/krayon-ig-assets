#!/usr/bin/env bash
# Викладає демо на сервер, не чіпаючи наявних сайтів і конфігів.
# Використання: curl -fsSL <raw-url>/demos/deploy.sh | bash -s golden-duck
set -euo pipefail

NAME="${1:-golden-duck}"
BRANCH="claude/projects-memory-qam8bz"
RAW="https://raw.githubusercontent.com/lesha1se-eng/krayon-ig-assets/${BRANCH}/demos"
ROOT="/var/www/krayon-demos"

mkdir -p "${ROOT}/${NAME}"
curl -fsSL "${RAW}/${NAME}/index.html" -o "${ROOT}/${NAME}/index.html"
echo "✓ Файл демо завантажено: ${ROOT}/${NAME}/index.html"

# Якщо демо-сервер уже запускався раніше, спершу зупиняємо його, щоб не плутати з чужим сайтом
systemctl stop krayon-demos.service 2>/dev/null || true

# Порт 80 беремо лише якщо він вільний, інакше окремий 8080
if ss -ltn | awk '{print $4}' | grep -qE '(^|:)80$'; then
  PORT=8080
  echo "• Порт 80 вже зайнятий іншим сайтом, його не чіпаю. Використовую 8080."
else
  PORT=80
fi

# Окремий маленький сервер тільки для демо (не nginx, не apache, нічого не перезаписує)
cat > /etc/systemd/system/krayon-demos.service <<UNIT
[Unit]
Description=Krayon demo sites (static)
After=network.target

[Service]
WorkingDirectory=${ROOT}
ExecStart=/usr/bin/python3 -m http.server ${PORT} --bind 0.0.0.0
Restart=always

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable --now krayon-demos.service >/dev/null 2>&1
systemctl restart krayon-demos.service

if command -v ufw >/dev/null && ufw status | grep -q "Status: active"; then
  ufw allow "${PORT}/tcp" >/dev/null
  echo "• Відкрив порт ${PORT} у ufw"
fi

IP=$(curl -fsS -4 https://ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
sleep 1
if curl -fsS -o /dev/null "http://127.0.0.1:${PORT}/${NAME}/"; then
  if [ "$PORT" = "80" ]; then URL="http://${IP}/${NAME}/"; else URL="http://${IP}:${PORT}/${NAME}/"; fi
  echo ""
  echo "✅ Готово! Посилання для клієнта:"
  echo "   ${URL}"
else
  echo "❌ Сервер демо не відповідає. Надішли скрін цього екрана."
  systemctl status krayon-demos.service --no-pager | tail -5
fi
