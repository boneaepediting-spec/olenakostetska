import { useState, useEffect } from 'react'

/* ════════════════════════════════════════════════════════════════
   ОДИН ФАЙЛ ДЛЯ ВСІХ ПРАВОК.
   Нижче по порядку:
   1) ДАНІ — тексти (UA/PL/EN), фіксовані ціни та посилання
   2) СТИЛІ — весь дизайн сайту
   3) КОД — компоненти й логіка (сюди зазвичай лізти не треба)
   ════════════════════════════════════════════════════════════════ */

// ───────────────────────── 1. ДАНІ ─────────────────────────
const DATA={
 uk:{
  eyebrow:"Тренер · Фітнес-модель · Вроцлав 🇵🇱",
  h1:'Твій прогрес —<br><i>крок за кроком</i> <b>разом</b>',
  herosub:"Я Олена — тренер із Вроцлава. 20 років у спорті, виступаю на міжнародній сцені. Допоможу побудувати реалістичну систему тренувань і харчування без крайнощів.",
  cta1:"Написати мені",cta2:"Про мене",badge:"на сцені з",
  nav:{about:"Про мене",ach:"Досягнення",process:"Як працюю",whom:"Для кого",values:"Цінності",services:"Послуги",creds:"Освіта",faq:"Питання",navcta:"Написати мені"},
  fabText:"Написати",incEye:"📦 Що входить",incTitle:"Що входить у <b>послуги</b>",includes:[{"t": "Консультація", "feat": false, "items": ["Визначення цілей та аналіз активності й тренувань", "Розбір харчування та обговорення суплементації", "Відповіді на запитання, рекомендації та план дій", "Без персональної програми тренувань і плану харчування"]}, {"t": "Персональне тренування", "feat": false, "items": ["Заняття під ціль і рівень підготовки", "Підбір вправ та навантаження", "Постановка, контроль техніки й виправлення помилок", "Рекомендації щодо подальших тренувань"]}, {"t": "Онлайн-ведення · 4 тижні", "feat": true, "items": ["Персональна програма: вправи, підходи, повторення, навантаження й прогресія; кількість занять під ціль, рівень і графік", "Орієнтовна калорійність і БЖВ, структура харчування, варіанти прийомів їжі, заміни, харчування до й після тренувань", "Аналіз суплементації й рекомендації в межах компетенції тренера", "Зв’язок із тренером, щотижневий звіт, аналіз прогресу, відповіді й коригування за потреби", "Персональні заняття не входять: 150 zł / 1 800 ₴ / 35 € за заняття"]}],
  mq:["20+ років досвіду","Абсолютна чемпіонка Польщі","Міжнародна сцена","Дієтолог · нутриціолог","Mini MBA","Індивідуальний підхід"],
  aboutEye:"Про мене",aboutTitle:'Фітнес — це <b>мій шлях</b>',
  aboutP1:"Фітнес зі мною понад 20 років. Я пройшла шлях від дівчини, яка тренувалася для себе, до спортсменки на міжнародній сцені.",
  aboutP2:"Результат — це не магія, а система і регулярність. Саме цього я вчу своїх клієнток.",
  aboutQuote:"«У роботі з клієнтами я поєдную свій 20-річний тренувальний досвід, знання з курсів і особистий досвід підготовки до змагань.»",
  stat1:"років у спорті",stat2:"перший виступ",stat3:"чемпіонські титули Masters",
  achEye:"🏆 Спортивні досягнення",achTitle:'Здобуто <b>на сцені</b>',
  achIntro:"Почала у 2014-му — бронза вже на дебюті. Після перерви повернулася сильнішою і виступаю у категорії Fit Model на турнірах Польщі та Італії.",
  titles:[{i:"🏆",t:"Абсолютна чемпіонка Польщі — Open Fit Model"},{i:"🥇",t:"Дворазова чемпіонка Masters"},{i:"🥈",t:"Срібло EuroMasters (Італія), Masters 35+ та 40+"},{i:"🏅",t:"TOP-5 Flex Weekend Pro Qualifier, Мілан"}],
  timeline:[{y:"2014",ev:[{p:"Чемпіонат України (WBPF)",r:"🥉 Бронза — дебютний старт"}]},{y:"2025",ev:[{p:"NPC Poland",r:"🏆 Overall Open Fit Model · 2×🥇 Masters · 🥈 Open Class B"},{p:"EuroMasters (Італія)",r:"🥈 Masters 35+ · 🥈 Masters 40+"}]},{y:"2026",ev:[{p:"League of Champions Pro Qualifier",r:"2×🥇 Masters · 🥈 Open Class B"},{p:"Natural & Regional Qualifier",r:"Призові місця у Masters та Novice"},{p:"Flex Weekend Pro Qualifier (Мілан)",r:"🏅 TOP-5 Fit Model Open Class B"}]}],
  procEye:"🧭 Як проходить робота",procTitle:"Як проходить <b>онлайн-ведення</b>",
  steps:[{"h": "Оплата й анкета", "p": "Після оплати онлайн-ведення заповнюєш стартову анкету."}, {"h": "Аналіз", "p": "Вивчаю цілі, досвід, графік і відповіді в анкеті."}, {"h": "Індивідуальний план", "p": "Готую тренування та рекомендації з харчування на 4 тижні."}, {"h": "Старт роботи", "p": "З узгодженої дати працюєш за планом із відповідною прогресією."}, {"h": "Щотижневий звіт", "p": "Аналізую прогрес і відповідаю на запитання."}, {"h": "Коригування й підсумок", "p": "За потреби коригую план; після 4 тижнів підбиваємо підсумки."}],
  resTitle:"Прогрес у власному темпі",
  results:["зменшення об’ємів","зниження ваги","підтягнуте тіло","краща форма сідниць і ніг","покращення постави","більше енергії","контроль харчування","менше набряків","дисципліна і режим","впевненість у собі"],
  whoEye:"🎯 Твої цілі",whoTitle:'Допоможу тобі <b>досягти бажаного</b>',
  goals:["схуднути","підтягнути тіло","покращити форму сідниць, ніг, спини та плечей","навчитися правильно харчуватися","повернути впевненість у собі","підготуватися до фотосесії, відпустки або змагань"],
  valEye:"💜 Мої цінності",valTitle:'Підхід, у який я <b>вірю</b>',
  values:[{t:"Дисципліна",p:"Саме регулярні дії створюють результат."},{t:"Здоров’я",p:"Форма не повинна будуватися ціною виснаження."},{t:"Стабільність",p:"Короткі ривки не дають довготривалого результату."},{t:"Любов до себе",p:"Зміни починаються з турботи про себе, а не з ненависті до тіла."},{t:"Тривалий результат",p:"Моя мета — навчити тебе зберігати форму, а не лише її досягти."}],
  servEye:"✨ Послуги",servTitle:'Обери свій <b>формат</b>',
  services:[{"title": "Консультація", "desc": "Визначимо цілі, розберемо активність, тренування, харчування та суплементацію. Відповім на запитання й дам подальший план дій. Персональні плани тренувань і харчування не входять.", "duration": "до 60 хв", "format": "Онлайн / офлайн", "prices": {"pl": 100, "uk": 1200, "en": 25}, "feat": false}, {"title": "Персональне тренування", "desc": "Заняття відповідно до цілі й рівня: індивідуальні вправи й навантаження, постановка та контроль техніки, виправлення помилок і рекомендації на майбутнє.", "duration": "до 60 хв", "format": "Онлайн з будь-якої країни / офлайн у Вроцлаві", "prices": {"pl": 150, "uk": 1800, "en": 35}, "feat": false}, {"title": "Індивідуальне онлайн-ведення", "desc": "Персональна робота протягом 4 тижнів: програма тренувань, харчування, суплементація в межах компетенції тренера, щотижневий звіт і коригування за результатами. Персональні заняття оплачуються окремо.", "duration": "4 тижні", "format": "Онлайн", "prices": {"pl": 400, "uk": 4700, "en": 90}, "feat": true}],
  payment:"Усі послуги оплачуються до початку роботи. Для консультації та тренування бронювання підтверджується після оплати; онлайн-ведення починається з узгодженої дати після анкети й підготовки плану.",
  credEye:"🎓 Освіта та сертифікація",credTitle:'Знання, яким можна <b>довіряти</b>',
  credIntro:"Постійно вчуся, щоб давати не поради з інтернету, а перевірені знання.",
  creds:[{y:"2025",t:"Сертифікований фітнес-тренер",d:"Fitness Trainer — ExpertX"},{y:"2026",t:"Mini MBA",d:"Practical Nutrition & Health Coaching, Open European Academy of Economics & Politics (Прага)"},{y:"150 год",t:"Дієтологія та нутриціологія",d:"Basic Dietetics and Nutrition — раціональне харчування та корекція маси тіла"},{y:"",t:"Спеціалізації",d:"Спортивне харчування, психологія харчової поведінки, харчування жінок та дітей"}],
  topics:["Спортивне харчування","Психологія харчової поведінки","Харчування жінок","Інтервальне голодування","Кето та без глютену","Робота зі щитоподібною залозою"],
  ctaTitle:"Почнемо з <b>розмови</b>?",ctaText:"Напиши мені, що саме тебе цікавить — обговоримо деталі та підберемо формат роботи.",ctaBtn:"Написати в Instagram",
  faqEye:"Питання",faqTitle:'Часті <b>запитання</b>',copy:"© 2026 Olena Kostetska · Wrocław",
  faq:[{"q": "Чи підійде новачкам?", "a": "Так. Формат роботи й навантаження підбираю з урахуванням цілі, рівня підготовки та графіка."}, {"q": "Як відбувається оплата?", "a": "Усі послуги оплачуються до початку роботи. Для консультації та тренування спочатку узгоджуємо час, надсилаю реквізити, а після оплати підтверджую бронювання. Для онлайн-ведення після оплати заповнюєш анкету; з узгодженої дати починаються 4 тижні роботи. PLN: польський переказ або BLIK; UAH: українська картка або рахунок; EUR: переказ на EUR-рахунок."}, {"q": "Чи входять персональні тренування в онлайн-ведення?", "a": "Ні. За бажанням їх можна оплатити окремо: 150 zł / 1 800 ₴ / 35 € за заняття."}, {"q": "Чи буде нова програма щотижня?", "a": "Не обов’язково. Наприклад, тренування A / B / C можуть повторюватися з відповідною прогресією. Коригую програму за потреби."}, {"q": "Чи можна тренуватися без залу?", "a": "Так. Обговоримо твої умови й доступне обладнання та підберемо відповідний формат."}],
 },
 pl:{
  eyebrow:"Trenerka · Modelka fitness · Wrocław 🇵🇱",
  h1:'Twój progres —<br><i>krok po kroku</i> <b>razem</b>',
  herosub:"Jestem Olena, trenerka z Wrocławia. Mam 20 lat doświadczenia w sporcie i startuję na scenie międzynarodowej. Pomogę Ci zbudować realistyczny plan treningów i odżywiania bez skrajności.",
  cta1:"Napisz do mnie",cta2:"O mnie",badge:"na scenie od",
  nav:{about:"O mnie",ach:"Osiągnięcia",process:"Jak pracuję",whom:"Dla kogo",values:"Wartości",services:"Usługi",creds:"Edukacja",faq:"Pytania",navcta:"Napisz do mnie"},
  fabText:"Napisz",incEye:"📦 Co zawiera",incTitle:"Co zawierają <b>usługi</b>",includes:[{"t": "Konsultacja", "feat": false, "items": ["Ustalenie celów i analiza aktywności oraz treningów", "Omówienie żywienia i suplementacji", "Odpowiedzi na pytania, zalecenia i dalszy plan działania", "Bez indywidualnego planu treningów i żywienia"]}, {"t": "Trening personalny", "feat": false, "items": ["Trening dopasowany do celu i poziomu", "Dobór ćwiczeń oraz obciążenia", "Nauka i kontrola techniki, korekta błędów", "Zalecenia do dalszych treningów"]}, {"t": "Prowadzenie online · 4 tygodnie", "feat": true, "items": ["Indywidualny plan: ćwiczenia, serie, powtórzenia, obciążenie i progresja; liczba treningów dopasowana do celu, poziomu i grafiku", "Orientacyjna kaloryczność i makro, struktura posiłków, propozycje i zamienniki, żywienie przed i po treningu", "Analiza suplementacji i zalecenia w zakresie kompetencji trenerki", "Kontakt z trenerką, cotygodniowy raport, analiza postępów, odpowiedzi i korekty w razie potrzeby", "Treningi personalne nie są w cenie: 150 zł / 1 800 ₴ / 35 € za sesję"]}],
  mq:["20+ lat doświadczenia","Absolutna mistrzyni Polski","Scena międzynarodowa","Dietetyk · nutrycjonista","Mini MBA","Indywidualne podejście"],
  aboutEye:"O mnie",aboutTitle:'Fitness to <b>moja droga</b>',
  aboutP1:"Fitness jest ze mną ponad 20 lat. Przeszłam drogę od dziewczyny trenującej dla siebie do zawodniczki na scenie międzynarodowej.",
  aboutP2:"Wynik to nie magia, tylko system i regularność. Tego uczę moje klientki.",
  aboutQuote:"«W pracy z klientkami łączę 20-letnie doświadczenie treningowe, wiedzę z kursów i osobiste przygotowania do zawodów.»",
  stat1:"lat w sporcie",stat2:"pierwszy start",stat3:"tytuły mistrzowskie Masters",
  achEye:"🏆 Osiągnięcia sportowe",achTitle:'Zdobyte <b>na scenie</b>',
  achIntro:"Zaczęłam w 2014 — brąz już na debiucie. Po przerwie wróciłam silniejsza i startuję w kategorii Fit Model w Polsce i we Włoszech.",
  
  titles:[{i:"🏆",t:"Absolutna mistrzyni Polski — Open Fit Model"},{i:"🥇",t:"Dwukrotna mistrzyni Masters"},{i:"🥈",t:"Srebro EuroMasters (Włochy), Masters 35+ i 40+"},{i:"🏅",t:"TOP-5 Flex Weekend Pro Qualifier, Mediolan"}],
  timeline:[{y:"2014",ev:[{p:"Mistrzostwa Ukrainy (WBPF)",r:"🥉 Brąz — debiut"}]},{y:"2025",ev:[{p:"NPC Poland",r:"🏆 Overall Open Fit Model · 2×🥇 Masters · 🥈 Open Class B"},{p:"EuroMasters (Włochy)",r:"🥈 Masters 35+ · 🥈 Masters 40+"}]},{y:"2026",ev:[{p:"League of Champions Pro Qualifier",r:"2×🥇 Masters · 🥈 Open Class B"},{p:"Natural & Regional Qualifier",r:"Miejsca medalowe w Masters i Novice"},{p:"Flex Weekend Pro Qualifier (Mediolan)",r:"🏅 TOP-5 Fit Model Open Class B"}]}],
  procEye:"🧭 Jak wygląda współpraca",procTitle:"Jak przebiega <b>prowadzenie online</b>",
  steps:[{"h": "Płatność i ankieta", "p": "Po opłaceniu prowadzenia online wypełniasz ankietę startową."}, {"h": "Analiza", "p": "Poznaję Twój cel, doświadczenie, plan dnia i odpowiedzi w ankiecie."}, {"h": "Plan indywidualny", "p": "Przygotowuję treningi i zalecenia żywieniowe na 4 tygodnie."}, {"h": "Start", "p": "Od ustalonej daty pracujesz według planu z odpowiednią progresją."}, {"h": "Cotygodniowy raport", "p": "Analizuję postępy i odpowiadam na pytania."}, {"h": "Korekty i podsumowanie", "p": "W razie potrzeby koryguję plan; po 4 tygodniach podsumowujemy pracę."}],
  resTitle:"Postępy we własnym tempie",
  results:["zmniejszenie obwodów","spadek wagi","wymodelowane ciało","lepsza forma pośladków i nóg","lepsza postawa","więcej energii","kontrola odżywiania","mniej obrzęków","dyscyplina i rytm","pewność siebie"],
  whoEye:"🎯 Dla kogo",whoTitle:'Z kim <b>pracuję</b>',
  goals:["schudnąć","wymodelować ciało","poprawić formę pośladków, nóg, pleców i ramion","nauczyć się prawidłowo odżywiać","odzyskać pewność siebie","przygotować się do sesji, wakacji lub zawodów"],
  valEye:"💜 Moje wartości",valTitle:'Podejście, w które <b>wierzę</b>',
  values:[{t:"Dyscyplina",p:"To regularne działania tworzą wynik."},{t:"Zdrowie",p:"Forma nie może powstawać kosztem wyczerpania."},{t:"Stabilność",p:"Krótkie zrywy nie dają trwałego efektu."},{t:"Miłość do siebie",p:"Zmiany zaczynają się od troski o siebie, nie od nienawiści do ciała."},{t:"Trwały efekt",p:"Moim celem jest nauczyć Cię utrzymać formę, nie tylko ją osiągnąć."}],
  servEye:"✨ Usługi",servTitle:'Wybierz swój <b>format</b>',
  services:[{"title": "Konsultacja", "desc": "Ustalimy cele, przeanalizujemy aktywność, treningi, odżywianie i suplementację. Odpowiem na pytania i zaproponuję dalsze kroki. Indywidualny plan treningowy i żywieniowy nie są w cenie.", "duration": "do 60 min", "format": "Online / stacjonarnie", "prices": {"pl": 100, "uk": 1200, "en": 25}, "feat": false}, {"title": "Trening personalny", "desc": "Trening dopasowany do celu i poziomu: dobór ćwiczeń i obciążenia, nauka i kontrola techniki, korekta błędów oraz zalecenia na kolejne treningi.", "duration": "do 60 min", "format": "Online z dowolnego kraju / stacjonarnie we Wrocławiu", "prices": {"pl": 150, "uk": 1800, "en": 35}, "feat": false}, {"title": "Indywidualne prowadzenie online", "desc": "4 tygodnie indywidualnej współpracy: plan treningów, żywienie, suplementacja w zakresie kompetencji trenerki, cotygodniowy raport i korekty według postępów. Treningi personalne są płatne osobno.", "duration": "4 tygodnie", "format": "Online", "prices": {"pl": 400, "uk": 4700, "en": 90}, "feat": true}],
  payment:"Wszystkie usługi opłaca się przed rozpoczęciem. Rezerwacja konsultacji i treningu jest potwierdzana po wpłacie; prowadzenie online zaczyna się w ustalonym terminie po ankiecie i przygotowaniu planu.",
  credEye:"🎓 Edukacja i certyfikaty",credTitle:'Wiedza, której możesz <b>zaufać</b>',
  credIntro:"Ciągle się uczę, żeby dawać sprawdzoną wiedzę, a nie porady z internetu.",
  creds:[{y:"2025",t:"Certyfikowana trenerka fitness",d:"Fitness Trainer — ExpertX"},{y:"2026",t:"Mini MBA",d:"Practical Nutrition & Health Coaching, Open European Academy of Economics & Politics (Praga)"},{y:"150 h",t:"Dietetyka i nutrycjologia",d:"Basic Dietetics and Nutrition — racjonalne odżywianie i korekta masy ciała"},{y:"",t:"Specjalizacje",d:"Żywienie sportowe, psychologia odżywiania, żywienie kobiet i dzieci"}],
  topics:["Żywienie sportowe","Psychologia odżywiania","Żywienie kobiet","Post przerywany","Keto i bez glutenu","Praca z tarczycą"],
  ctaTitle:"Zacznijmy od <b>rozmowy</b>",ctaText:"Napisz mi, co Cię interesuje. Omówimy szczegóły i dobierzemy formę współpracy.",ctaBtn:"Napisz na Instagramie",
  faqEye:"Pytania",faqTitle:'Najczęstsze <b>pytania</b>',copy:"© 2026 Olena Kostetska · Wrocław",
  faq:[{"q": "Czy to odpowiednie dla początkujących?", "a": "Tak. Formę współpracy i obciążenia dopasowuję do celu, poziomu i grafiku."}, {"q": "Jak wygląda płatność?", "a": "Wszystkie usługi opłaca się przed rozpoczęciem. Przy konsultacji i treningu najpierw ustalamy termin, przesyłam dane do płatności, a po opłaceniu potwierdzam rezerwację. Przy prowadzeniu online po opłaceniu wypełniasz ankietę; 4 tygodnie zaczynają się od ustalonej daty. PLN: polski przelew lub BLIK; UAH: ukraińska karta lub konto; EUR: przelew na konto EUR."}, {"q": "Czy treningi personalne są w cenie prowadzenia?", "a": "Nie. Można je dokupić osobno: 150 zł / 1 800 ₴ / 35 € za sesję."}, {"q": "Czy co tydzień dostanę nowy plan?", "a": "Nie zawsze. Treningi A / B / C mogą się powtarzać z odpowiednią progresją. Plan zmieniam, gdy jest taka potrzeba."}, {"q": "Czy mogę ćwiczyć bez siłowni?", "a": "Tak. Omówimy Twoje warunki i dostępny sprzęt, a następnie dobierzemy format."}],
 },
 en:{
  eyebrow:"Coach · Fitness model · Wrocław 🇵🇱",
  h1:'Your progress —<br><i>step by step</i> <b>together</b>',
  herosub:"I’m Olena, a coach based in Wrocław with 20 years in sport and international competition experience. I’ll help you build a realistic training and nutrition routine without extremes.",
  cta1:"Message me",cta2:"About me",badge:"on stage since",
  nav:{about:"About",ach:"Results",process:"How I work",whom:"For whom",values:"Values",services:"Services",creds:"Education",faq:"FAQ",navcta:"Message me"},
  fabText:"Message",incEye:"📦 What is included",incTitle:"What each <b>service includes</b>",includes:[{"t": "Consultation", "feat": false, "items": ["Goal setting and review of activity and training", "Nutrition review and supplement discussion", "Questions, recommendations and next steps", "Personal training and meal plans are not included"]}, {"t": "Personal training", "feat": false, "items": ["Session matched to your goal and fitness level", "Exercise and load selection", "Technique coaching, checks and corrections", "Guidance for your next workouts"]}, {"t": "Online coaching · 4 weeks", "feat": true, "items": ["Personal plan: exercises, sets, reps, load and progression; workout frequency matched to your goals, level and schedule", "Estimated calories and macros, meal structure, options and swaps, pre- and post-workout nutrition", "Review of supplements and guidance within the coach’s scope", "Coach contact, weekly check-ins, progress review, answers and adjustments when needed", "Personal sessions are separate: 150 zł / 1 800 ₴ / 35 € per session"]}],
  mq:["20+ years experience","Overall Champion of Poland","International stage","Dietitian · nutritionist","Mini MBA","Individual approach"],
  aboutEye:"About",aboutTitle:'Fitness is <b>my path</b>',
  aboutP1:"Fitness has been with me for over 20 years. I went from a girl training for herself to an athlete on the international stage.",
  aboutP2:"Results aren't magic — they come from a system and consistency. That's what I teach my clients.",
  aboutQuote:"\"With my clients I combine 20 years of training experience, course knowledge and personal competition prep.\"",
  stat1:"years in sport",stat2:"first stage",stat3:"Masters champion titles",
  achEye:"🏆 Competition results",achTitle:'Earned <b>on stage</b>',
  achIntro:"I started in 2014 — bronze on my debut. After a break I came back stronger and compete in Fit Model across Poland and Italy.",
  
  titles:[{i:"🏆",t:"Overall Champion of Poland — Open Fit Model"},{i:"🥇",t:"Two-time Masters Champion"},{i:"🥈",t:"Silver at EuroMasters (Italy), Masters 35+ & 40+"},{i:"🏅",t:"TOP-5 Flex Weekend Pro Qualifier, Milan"}],
  timeline:[{y:"2014",ev:[{p:"Ukraine Championship (WBPF)",r:"🥉 Bronze — debut start"}]},{y:"2025",ev:[{p:"NPC Poland",r:"🏆 Overall Open Fit Model · 2×🥇 Masters · 🥈 Open Class B"},{p:"EuroMasters (Italy)",r:"🥈 Masters 35+ · 🥈 Masters 40+"}]},{y:"2026",ev:[{p:"League of Champions Pro Qualifier",r:"2×🥇 Masters · 🥈 Open Class B"},{p:"Natural & Regional Qualifier",r:"Podium places in Masters and Novice"},{p:"Flex Weekend Pro Qualifier (Milan)",r:"🏅 TOP-5 Fit Model Open Class B"}]}],
  procEye:"🧭 How working together works",procTitle:"How <b>online coaching works</b>",
  steps:[{"h": "Payment and questionnaire", "p": "After paying for online coaching, you complete a starting questionnaire."}, {"h": "Review", "p": "I review your goals, experience, schedule and answers."}, {"h": "Personal plan", "p": "I prepare four weeks of training and nutrition guidance."}, {"h": "Start", "p": "From the agreed date, you follow the plan with appropriate progression."}, {"h": "Weekly check-in", "p": "I review progress and answer your questions."}, {"h": "Adjust and recap", "p": "I adjust the plan when needed; after four weeks we review the outcome."}],
  resTitle:"Progress at your own pace",
  results:["reduced volume","weight loss","a more toned body","better glutes and legs","better posture","more energy","food control","less bloating","discipline and routine","more confidence"],
  whoEye:"🎯 Who it's for",whoTitle:'Who I <b>work with</b>',
  goals:["lose weight","tone the body","improve glutes, legs, back and shoulders","learn to eat properly","regain confidence","prep for a photoshoot, holiday or competition"],
  valEye:"💜 My values",valTitle:'The approach I <b>believe in</b>',
  values:[{t:"Discipline",p:"Regular actions are what create results."},{t:"Health",p:"Shape should never be built at the cost of exhaustion."},{t:"Stability",p:"Short bursts don't give a lasting result."},{t:"Self-love",p:"Change starts with caring for yourself, not hating your body."},{t:"Lasting result",p:"My goal is to teach you to keep your shape, not just reach it."}],
  servEye:"✨ Services",servTitle:'Choose your <b>format</b>',
  services:[{"title": "Consultation", "desc": "We define your goals, review activity, training, nutrition and supplements, answer your questions and map next steps. A personal training program and meal plan are not included.", "duration": "up to 60 min", "format": "Online / in person", "prices": {"pl": 100, "uk": 1200, "en": 25}, "feat": false}, {"title": "Personal training", "desc": "A session matched to your goal and level: exercises and load selection, technique coaching and correction, plus guidance for future training.", "duration": "up to 60 min", "format": "Online from anywhere / in person in Wrocław", "prices": {"pl": 150, "uk": 1800, "en": 35}, "feat": false}, {"title": "Individual online coaching", "desc": "Four weeks of personal support: training plan, nutrition, supplements within a coach’s scope, weekly check-ins and adjustments based on progress. Personal sessions cost extra.", "duration": "4 weeks", "format": "Online", "prices": {"pl": 400, "uk": 4700, "en": 90}, "feat": true}],
  payment:"All services are paid before work begins. Consultation and training bookings are confirmed after payment; online coaching starts on the agreed date after the questionnaire and plan preparation.",
  credEye:"🎓 Education & certification",credTitle:'Knowledge you can <b>trust</b>',
  credIntro:"I keep learning — so you get proven knowledge, not internet advice.",
  creds:[{y:"2025",t:"Certified Fitness Trainer",d:"Fitness Trainer — ExpertX"},{y:"2026",t:"Mini MBA",d:"Practical Nutrition & Health Coaching, Open European Academy of Economics & Politics (Prague)"},{y:"150 h",t:"Dietetics & Nutrition",d:"Basic Dietetics and Nutrition — rational eating and weight adjustment"},{y:"",t:"Specializations",d:"Sports nutrition, eating psychology, nutrition for women and children"}],
  topics:["Sports nutrition","Eating psychology","Women's nutrition","Intermittent fasting","Keto & gluten-free","Thyroid support"],
  ctaTitle:"Let’s start with <b>a conversation</b>",ctaText:"Message me what you’re interested in. We’ll discuss the details and choose a format that fits your goals.",ctaBtn:"Message me on Instagram",
  faqEye:"Questions",faqTitle:'Frequently <b>asked</b>',copy:"© 2026 Olena Kostetska · Wrocław",
  faq:[{"q": "Is this suitable for beginners?", "a": "Yes. We match the format and training load to your goals, level and schedule."}, {"q": "How does payment work?", "a": "All services are paid before work begins. For a consultation or session, we agree a date and time, I send payment details, and your booking is confirmed after payment. For online coaching, you complete the questionnaire after payment; the four weeks begin on the agreed date. PLN: Polish bank transfer or BLIK; UAH: Ukrainian card or account; EUR: transfer to a EUR account."}, {"q": "Are personal sessions included in online coaching?", "a": "No. They can be booked separately for 150 zł / 1 800 ₴ / 35 € per session."}, {"q": "Will I get a new program every week?", "a": "Only if needed. Workouts A / B / C can repeat with appropriate progression. I adjust the plan based on your progress."}, {"q": "Can I train without a gym?", "a": "Yes. We can discuss your space and equipment and choose a suitable format."}],
 }
};

// Посилання та зображення сайту.
const CONFIG = {
  instagramUrl: "https://instagram.com/alyonochka_22",
  instagramHandle: "@alyonochka_22",
  heroPhoto: "/hero.jpg",
  aboutPhoto: "/about.jpg",
};

// ───────────────────────── 2. СТИЛІ ─────────────────────────
const STYLES = `
:root{
  color-scheme:light only;
  --bg:#FFFFFF;
  --bg-soft:#F5F3F7;
  --ink:#1A1523;        /* near-black, high contrast */
  --ink-2:#4A4458;      /* secondary text, still readable */
  --ink-3:#6E6880;      /* muted, used sparingly */
  --accent:#6B4E9E;     /* deep readable violet */
  --accent-2:#8B6DB8;
  --accent-soft:#EDE7F5;
  --line:#E8E4EE;
  --line-2:#D8D2E2;
  --white:#fff;
}
html{color-scheme:light only;background:#FFFFFF !important}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:#FFFFFF !important;color:#1A1523 !important;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;font-weight:400;line-height:1.5;letter-spacing:-.011em;forced-color-adjust:none}
img,video{forced-color-adjust:none}
.wrap{max-width:1080px;margin:0 auto;padding:0 max(24px,env(safe-area-inset-left)) 0 max(24px,env(safe-area-inset-right));position:relative}
::selection{background:var(--accent-soft);color:var(--accent)}

nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:14px max(24px,env(safe-area-inset-right)) 14px max(24px,env(safe-area-inset-left));padding-top:max(14px,env(safe-area-inset-top));background:rgba(255,255,255,.72);backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid var(--line)}
.logo{font-family:'Fraunces',serif;font-weight:600;font-size:20px;color:var(--ink);flex-shrink:0;letter-spacing:-.02em}
.logo em{font-style:italic;color:var(--accent)}
.nav-menu{display:flex;gap:2px;align-items:center;margin:0 auto}
.nav-menu a{font-size:14px;font-weight:500;color:var(--ink-2);text-decoration:none;padding:8px 14px;border-radius:8px;transition:.18s}
.nav-menu a:hover{color:var(--ink);background:var(--bg-soft)}
.nav-right{display:flex;align-items:center;gap:12px;flex-shrink:0}
.nav-cta{font-size:14px;font-weight:600;color:#fff;background:var(--accent);padding:9px 18px;border-radius:980px;text-decoration:none;transition:.18s;white-space:nowrap}
.nav-cta:hover{background:var(--ink)}
.langs{display:flex;gap:1px}
.langs button{background:transparent;border:none;color:var(--ink-3);font-weight:600;font-size:13px;padding:7px 9px;border-radius:8px;cursor:pointer;transition:.18s}
.langs button:hover{color:var(--ink)}
.langs button.active{color:var(--accent)}
.burger{display:none;background:transparent;border:none;cursor:pointer;padding:6px;color:var(--ink)}
.mobile-menu{display:none;position:fixed;top:0;right:0;bottom:0;width:80%;max-width:340px;background:var(--white);z-index:200;padding:76px 28px 40px;flex-direction:column;gap:2px;box-shadow:-20px 0 60px rgba(26,21,35,.14);transform:translateX(100%);transition:transform .3s cubic-bezier(.32,.72,0,1)}
.mobile-menu.open{transform:translateX(0)}
.mobile-menu a{font-family:'Fraunces',serif;font-size:24px;font-weight:500;color:var(--ink);text-decoration:none;padding:14px 0;border-bottom:1px solid var(--line)}
.mobile-menu a:last-of-type{border:none}
.mm-close{position:absolute;top:20px;right:22px;background:transparent;border:none;font-size:32px;color:var(--ink-2);cursor:pointer;line-height:1}
.mm-overlay{display:none;position:fixed;inset:0;background:rgba(26,21,35,.28);backdrop-filter:blur(2px);z-index:150}
.mm-overlay.open{display:block}

/* HERO */
.hero{position:relative;padding:150px 0 90px}
.hero .wrap{display:grid;grid-template-columns:1.05fr .95fr;gap:60px;align-items:center}
.eyebrow{font-size:15px;font-weight:600;color:var(--accent);margin-bottom:20px;letter-spacing:0}
h1.hero-title{font-family:'Fraunces',serif;font-weight:600;font-size:clamp(44px,6.2vw,74px);line-height:1.04;letter-spacing:-.03em;color:var(--ink)}
h1.hero-title b{font-weight:700}
h1.hero-title i{font-style:italic;font-weight:500;color:var(--accent)}
.hero-sub{margin:26px 0 36px;max-width:440px;font-size:19px;line-height:1.55;color:var(--ink-2);font-weight:400}
.hero-cta{display:flex;gap:12px;flex-wrap:wrap}
.btn{font-size:16px;font-weight:600;padding:15px 28px;border-radius:980px;cursor:pointer;border:none;transition:.2s;text-decoration:none;display:inline-flex;align-items:center;gap:8px;letter-spacing:-.01em}
.btn-primary{background:var(--accent);color:#fff}
.btn-primary:hover{background:var(--ink);transform:scale(1.015)}
.btn-ghost{background:var(--bg-soft);color:var(--ink)}
.btn-ghost:hover{background:var(--line)}
.hero-photo{position:relative}
.hero-photo .frame{position:relative;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(26,21,35,.14);max-width:380px;margin:0 auto}
.hero-photo img{width:100%;display:block}
.medal-badge{position:absolute;bottom:20px;left:20px;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);padding:12px 18px;border-radius:16px;text-align:left;box-shadow:0 8px 24px rgba(26,21,35,.12)}
.medal-badge .n{font-family:'Fraunces';font-weight:700;font-size:24px;line-height:1;color:var(--ink)}
.medal-badge .l{font-size:12px;font-weight:500;color:var(--ink-2);margin-top:4px}

.marquee{border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:22px 0;overflow:hidden;white-space:nowrap;background:var(--bg-soft)}
.marquee-track{display:inline-block;animation:scroll 38s linear infinite}
.marquee span{font-size:15px;font-weight:600;color:var(--ink-2);margin:0 18px}
.marquee b{color:var(--accent-2);margin:0 6px}
@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

section.block{padding:110px 0;position:relative}
.sec-head{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.sec-num{display:none}
.sec-eyebrow{font-size:15px;font-weight:600;color:var(--accent);margin-bottom:14px}
.sec-title{font-family:'Fraunces',serif;font-weight:600;font-size:clamp(32px,4.2vw,46px);line-height:1.1;letter-spacing:-.03em;color:var(--ink);margin-bottom:24px;max-width:20ch}
.sec-title.wide{max-width:none}
.sec-title b{font-weight:700}

/* ABOUT */
.about{display:grid;grid-template-columns:.85fr 1.15fr;gap:64px;align-items:center}
.about .frame{border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(26,21,35,.12)}
.about img{width:100%;display:block}
.about p{color:var(--ink-2);font-size:17px;line-height:1.65;margin-bottom:16px}
.quote{font-family:'Fraunces';font-style:italic;font-weight:400;font-size:21px;line-height:1.5;color:var(--ink);padding:0 0 0 22px;border-left:3px solid var(--accent);margin:26px 0}
.stats{display:flex;gap:44px;margin-top:34px;flex-wrap:wrap}
.stat .n{font-family:'Fraunces';font-weight:700;font-size:44px;color:var(--ink);line-height:1;letter-spacing:-.02em}
.stat .l{font-size:14px;color:var(--ink-2);margin-top:6px;max-width:130px}

/* ACHIEVEMENTS */
.ach{background:var(--bg-soft)}
.ach-intro{max-width:640px;color:var(--ink-2);font-size:17px;line-height:1.65;margin-bottom:48px}
.timeline{display:flex;flex-direction:column}
.tl-row{display:grid;grid-template-columns:110px 1fr;gap:32px;padding:28px 0;border-top:1px solid var(--line-2)}
.tl-row:last-child{border-bottom:1px solid var(--line-2)}
.tl-year{font-family:'Fraunces';font-weight:700;font-size:26px;color:var(--accent);line-height:1;letter-spacing:-.01em}
.tl-events{display:flex;flex-direction:column;gap:14px}
.tl-ev .place{font-weight:600;font-size:16px;color:var(--ink);margin-bottom:2px}
.tl-ev .res{color:var(--ink-2);font-size:15px;line-height:1.5}
.dot{display:none}
.titles{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:52px}
.title-chip{display:flex;align-items:center;gap:14px;background:var(--white);border:1px solid var(--line);border-radius:14px;padding:18px 20px}
.title-chip .ic{font-size:22px;flex-shrink:0}
.title-chip span{font-weight:500;font-size:15px;color:var(--ink);line-height:1.35}

/* PROCESS */
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
.step{background:var(--white);border:1px solid var(--line);border-radius:18px;padding:28px 26px;transition:.2s}
.step:hover{border-color:var(--line-2);box-shadow:0 8px 24px rgba(26,21,35,.06)}
.step .sn{font-family:'Fraunces';font-weight:700;font-size:20px;color:var(--accent);margin-bottom:14px}
.step h4{font-weight:600;font-size:18px;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
.step p{color:var(--ink-2);font-size:15px;line-height:1.55}

.results{margin-top:44px;background:var(--white);border:1px solid var(--line);border-radius:20px;padding:38px 36px}
.results h4{font-family:'Fraunces';font-weight:600;font-size:22px;color:var(--ink);margin-bottom:22px;letter-spacing:-.02em}
.res-grid{display:flex;flex-wrap:wrap;gap:10px}
.res-pill{display:flex;align-items:center;gap:8px;font-size:15px;color:var(--ink);background:var(--bg-soft);border-radius:980px;padding:9px 16px}
.res-pill .chk{color:var(--accent);flex-shrink:0}

.goals{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:40px}
.goal{display:flex;align-items:flex-start;gap:12px;background:var(--white);border:1px solid var(--line);border-radius:16px;padding:22px;transition:.2s}
.goal:hover{border-color:var(--line-2)}
.goal .chk{color:var(--accent);flex-shrink:0;margin-top:1px}
.goal span{font-size:16px;line-height:1.45;color:var(--ink)}

/* VALUES */
.values{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:44px}
.value{background:var(--white);border:1px solid var(--line);border-radius:16px;padding:26px 20px;transition:.2s}
.value:hover{border-color:var(--line-2);box-shadow:0 8px 24px rgba(26,21,35,.06)}
.value .vn{font-family:'Fraunces';font-weight:700;font-size:18px;color:var(--accent);margin-bottom:12px}
.value h4{font-weight:600;font-size:17px;color:var(--ink);margin-bottom:8px;letter-spacing:-.01em}
.value p{color:var(--ink-2);font-size:14px;line-height:1.5}

/* SERVICES */
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px;align-items:start}
.card{position:relative;background:var(--white);border:1px solid var(--line);border-radius:22px;padding:32px 28px;transition:.22s}
.card:hover{box-shadow:0 16px 40px rgba(26,21,35,.09);transform:translateY(-3px)}
.card.featured{border-color:var(--accent);border-width:1.5px}
.card-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:20px}
.card-tag{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;color:var(--ink-2);background:var(--bg-soft);padding:6px 12px;border-radius:980px}
.card.featured .card-tag{background:var(--accent);color:#fff}
.card h3{font-family:'Fraunces';font-weight:600;font-size:26px;margin-bottom:10px;color:var(--ink);letter-spacing:-.02em}
.card p{color:var(--ink-2);font-size:15px;line-height:1.55;margin-bottom:22px;min-height:66px}
.price-row{display:flex;align-items:baseline;gap:10px;margin-bottom:4px}
.price{font-family:'Fraunces';font-weight:700;font-size:25px;color:var(--ink);line-height:1.35;letter-spacing:-.02em}
.price small{font-size:14px;color:var(--ink-2);font-weight:400;font-family:'Inter'}
.price-alt{font-size:13px;color:var(--ink-3);margin-bottom:20px;font-weight:500}
.card .btn{width:100%;justify-content:center}
.service-details{display:flex;flex-direction:column;gap:6px;color:var(--ink-2);font-size:14px;line-height:1.45;margin:18px 0 22px;min-height:58px}
.payment-note{color:var(--ink-2);line-height:1.7;margin-top:28px;max-width:850px}

/* CREDENTIALS */
.creds{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:40px}
.cred{display:flex;gap:16px;align-items:flex-start;background:var(--white);border:1px solid var(--line);border-radius:18px;padding:26px}
.cred .badge{flex-shrink:0;width:44px;height:44px;border-radius:12px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;color:var(--accent)}
.cred h4{font-weight:600;font-size:17px;color:var(--ink);margin-bottom:6px;line-height:1.3}
.cred p{color:var(--ink-2);font-size:14px;line-height:1.55}
.cred .yr{font-weight:600;font-size:13px;color:var(--accent);margin-top:10px;display:block}
.topics{margin-top:28px;display:flex;flex-wrap:wrap;gap:8px}
.topic{font-size:14px;color:var(--ink-2);border:1px solid var(--line-2);border-radius:980px;padding:8px 16px}

.cta-band{margin:0 24px;border-radius:28px;background:var(--accent);padding:80px 50px;text-align:center;position:relative;overflow:hidden}
.cta-band h2{font-family:'Fraunces';font-weight:600;font-size:clamp(30px,4vw,44px);line-height:1.1;margin-bottom:16px;color:#fff;letter-spacing:-.02em}
.cta-band h2 b{font-weight:700}
.cta-band p{color:rgba(255,255,255,.85);max-width:480px;margin:0 auto 32px;font-size:18px;line-height:1.5}
.cta-band .btn-primary{background:#fff;color:var(--accent)}
.cta-band .btn-primary:hover{background:var(--ink);color:#fff}

.faq-item{border-top:1px solid var(--line-2);padding:26px 0;cursor:pointer}
.faq-item:last-child{border-bottom:1px solid var(--line-2)}
.faq-q{display:flex;justify-content:space-between;align-items:center;gap:20px}
.faq-q h4{font-family:'Fraunces';font-weight:500;font-size:20px;color:var(--ink);letter-spacing:-.01em}
.faq-q .ic{color:var(--accent);font-size:26px;transition:.25s;flex-shrink:0;line-height:1}
.faq-item.open .ic{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .3s ease;color:var(--ink-2);line-height:1.65;font-size:16px}
.faq-item.open .faq-a{max-height:240px;margin-top:14px}

footer{padding:70px 0 max(44px,calc(env(safe-area-inset-bottom) + 20px));border-top:1px solid var(--line);margin-top:20px}
.foot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px}
.foot .logo{font-size:24px}
.ig{display:inline-flex;align-items:center;gap:10px;border:1px solid var(--line-2);padding:12px 22px;border-radius:980px;color:var(--ink);text-decoration:none;font-weight:600;font-size:15px;transition:.2s}
.ig:hover{border-color:var(--accent);color:var(--accent)}
.copyright{margin-top:34px;color:var(--ink-3);font-size:14px;text-align:center}

/* FLOATING CTA */
.fab{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(18px,calc(env(safe-area-inset-bottom) + 6px));z-index:90;display:inline-flex;align-items:center;gap:9px;background:var(--accent);color:#fff;font-weight:600;font-size:15px;padding:14px 20px;border-radius:980px;text-decoration:none;box-shadow:0 10px 30px rgba(107,78,158,.4);transform:translateY(120px);opacity:0;transition:transform .4s cubic-bezier(.32,.72,0,1),opacity .3s,background .2s}
.fab.show{transform:translateY(0);opacity:1}
.fab:hover{background:var(--ink)}
.fab svg{flex-shrink:0}
@media(max-width:520px){.fab span{display:none}.fab{padding:15px}}

/* STEP ICONS */
.step .sn{display:flex;align-items:center;gap:12px;margin-bottom:16px}
.step .si{width:42px;height:42px;border-radius:12px;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:20px;line-height:1}
.step .snum{font-family:'Fraunces';font-weight:700;font-size:18px;color:var(--ink-3)}

/* INCLUDES / "что входит" */
.includes{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
.inc{background:var(--white);border:1px solid var(--line);border-radius:20px;padding:30px 28px}
.inc.featured{border-color:var(--accent);border-width:1.5px}
.inc h4{font-family:'Fraunces';font-weight:600;font-size:22px;color:var(--ink);margin-bottom:20px;letter-spacing:-.02em;display:flex;align-items:center;gap:10px}
.inc ul{list-style:none;display:flex;flex-direction:column;gap:12px}
.inc li{display:flex;align-items:flex-start;gap:11px;font-size:15px;line-height:1.45;color:var(--ink-2)}
.inc li .chk{color:var(--accent);flex-shrink:0;margin-top:2px}

/* REVEAL on scroll */
.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
.reveal.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}

@media(max-width:980px){.nav-menu{display:none}}
@media(max-width:880px){
  .burger{display:block}.nav-cta{display:none}.mobile-menu{display:flex}
  .hero{padding-top:116px}
  .hero .wrap{grid-template-columns:1fr;gap:48px}
  .about{grid-template-columns:1fr;gap:36px}
  .goals,.cards,.creds,.titles,.steps,.includes{grid-template-columns:1fr}
  .values{grid-template-columns:repeat(2,1fr)}
  .tl-row{grid-template-columns:60px 1fr;gap:16px}
  .tl-year{font-size:21px}
  .sec-title{max-width:none}
  }


`;

// ───────────────────────── 3. КОД ─────────────────────────
const LANGS = ['uk', 'pl', 'en']
const STEP_ICONS = ['👋', '📋', '🎯', '📝', '📈', '⚙️']

// render content strings that may contain <b>/<i>/<br>
function Rich({ html, as = 'span', className, ...rest }) {
  const Tag = as
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} {...rest} />
}

const Check = ({ size = 20 }) => (
  <svg className="chk" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
)
const Star = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.4-6.3-4.6L5.7 21 8 13.8 2 9.4h7.6z" /></svg>
)
const IgIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
)

export default function App() {
  const [lang, setLang] = useState('uk')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [fabShow, setFabShow] = useState(false)

  const d = DATA[lang]

  useEffect(() => {
    const nl = (navigator.language || 'uk').slice(0, 2)
    if (LANGS.includes(nl)) setLang(nl)
  }, [])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  useEffect(() => {
    const onScroll = () => setFabShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('section.block, .marquee')
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('reveal', 'in'))
      return
    }
    els.forEach((e) => e.classList.add('reveal'))
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      })
    }, { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [lang])

  const navLinks = [
    ['about', '#about'], ['ach', '#ach'], ['process', '#process'],
    ['services', '#services'], ['creds', '#creds'], ['faq', '#faq'],
  ]
  const mobileLinks = [
    ['about', '#about'], ['ach', '#ach'], ['process', '#process'], ['whom', '#whom'],
    ['values', '#values'], ['services', '#services'], ['creds', '#creds'], ['faq', '#faq'],
  ]

  return (
    <>
      <style>{STYLES}</style>
      <nav>
        <div className="logo">Olena <em>Kostetska</em></div>
        <div className="nav-menu">
          {navLinks.map(([k, href]) => (<a key={k} href={href}>{d.nav[k]}</a>))}
        </div>
        <div className="nav-right">
          <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">{d.nav.navcta}</a>
          <div className="langs">
            {LANGS.map((L) => (
              <button key={L} className={lang === L ? 'active' : ''} onClick={() => setLang(L)}>
                {L === 'uk' ? 'UA' : L.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </nav>

      <div className={`mm-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mm-close" onClick={() => setMenuOpen(false)}>&times;</button>
        {mobileLinks.map(([k, href]) => (
          <a key={k} href={href} onClick={() => setMenuOpen(false)}>{d.nav[k]}</a>
        ))}
      </div>

      <header className="hero">
        <div className="wrap">
          <div className="hero-text">
            <div className="eyebrow">{d.eyebrow}</div>
            <Rich as="h1" className="hero-title" html={d.h1.replace('<i>', '<i class="brush">')} />
            <p className="hero-sub">{d.herosub}</p>
            <div className="hero-cta">
              <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{d.cta1}</a>
              <a href="#about" className="btn btn-ghost">{d.cta2}</a>
            </div>
          </div>
          <div className="hero-photo">
            <div className="frame"><img src={CONFIG.heroPhoto} alt="Olena Kostetska on stage" /></div>
            <div className="medal-badge"><div className="n">2014</div><div className="l">{d.badge}</div></div>
          </div>
        </div>
      </header>

      <div className="marquee">
        <div className="marquee-track">
          {[...d.mq, ...d.mq].map((t, i) => (<span key={i}>{t}<b> ✦ </b></span>))}
        </div>
      </div>

      <section className="block wrap" id="services" style={{ background: 'linear-gradient(180deg,var(--bg-soft),transparent 55%)' }}>
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.servEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.servTitle} />
        <div className="cards">
          {d.services.map((service, i) => (
            <div className={`card ${service.feat ? 'featured' : ''}`} key={i}>
              <div className="card-top"><span className="card-tag">{String(i + 1).padStart(2, '0')}</span></div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="price-row"><div className="price">{service.prices.pl} zł / {service.prices.uk.toLocaleString('uk-UA')} ₴ / {service.prices.en} €</div></div>
              <div className="service-details"><span>{service.duration}</span><span>{service.format}</span></div>
              <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className={`btn ${service.feat ? 'btn-primary' : 'btn-ghost'}`}>{d.cta1}</a>
            </div>
          ))}
        </div>
        <p className="payment-note">{d.payment}</p>
      </section>

      <section className="block wrap" id="about">
        <div className="about">
          <div className="frame"><img src={CONFIG.aboutPhoto} alt="Olena Kostetska" /></div>
          <div>
            <div className="sec-eyebrow">{d.aboutEye}</div>
            <Rich as="h2" className="sec-title" html={d.aboutTitle} />
            <p>{d.aboutP1}</p>
            <p>{d.aboutP2}</p>
            <div className="quote">{d.aboutQuote}</div>
            <div className="stats">
              <div className="stat"><div className="n">20+</div><div className="l">{d.stat1}</div></div>
              <div className="stat"><div className="n">2014</div><div className="l">{d.stat2}</div></div>
              <div className="stat"><div className="n">2</div><div className="l">{d.stat3}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="block ach" id="ach">
        <div className="wrap">
          <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.achEye}</div></div>
          <Rich as="h2" className="sec-title" html={d.achTitle} />
          <p className="ach-intro">{d.achIntro}</p>
          <div className="titles">
            {d.titles.map((t, i) => (
              <div className="title-chip" key={i}><span className="ic">{t.i}</span><span>{t.t}</span></div>
            ))}
          </div>
          <div className="timeline">
            {d.timeline.map((row, i) => (
              <div className="tl-row" key={i}>
                <div className="tl-year">{row.y}</div>
                <div className="tl-events">
                  {row.ev.map((e, j) => (
                    <div className="tl-ev" key={j}><div className="dot" /><div><div className="place">{e.p}</div><div className="res">{e.r}</div></div></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block wrap" id="process">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.procEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.procTitle} />
        <div className="steps">
          {d.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="sn"><div className="si">{STEP_ICONS[i] || '•'}</div><span className="snum">{String(i + 1).padStart(2, '0')}</span></div>
              <h4>{s.h}</h4><p>{s.p}</p>
            </div>
          ))}
        </div>
        <div className="results">
          <h4>{d.resTitle}</h4>
          <div className="res-grid">
            {d.results.map((r, i) => (<div className="res-pill" key={i}><Check size={18} /><span>{r}</span></div>))}
          </div>
        </div>
      </section>

      <section className="block wrap" id="whom">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.whoEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.whoTitle} />
        <div className="goals">
          {d.goals.map((g, i) => (<div className="goal" key={i}><Check /><span>{g}</span></div>))}
        </div>
      </section>

      <section className="block wrap" id="values">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.valEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.valTitle} />
        <div className="values">
          {d.values.map((v, i) => (
            <div className="value" key={i}><div className="vn">0{i + 1}</div><h4>{v.t}</h4><p>{v.p}</p></div>
          ))}
        </div>
      </section>

      <section className="block wrap" id="includes">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.incEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.incTitle} />
        <div className="includes">
          {d.includes.map((x, i) => (
            <div className={`inc ${x.feat ? 'featured' : ''}`} key={i}>
              <h4>{x.t}</h4>
              <ul>{x.items.map((it, j) => (<li key={j}><Check size={18} /><span>{it}</span></li>))}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="block wrap" id="creds">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.credEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.credTitle} />
        <p style={{ color: 'var(--ink-2)', maxWidth: 650, lineHeight: 1.85, fontSize: '16.5px' }}>{d.credIntro}</p>
        <div className="creds">
          {d.creds.map((c, i) => (
            <div className="cred" key={i}>
              <div className="badge"><Star /></div>
              <div><h4>{c.t}</h4><p>{c.d}</p>{c.y && <span className="yr">{c.y}</span>}</div>
            </div>
          ))}
        </div>
        <div className="topics">
          {d.topics.map((t, i) => (<span className="topic" key={i}>{t}</span>))}
        </div>
      </section>

      <section className="block">
        <div className="cta-band">
          <Rich as="h2" html={d.ctaTitle} />
          <p>{d.ctaText}</p>
          <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{d.ctaBtn}</a>
        </div>
      </section>

      <section className="block wrap" id="faq">
        <div className="sec-head"><div className="sec-eyebrow" style={{ margin: 0 }}>{d.faqEye}</div></div>
        <Rich as="h2" className="sec-title" html={d.faqTitle} />
        <div>
          {d.faq.map((f, i) => (
            <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q"><h4>{f.q}</h4><div className="ic">+</div></div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <a href={CONFIG.instagramUrl} className={`fab ${fabShow ? 'show' : ''}`} target="_blank" rel="noopener">
        <IgIcon size={20} /><span>{d.fabText}</span>
      </a>

      <footer className="wrap">
        <div className="foot">
          <div className="logo">Olena <em>Kostetska</em></div>
          <a href={CONFIG.instagramUrl} className="ig" target="_blank" rel="noopener"><IgIcon /> {CONFIG.instagramHandle}</a>
        </div>
        <div className="copyright">{d.copy}</div>
      </footer>
    </>
  )
}
