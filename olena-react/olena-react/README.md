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
  App.jsx           — усі секції сайту
  content.js        — УВЕСЬ текст (3 мови), ціни, курси валют  ← правити тут
  index.css         — стилі
```

## Як правити тексти / ціни

Усе — у `src/content.js`:
- Тексти кожної мови в об'єкті `DATA` (`uk`, `pl`, `en`).
- Ціни — поле `eur` у `services`. Гривні/злоті рахуються автоматично з курсу в `RATES` (гривня ≈ ×51, злотий ≈ ×4.26). Знижка — поле `disc` (0.2 = −20%).
- Місця в наявності — `spots` / `total`.

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
