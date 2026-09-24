# Olena Kostetska — лендинг

Vite + React. Трёхмовний сайт (UA / PL / EN) з автовизначенням мови.

## Структура

```
index.html          — точка входу, SEO + OG-мета, підключення шрифтів
vite.config.js      — конфіг Vite
vercel.json         — конфіг деплою на Vercel
package.json        — залежності
public/
  hero.jpg          — фото для першого екрана
  about.jpg         — фото для секції «Про мене»
src/
  main.jsx          — старт React
  App.jsx           — усі секції, тексти (3 мови), фіксовані ціни та стилі
```

## Як правити тексти / ціни

Усе — у `src/App.jsx`:
- Тексти кожної мови в об'єкті `DATA` (`uk`, `pl`, `en`).
- Ціни — поля `prices.pl` (PLN), `prices.uk` (UAH), `prices.en` (EUR) у `services` кожної мови. Значення фіксовані вручну, без конвертації.
- Послуги: консультація (100 zł / 1 200 ₴ / 25 €), персональне тренування (150 zł / 1 800 ₴ / 35 €), онлайн-ведення на 4 тижні (400 zł / 4 700 ₴ / 90 €).
- Контактні кнопки ведуть на `CONFIG.instagramUrl`. Усі послуги оплачуються до початку роботи; персональні заняття оплачуються окремо від онлайн-ведення.

---

## Деплой (перший раз)

### 1. Залити на GitHub
1. Створи новий репозиторій на github.com (напр. `olena-landing`), **без** README.
2. У теці проєкту виконай:
```bash
git init
git add .
git commit -m "Olena landing"
git branch -M main
git remote add origin https://github.com/ТВІЙ_ЛОГІН/olena-landing.git
git push -u origin main
```

### 2. Підключити Vercel
1. Зайди на vercel.com → увійди через GitHub.
2. **Add New… → Project** → вибери репозиторій `olena-landing`.
3. Vercel сам визначить Vite. Нічого не міняй → **Deploy**.
4. За ~1 хв отримаєш посилання виду `olena-landing.vercel.app`.

### 3. Свій домен (опційно)
Project → **Settings → Domains** → додай свій домен і онови DNS за інструкцією Vercel.

---

## Оновлення сайту

Після будь-яких правок:
```bash
git add .
git commit -m "опис змін"
git push
```
Vercel автоматично пересоберe й оновить сайт за хвилину.

## Локальний запуск (за бажанням)
```bash
npm install
npm run dev      # http://localhost:5173
```

---

## Що додати далі (коли будуть матеріали)
- Фото **до/після** клієнток (слайдер) — найсильніше для продажів.
- Відгуки з іменами/фото.
- Професійні портрети Олени.
- Реальна оплата (Stripe) замість переходу в Instagram.
- Квіз «Підбери програму».
