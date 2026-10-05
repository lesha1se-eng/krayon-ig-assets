/* Demo for Iryna Heneralova · shared data, i18n and rendering for all pages */
const EMAIL = 'i.heneralova@gmail.com';

const TOURS = {
  oldtown: {
    img: 'img/rynek.jpg', gal: ['img/wawel.jpg', 'img/mariacki.jpg', 'img/vistula.jpg', 'img/portal.jpg'],
    price: '450 zł', per: 'group', dur: { uk: '3 год', pl: '3 godz.', ru: '3 ч' }, km: '2,5 km', size: '1–10',
    tag: { uk: '⭐ Найпопулярніша', pl: '⭐ Najpopularniejsza', ru: '⭐ Самая популярная' },
    title: { uk: 'Королівський Краків: Старе місто і Вавель', pl: 'Królewski Kraków: Stare Miasto i Wawel', ru: 'Королевский Краков: Старый город и Вавель' },
    short: { uk: 'Головна прогулянка для першого знайомства з містом: Ринок, Сукенниці, Маріацький костел і королівський пагорб Вавель.', pl: 'Najważniejszy spacer na pierwsze spotkanie z miastem: Rynek, Sukiennice, Kościół Mariacki i królewskie wzgórze Wawel.', ru: 'Главная прогулка для первого знакомства с городом: Рынок, Суконные ряды, Мариацкий костёл и королевский холм Вавель.' },
    about: { uk: 'Ми пройдемо Королівським шляхом, яким колись їхали на коронацію польські королі. Ви дізнаєтесь, чому трубач на Маріацькій вежі обриває мелодію, що ховають Сукенниці і де жив вавельський дракон.', pl: 'Przejdziemy Drogą Królewską, którą jechali na koronację polscy królowie. Dowiesz się, dlaczego hejnał z wieży Mariackiej urywa się w połowie, co kryją Sukiennice i gdzie mieszkał smok wawelski.', ru: 'Мы пройдём Королевским путём, по которому когда-то ехали на коронацию польские короли. Вы узнаете, почему трубач на Мариацкой башне обрывает мелодию, что скрывают Суконные ряды и где жил вавельский дракон.' },
    route: {
      uk: [['Флоріанська брама і Барбакан', 'Початок Королівського шляху і середньовічні мури'], ['Головна ринкова площа', 'Сукенниці, ратушна вежа і легенди площі'], ['Маріацький костел', 'Вівтар Віта Ствоша і історія гейналу'], ['Вулиця Гродська', 'Найстаріші храми міста'], ['Вавель', 'Королівський замок, собор і печера дракона']],
      pl: [['Brama Floriańska i Barbakan', 'Początek Drogi Królewskiej i średniowieczne mury'], ['Rynek Główny', 'Sukiennice, wieża ratuszowa i legendy rynku'], ['Kościół Mariacki', 'Ołtarz Wita Stwosza i historia hejnału'], ['Ulica Grodzka', 'Najstarsze kościoły miasta'], ['Wawel', 'Zamek Królewski, katedra i Smocza Jama']],
      ru: [['Флорианские ворота и Барбакан', 'Начало Королевского пути и средневековые стены'], ['Главная рыночная площадь', 'Суконные ряды, ратушная башня и легенды площади'], ['Мариацкий костёл', 'Алтарь Вита Ствоша и история хейнала'], ['Улица Гродская', 'Самые старые храмы города'], ['Вавель', 'Королевский замок, собор и пещера дракона']]
    },
    incl: { uk: ['Прогулянка з гідом', 'Карта з рекомендаціями після екскурсії'], pl: ['Spacer z przewodnikiem', 'Mapa z rekomendacjami po wycieczce'], ru: ['Прогулка с гидом', 'Карта с рекомендациями после экскурсии'] },
    excl: { uk: ['Квитки до інтер\'єрів Вавелю'], pl: ['Bilety do wnętrz Wawelu'], ru: ['Билеты в интерьеры Вавеля'] }
  },
  kazimierz: {
    img: 'img/kaz1.jpg', gal: ['img/kaz2.jpg', 'img/kaz3.jpg'],
    price: '380 zł', per: 'group', dur: { uk: '2,5 год', pl: '2,5 godz.', ru: '2,5 ч' }, km: '2 km', size: '1–10',
    tag: { uk: '🕍 Атмосферний квартал', pl: '🕍 Klimatyczna dzielnica', ru: '🕍 Атмосферный квартал' },
    title: { uk: 'Казимир: квартал, у якому живе історія', pl: 'Kazimierz: dzielnica, w której żyje historia', ru: 'Казимеж: квартал, в котором живёт история' },
    short: { uk: 'Колись окреме місто, потім єврейський квартал, а сьогодні найатмосферніший район Кракова з кав\'ярнями і галереями.', pl: 'Kiedyś osobne miasto, potem dzielnica żydowska, a dziś najbardziej klimatyczna część Krakowa z kawiarniami i galeriami.', ru: 'Когда-то отдельный город, потом еврейский квартал, а сегодня самый атмосферный район Кракова с кофейнями и галереями.' },
    about: { uk: 'Синагоги, тихі подвір\'я і вулиці, де знімали «Список Шиндлера». Говоримо про шість століть співіснування культур і про те, як квартал ожив знову.', pl: 'Synagogi, ciche podwórka i ulice, na których kręcono „Listę Schindlera”. Mówimy o sześciu wiekach współistnienia kultur i o tym, jak dzielnica odżyła.', ru: 'Синагоги, тихие дворики и улицы, где снимали «Список Шиндлера». Говорим о шести веках сосуществования культур и о том, как квартал ожил снова.' },
    route: {
      uk: [['Площа Вольниця', 'Колишня ратуша міста Казимир'], ['Вулиця Юзефа', 'Двори і галереї'], ['Стара синагога', 'Найстаріша збережена синагога Польщі'], ['Площа Новий', 'Знамениті запеканки і місцеве життя']],
      pl: [['Plac Wolnica', 'Dawny ratusz miasta Kazimierz'], ['Ulica Józefa', 'Podwórka i galerie'], ['Stara Synagoga', 'Najstarsza zachowana synagoga w Polsce'], ['Plac Nowy', 'Słynne zapiekanki i lokalne życie']],
      ru: [['Площадь Вольница', 'Бывшая ратуша города Казимеж'], ['Улица Юзефа', 'Дворики и галереи'], ['Старая синагога', 'Старейшая сохранившаяся синагога Польши'], ['Площадь Новый', 'Знаменитые запеканки и местная жизнь']]
    },
    incl: { uk: ['Прогулянка з гідом', 'Список кав\'ярень Казимиру'], pl: ['Spacer z przewodnikiem', 'Lista kawiarni Kazimierza'], ru: ['Прогулка с гидом', 'Список кофеен Казимежа'] },
    excl: { uk: ['Вхід до синагог'], pl: ['Wstęp do synagog'], ru: ['Вход в синагоги'] }
  },
  wieliczka: {
    img: 'img/wie1.jpg', gal: ['img/wie2.jpg', 'img/wie3.jpg'],
    price: '300 zł', per: 'group', dur: { uk: '4–5 год', pl: '4–5 godz.', ru: '4–5 ч' }, km: '13 km', size: '1–8',
    tag: { uk: '⛏️ Під землею', pl: '⛏️ Pod ziemią', ru: '⛏️ Под землёй' },
    title: { uk: 'Величка: соляна шахта', pl: 'Wieliczka: Kopalnia Soli', ru: 'Величка: соляная шахта' },
    short: { uk: 'Підземне місто із солі за пів години від Кракова: каплиці, озера і скульптури, вирізані шахтарями.', pl: 'Podziemne miasto z soli pół godziny od Krakowa: kaplice, jeziora i rzeźby wykute przez górników.', ru: 'Подземный город из соли в получасе от Кракова: часовни, озёра и скульптуры, вырезанные шахтёрами.' },
    about: { uk: 'Допоможу з квитками і дорогою, розповім історію шахти ще до спуску, а внизу покажу, на що звернути увагу, щоб маршрут був не лише красивим, а й зрозумілим.', pl: 'Pomogę z biletami i dojazdem, opowiem historię kopalni jeszcze przed zejściem, a na dole pokażę, na co zwrócić uwagę.', ru: 'Помогу с билетами и дорогой, расскажу историю шахты ещё до спуска, а внизу покажу, на что обратить внимание.' },
    route: {
      uk: [['Дорога з Кракова', 'Потяг або авто, близько 30 хвилин'], ['Шахта Данилович', 'Спуск і початок туристичного маршруту'], ['Каплиця святої Кінги', 'Підземний храм, де все із солі'], ['Підземні озера', 'Фінал маршруту і підйом']],
      pl: [['Dojazd z Krakowa', 'Pociąg lub samochód, około 30 minut'], ['Szyb Daniłowicza', 'Zejście i początek trasy'], ['Kaplica św. Kingi', 'Podziemna świątynia z soli'], ['Podziemne jeziora', 'Finał trasy i wyjazd']],
      ru: [['Дорога из Кракова', 'Поезд или авто, около 30 минут'], ['Шахта Данилович', 'Спуск и начало маршрута'], ['Часовня святой Кинги', 'Подземный храм, где всё из соли'], ['Подземные озёра', 'Финал маршрута и подъём']]
    },
    incl: { uk: ['Супровід гіда', 'Допомога з квитками'], pl: ['Opieka przewodnika', 'Pomoc z biletami'], ru: ['Сопровождение гида', 'Помощь с билетами'] },
    excl: { uk: ['Вхідні квитки до шахти', 'Дорога'], pl: ['Bilety do kopalni', 'Dojazd'], ru: ['Входные билеты в шахту', 'Дорога'] }
  },
  evening: {
    img: 'img/night1.jpg', gal: ['img/night2.jpg', 'img/night3.jpg', 'img/mariacki.jpg'],
    price: '350 zł', per: 'group', dur: { uk: '2 год', pl: '2 godz.', ru: '2 ч' }, km: '2 km', size: '1–10',
    tag: { uk: '🌙 Після заходу сонця', pl: '🌙 Po zachodzie słońca', ru: '🌙 После заката' },
    title: { uk: 'Вечірній Краків і його легенди', pl: 'Wieczorny Kraków i jego legendy', ru: 'Вечерний Краков и его легенды' },
    short: { uk: 'Місто в ліхтарях: легенди, таємниці старих кам\'яниць і найкращі вечірні краєвиди. Ідеально для першого вечора.', pl: 'Miasto w świetle latarni: legendy, tajemnice starych kamienic i najpiękniejsze wieczorne widoki.', ru: 'Город в фонарях: легенды, тайны старых домов и лучшие вечерние виды. Идеально для первого вечера.' },
    about: { uk: 'Коли денні групи розходяться, Краків стає зовсім іншим. Прогулянка для пар, друзів і всіх, хто любить історії з таємницею.', pl: 'Gdy dzienne grupy znikają, Kraków staje się zupełnie inny. Spacer dla par, przyjaciół i miłośników tajemnic.', ru: 'Когда дневные группы расходятся, Краков становится совсем другим. Прогулка для пар, друзей и любителей историй с тайной.' },
    route: {
      uk: [['Костел святого Войцеха', 'Найстаріший храм на Ринку'], ['Collegium Novum', 'Ягеллонський університет у вечірньому світлі'], ['Театр Словацького', 'Найкрасивіший фасад вечірнього Кракова'], ['Маріацька вежа', 'Вечірній гейнал наостанок']],
      pl: [['Kościół św. Wojciecha', 'Najstarszy kościół na Rynku'], ['Collegium Novum', 'Uniwersytet Jagielloński w wieczornym świetle'], ['Teatr Słowackiego', 'Najpiękniejsza fasada wieczornego Krakowa'], ['Wieża Mariacka', 'Wieczorny hejnał na koniec']],
      ru: [['Костёл святого Войцеха', 'Самый старый храм на Рынке'], ['Collegium Novum', 'Ягеллонский университет в вечернем свете'], ['Театр Словацкого', 'Самый красивый фасад вечернего Кракова'], ['Мариацкая башня', 'Вечерний хейнал напоследок']]
    },
    incl: { uk: ['Прогулянка з гідом', 'Рекомендації, де повечеряти'], pl: ['Spacer z przewodnikiem', 'Polecane miejsca na kolację'], ru: ['Прогулка с гидом', 'Рекомендации, где поужинать'] },
    excl: { uk: ['Вечеря'], pl: ['Kolacja'], ru: ['Ужин'] }
  }
};
const ORDER = ['oldtown', 'kazimierz', 'wieliczka', 'evening'];

const REVIEWS = [
  { t: 'oldtown', n: 'Олена', from: { uk: 'Київ', pl: 'Kijów', ru: 'Киев' }, txt: { uk: '«Три години пролетіли непомітно. Ірина розповідає так, що хочеться слухати ще. Дякуємо за кав\'ярню після Вавелю!»', pl: '„Trzy godziny minęły niepostrzeżenie. Iryna opowiada tak, że chce się słuchać dalej. Dziękujemy za kawiarnię po Wawelu!”', ru: '«Три часа пролетели незаметно. Ирина рассказывает так, что хочется слушать ещё. Спасибо за кофейню после Вавеля!»' } },
  { t: 'kazimierz', n: 'Andrzej', from: { uk: 'Варшава', pl: 'Warszawa', ru: 'Варшава' }, txt: { uk: '«Мешкаю в Польщі давно, але Казимир по-справжньому побачив лише з Іриною.»', pl: '„Mieszkam w Polsce od dawna, ale Kazimierz naprawdę zobaczyłem dopiero z Iryną.”', ru: '«Давно живу в Польше, но Казимеж по-настоящему увидел только с Ириной.»' } },
  { t: 'wieliczka', n: 'Марина', from: { uk: 'Львів', pl: 'Lwów', ru: 'Львов' }, txt: { uk: '«Ірина допомогла з квитками і дорогою, а в шахті розповіла більше, ніж аудіогід. Діти в захваті.»', pl: '„Iryna pomogła z biletami i dojazdem, a w kopalni opowiedziała więcej niż audioprzewodnik. Dzieci zachwycone.”', ru: '«Ирина помогла с билетами и дорогой, а в шахте рассказала больше, чем аудиогид. Дети в восторге.»' } },
  { t: 'evening', n: 'Ігор і Таня', from: { uk: 'Дніпро', pl: 'Dniepr', ru: 'Днепр' }, txt: { uk: '«Вечірня прогулянка стала найромантичнішим моментом поїздки. Легенди про дракона діти тепер переказують усім.»', pl: '„Wieczorny spacer był najbardziej romantycznym momentem podróży.”', ru: '«Вечерняя прогулка стала самым романтичным моментом поездки.»' } },
  { t: 'oldtown', n: 'Світлана', from: { uk: 'Одеса', pl: 'Odessa', ru: 'Одесса' }, txt: { uk: '«Все чітко, з гумором і без поспіху. Рекомендую всім, хто вперше в Кракові.»', pl: '„Wszystko jasno, z humorem i bez pośpiechu. Polecam każdemu, kto jest w Krakowie pierwszy raz.”', ru: '«Всё чётко, с юмором и без спешки. Рекомендую всем, кто впервые в Кракове.»' } },
  { t: 'kazimierz', n: 'Katarzyna', from: { uk: 'Вроцлав', pl: 'Wrocław', ru: 'Вроцлав' }, txt: { uk: '«Дуже тепла екскурсія і чудові рекомендації, куди піти далі.»', pl: '„Bardzo ciepła wycieczka i świetne rekomendacje, gdzie iść dalej.”', ru: '«Очень тёплая экскурсия и отличные рекомендации, куда пойти дальше.»' } }
];

const T = {
  sub: { uk: 'Гід по Кракову', pl: 'Przewodnik po Krakowie', ru: 'Гид по Кракову' },
  n_tours: { uk: 'Екскурсії', pl: 'Wycieczki', ru: 'Экскурсии' }, n_about: { uk: 'Про мене', pl: 'O mnie', ru: 'Обо мне' }, n_rev: { uk: 'Відгуки', pl: 'Opinie', ru: 'Отзывы' }, n_faq: { uk: 'Питання', pl: 'Pytania', ru: 'Вопросы' }, n_book: { uk: 'Забронювати', pl: 'Zarezerwuj', ru: 'Забронировать' },
  kick: { uk: 'Краків · екскурсії українською, польською, російською', pl: 'Kraków · wycieczki po ukraińsku, polsku i rosyjsku', ru: 'Краков · экскурсии на украинском, польском, русском' },
  h1: { uk: 'Краків, який ви <em>запам\'ятаєте</em>', pl: 'Kraków, który <em>zapamiętasz</em>', ru: 'Краков, который вы <em>запомните</em>' },
  lead: { uk: 'Індивідуальні екскурсії Королівським містом з гідом, яка тут живе. Легенди, історії і місця, куди не водять туристичні групи.', pl: 'Indywidualne wycieczki po Królewskim Mieście z przewodniczką, która tu mieszka. Legendy, historie i miejsca, do których nie chodzą grupy.', ru: 'Индивидуальные экскурсии по Королевскому городу с гидом, которая здесь живёт. Легенды, истории и места, куда не водят туристические группы.' },
  cta1: { uk: 'Обрати екскурсію', pl: 'Wybierz wycieczkę', ru: 'Выбрать экскурсию' }, cta2: { uk: 'Написати мені', pl: 'Napisz do mnie', ru: 'Написать мне' },
  f1: { uk: 'мови: українська, польська, російська', pl: 'języki: ukraiński, polski, rosyjski', ru: 'языка: украинский, польский, русский' },
  f2: { uk: 'авторські маршрути', pl: 'autorskie trasy', ru: 'авторских маршрута' }, f3: { uk: 'лише ваша група', pl: 'tylko Twoja grupa', ru: 'только ваша группа' },
  w1: { uk: 'Рідною мовою', pl: 'W Twoim języku', ru: 'На родном языке' }, w1p: { uk: 'Без навушників і перекладу', pl: 'Bez słuchawek i tłumaczenia', ru: 'Без наушников и перевода' },
  w2: { uk: 'Тільки ваша група', pl: 'Tylko Twoja grupa', ru: 'Только ваша группа' }, w2p: { uk: 'Темп і зупинки під вас', pl: 'Tempo i przerwy dla Ciebie', ru: 'Темп и остановки под вас' },
  w3: { uk: 'Місцеві адреси', pl: 'Lokalne adresy', ru: 'Местные адреса' }, w3p: { uk: 'Де поїсти і що подивитись далі', pl: 'Gdzie zjeść i co zobaczyć dalej', ru: 'Где поесть и что посмотреть дальше' },
  w4: { uk: 'Зручне бронювання', pl: 'Wygodna rezerwacja', ru: 'Удобное бронирование' }, w4p: { uk: 'Відповідаю протягом кількох годин', pl: 'Odpowiadam w ciągu kilku godzin', ru: 'Отвечаю в течение нескольких часов' },
  t_e: { uk: 'Маршрути', pl: 'Trasy', ru: 'Маршруты' }, t_h: { uk: 'Оберіть свою прогулянку Краковом', pl: 'Wybierz swój spacer po Krakowie', ru: 'Выберите свою прогулку по Кракову' },
  t_p: { uk: 'Натисніть на екскурсію, щоб побачити маршрут, ціну і що входить.', pl: 'Kliknij wycieczkę, aby zobaczyć trasę, cenę i co jest w cenie.', ru: 'Нажмите на экскурсию, чтобы увидеть маршрут, цену и что входит.' },
  group: { uk: 'за групу', pl: 'za grupę', ru: 'за группу' }, more: { uk: 'Детальніше →', pl: 'Szczegóły →', ru: 'Подробнее →' },
  a_e: { uk: 'Про мене', pl: 'O mnie', ru: 'Обо мне' }, a_h: { uk: 'Привіт, я Ірина', pl: 'Cześć, jestem Iryna', ru: 'Привет, я Ирина' },
  a_p1: { uk: 'Я живу в Кракові і показую місто так, як його бачать місцеві: з історіями, легендами і улюбленими адресами.', pl: 'Mieszkam w Krakowie i pokazuję miasto tak, jak widzą je mieszkańcy: z historiami, legendami i ulubionymi adresami.', ru: 'Я живу в Кракове и показываю город так, как его видят местные: с историями, легендами и любимыми адресами.' },
  a_p2: { uk: 'Тут буде ваша історія: як ви стали гідом, що любите в Кракові і чому гості повертаються до вас знову.', pl: 'Tu będzie Twoja historia: jak zostałaś przewodniczką i co kochasz w Krakowie.', ru: 'Здесь будет ваша история: как вы стали гидом и что любите в Кракове.' },
  ph1: { uk: 'Тут буде ваше фото', pl: 'Tu będzie Twoje zdjęcie', ru: 'Здесь будет ваше фото' },
  r_e: { uk: 'Відгуки', pl: 'Opinie', ru: 'Отзывы' }, r_h: { uk: 'Що кажуть гості', pl: 'Co mówią goście', ru: 'Что говорят гости' }, r_all: { uk: 'Усі відгуки →', pl: 'Wszystkie opinie →', ru: 'Все отзывы →' },
  r_note: { uk: '* У демо відгуки для прикладу. На сайті будуть ваші справжні відгуки.', pl: '* W wersji demo opinie są przykładowe.', ru: '* В демо отзывы для примера.' },
  q_e: { uk: 'Питання', pl: 'Pytania', ru: 'Вопросы' }, q_h: { uk: 'Часті питання', pl: 'Częste pytania', ru: 'Частые вопросы' },
  q1: { uk: 'Де ми зустрічаємось?', pl: 'Gdzie się spotykamy?', ru: 'Где мы встречаемся?' }, a1: { uk: 'Біля пам\'ятника Адаму Міцкевичу на Ринку або в іншому зручному для вас місці. Точку надішлю після бронювання.', pl: 'Przy pomniku Adama Mickiewicza na Rynku lub w innym wygodnym miejscu.', ru: 'У памятника Адаму Мицкевичу на Рынке или в другом удобном месте.' },
  q2: { uk: 'Можна з дітьми?', pl: 'Czy można z dziećmi?', ru: 'Можно с детьми?' }, a2: { uk: 'Звісно. Для дітей є легенди про дракона і маленькі завдання, а темп підлаштуємо.', pl: 'Oczywiście. Dla dzieci mam legendy o smoku i małe zadania.', ru: 'Конечно. Для детей есть легенды о драконе и маленькие задания.' },
  q3: { uk: 'Як оплатити?', pl: 'Jak zapłacić?', ru: 'Как оплатить?' }, a3: { uk: 'На місці готівкою або переказом. Скасувати можна безкоштовно за 24 години.', pl: 'Na miejscu gotówką lub przelewem. Bezpłatna rezygnacja do 24 godzin przed.', ru: 'На месте наличными или переводом. Отменить можно бесплатно за 24 часа.' },
  b_e: { uk: 'Бронювання', pl: 'Rezerwacja', ru: 'Бронирование' }, b_h: { uk: 'Оберіть дату, решту я підкажу', pl: 'Wybierz datę, resztą zajmę się ja', ru: 'Выберите дату, остальное я подскажу' },
  b_p: { uk: 'Відповідаю протягом кількох годин.', pl: 'Odpowiadam w ciągu kilku godzin.', ru: 'Отвечаю в течение нескольких часов.' },
  l_tour: { uk: 'Екскурсія', pl: 'Wycieczka', ru: 'Экскурсия' }, l_date: { uk: 'Дата', pl: 'Data', ru: 'Дата' }, l_ppl: { uk: 'Кількість гостей', pl: 'Liczba gości', ru: 'Количество гостей' }, l_name: { uk: 'Ваше ім\'я', pl: 'Imię', ru: 'Ваше имя' }, l_msg: { uk: 'Побажання', pl: 'Życzenia', ru: 'Пожелания' },
  send: { uk: 'Надіслати запит', pl: 'Wyślij zapytanie', ru: 'Отправить запрос' }, own: { uk: 'Свій маршрут', pl: 'Własna trasa', ru: 'Свой маршрут' },
  c_mess: { uk: 'Месенджери', pl: 'Komunikatory', ru: 'Мессенджеры' }, c_messp: { uk: 'Тут будуть ваші WhatsApp, Viber чи Telegram', pl: 'Tu będą Twoje WhatsApp, Viber lub Telegram', ru: 'Здесь будут ваши WhatsApp, Viber или Telegram' },
  sent: { uk: '✅ Відкриваємо пошту з таким запитом:\n\n', pl: '✅ Otwieramy pocztę z zapytaniem:\n\n', ru: '✅ Открываем почту с таким запросом:\n\n' },
  // tour page
  home: { uk: 'Головна', pl: 'Strona główna', ru: 'Главная' }, d_dur: { uk: 'Тривалість', pl: 'Czas trwania', ru: 'Длительность' }, d_km: { uk: 'Маршрут', pl: 'Trasa', ru: 'Маршрут' }, d_size: { uk: 'Група', pl: 'Grupa', ru: 'Группа' }, d_lang: { uk: 'Мови', pl: 'Języki', ru: 'Языки' },
  t_about: { uk: 'Про екскурсію', pl: 'O wycieczce', ru: 'Об экскурсии' }, t_route: { uk: 'Маршрут', pl: 'Trasa', ru: 'Маршрут' }, t_in: { uk: 'Входить у ціну', pl: 'W cenie', ru: 'Входит в цену' }, t_out: { uk: 'Оплачується окремо', pl: 'Płatne osobno', ru: 'Оплачивается отдельно' },
  t_book: { uk: 'Забронювати цю екскурсію', pl: 'Zarezerwuj tę wycieczkę', ru: 'Забронировать эту экскурсию' }, t_others: { uk: 'Інші екскурсії', pl: 'Inne wycieczki', ru: 'Другие экскурсии' },
  t_s1: { uk: '✓ Тільки ваша група', pl: '✓ Tylko Twoja grupa', ru: '✓ Только ваша группа' }, t_s2: { uk: '✓ Безкоштовне скасування за 24 год', pl: '✓ Bezpłatna rezygnacja do 24 h', ru: '✓ Бесплатная отмена за 24 ч' }, t_s3: { uk: '✓ Оплата на місці', pl: '✓ Płatność na miejscu', ru: '✓ Оплата на месте' },
  p_note: { uk: '* Маршрути і ціни в демо для прикладу, підставимо ваші.', pl: '* Trasy i ceny w wersji demo są przykładowe.', ru: '* Маршруты и цены в демо для примера.' },
  // reviews page
  rp_h: { uk: 'Відгуки гостей', pl: 'Opinie gości', ru: 'Отзывы гостей' }, rp_all: { uk: 'Усі', pl: 'Wszystkie', ru: 'Все' }, rp_score: { uk: 'середня оцінка гостей', pl: 'średnia ocena gości', ru: 'средняя оценка гостей' }
};

let lang = 'uk';
try { lang = localStorage.getItem('ih-lang') || 'uk'; } catch (e) {}
const qp = new URLSearchParams(location.search);
if (['uk', 'pl', 'ru'].includes(qp.get('lang'))) lang = qp.get('lang');
const tr = (o) => (o && (o[lang] ?? o.uk)) ?? '';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

function applyStatic() {
  document.documentElement.lang = lang === 'uk' ? 'uk' : lang;
  document.querySelectorAll('[data-t]').forEach(el => { const v = T[el.dataset.t]; if (v) el.innerHTML = tr(v); });
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
}
function setLang(l) { lang = l; try { localStorage.setItem('ih-lang', l); } catch (e) {} render(); }

function tourCard(id) {
  const t = TOURS[id];
  return `<a class="tcard reveal" href="tour.html?t=${id}"><div class="ph"><img loading="lazy" src="${t.img}" alt=""><span class="tag">${tr(t.tag)}</span><span class="dur"><span>⏱ ${tr(t.dur)}</span><span>👣 ${t.km}</span></span></div>
  <div class="body"><h3>${tr(t.title)}</h3><p>${tr(t.short)}</p><div class="bottom"><div class="price">${t.price}<small>${tr(T.group)}</small></div><span class="more">${tr(T.more)}</span></div></div></a>`;
}
function reviewCard(r) {
  return `<div class="rev reveal"><div class="stars">★★★★★</div><p>${tr(r.txt)}</p><div class="who"><i>${esc(r.n[0])}</i><div>${esc(r.n)}<small>${tr(r.from)} · ${tr(TOURS[r.t].title)}</small></div></div></div>`;
}
function bookingForm(sel) {
  const opts = ORDER.map(id => `<option value="${id}"${id === sel ? ' selected' : ''}>${tr(TOURS[id].title)}</option>`).join('') + `<option value="own">${tr(T.own)}</option>`;
  return `<form id="f"><label><span>${tr(T.l_tour)}</span><select id="ftour">${opts}</select></label>
  <div class="row2"><label><span>${tr(T.l_date)}</span><input type="date" id="fdate"></label><label><span>${tr(T.l_ppl)}</span><input type="number" id="fppl" min="1" max="30" value="2"></label></div>
  <label><span>${tr(T.l_name)}</span><input id="fname"></label><label><span>${tr(T.l_msg)}</span><textarea id="fmsg"></textarea></label>
  <button class="btn gold" type="submit">${tr(T.send)}</button><div class="pv" id="pv"></div></form>`;
}
function wireForm() {
  const f = document.getElementById('f'); if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault(); const v = id => document.getElementById(id).value; const s = document.getElementById('ftour');
    const body = `${s.options[s.selectedIndex].text}\n📅 ${v('fdate') || '—'} · 👥 ${v('fppl')}\n🙋 ${v('fname') || '—'}\n💬 ${v('fmsg') || '—'}`;
    const pv = document.getElementById('pv'); pv.textContent = tr(T.sent) + body; pv.classList.add('show');
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(s.options[s.selectedIndex].text)}&body=${encodeURIComponent(body)}`;
  });
}
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}
function render() {
  applyStatic();
  const page = document.body.dataset.page;
  if (page === 'home') {
    document.getElementById('tourlist').innerHTML = ORDER.map(tourCard).join('');
    document.getElementById('revs').innerHTML = REVIEWS.slice(0, 3).map(reviewCard).join('');
    document.getElementById('bookf').innerHTML = bookingForm();
  }
  if (page === 'tour') {
    const id = TOURS[qp.get('t')] ? qp.get('t') : 'oldtown', t = TOURS[id];
    document.title = tr(t.title) + ' · Ірина Генералова';
    document.getElementById('timg').src = t.img;
    document.getElementById('ttitle').textContent = tr(t.title);
    document.getElementById('tcrumb').textContent = tr(t.title);
    document.getElementById('tfacts').innerHTML = [[T.d_dur, tr(t.dur)], [T.d_km, t.km], [T.d_size, t.size], [T.d_lang, 'UA · PL · RU']].map(([k, v]) => `<div><small>${tr(k)}</small><b>${v}</b></div>`).join('');
    document.getElementById('tabout').textContent = tr(t.about);
    document.getElementById('troute').innerHTML = tr(t.route).map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('');
    document.getElementById('tin').innerHTML = tr(t.incl).map(x => `<li>✓ ${x}</li>`).join('');
    document.getElementById('tout').innerHTML = tr(t.excl).map(x => `<li>✕ ${x}</li>`).join('');
    document.getElementById('tgal').innerHTML = t.gal.map(g => `<figure class="ph"><img loading="lazy" src="${g}" alt=""></figure>`).join('');
    document.getElementById('tprice').innerHTML = `${t.price}<small>${tr(T.group)}</small>`;
    document.getElementById('tothers').innerHTML = ORDER.filter(x => x !== id).map(x => `<a href="tour.html?t=${x}"><figure class="ph"><img loading="lazy" src="${TOURS[x].img}" alt=""></figure><b>${tr(TOURS[x].title)}</b></a>`).join('');
    document.getElementById('trevs').innerHTML = REVIEWS.filter(r => r.t === id).map(reviewCard).join('');
    document.getElementById('bookf').innerHTML = bookingForm(id);
  }
  if (page === 'reviews') {
    const cur = document.body.dataset.filter || 'all';
    document.getElementById('chips').innerHTML = `<button data-f="all" class="${cur === 'all' ? 'on' : ''}">${tr(T.rp_all)}</button>` + ORDER.map(id => `<button data-f="${id}" class="${cur === id ? 'on' : ''}">${tr(TOURS[id].title)}</button>`).join('');
    document.getElementById('allrevs').innerHTML = REVIEWS.filter(r => cur === 'all' || r.t === cur).map(reviewCard).join('');
    document.querySelectorAll('#chips button').forEach(b => b.onclick = () => { document.body.dataset.filter = b.dataset.f; render(); });
  }
  wireForm(); reveal();
}
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.l)));
document.querySelectorAll('.ph img').forEach(i => i.addEventListener('error', () => i.style.opacity = 0));
render();
