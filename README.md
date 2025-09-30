# 🕊️ Лелека

🌐 [English](README.en.md) | [Українська](README.md)

---

## 📖 Про проєкт

**Лелека** — це простий і зручний трекер вагітності для майбутніх мам.

Користувачка може:

- зареєструватися (через email/пароль або **Google OAuth**);
- додати аватарку (зберігається у **Cloudinary**);
- відстежувати тижні вагітності (описи стану мами та розвитку дитини);
- вести особистий щоденник;
- створювати завдання й відмічати виконані.

Бекенд забезпечує REST API з інтегрованою документацією через **Swagger**.

---

## ⚙️ Використані технології

### Фронтенд

- **Next.js 15+ (App Router)**
- **React 18**, **TypeScript**
- **@tanstack/react-query** — робота з API
- **Zustand** — стан застосунку
- **Formik** + **Yup** — форми та валідація
- **Axios** — HTTP-запити
- **react-hot-toast**, **react-spinners** — UX-компоненти
- **modern-normalize** — стилізація

### Бекенд

- **Node.js**, **Express**
- **MongoDB** (**Mongoose**)
- **JWT (jsonwebtoken)**, **bcrypt**, **google-auth-library**
- **Multer** + **Cloudinary** — завантаження зображень
- **Swagger** — API-документація
- **pino**, **pino-http**, **pino-pretty** — логування

---

## 🗂 Структура проєкту (фронтенд)

```

.
|-- app/                     # Маршрути (App Router Next.js)
|   |-- (auth routes)/       # Авторизація/реєстрація
|   |-- (private routes)/    # Закриті сторінки (щоденник, профіль, подорож тижнями)
|   |-- layout.tsx           # Глобальний layout
|   |-- globals.css          # Глобальні стилі
|
|-- components/              # UI та бізнес-компоненти
|-- lib/                     # API-клієнти, хуки, схеми, Zustand store
|-- public/                  # Публічні ресурси (іконки, зображення, шрифти)
|-- services/                # API-запити (tasks, weeks)
|-- types/                   # Типи TypeScript
|-- utils/                   # Утиліти та схеми валідації
|-- env.example.txt          # Приклад env-змінних
|-- next.config.ts           # Налаштування Next.js
|-- tsconfig.json            # Конфіг TypeScript
|-- eslint.config.mjs        # Лінтинг (ESLint + Prettier)
|-- README.md                # Основний опис проєкту

```

---

## 🛣 Маршрутизація (App Router)

- `/auth/register` — реєстрація
- `/auth/login` — вхід
- `/auth/confirm-google-auth` — підтвердження Google OAuth
- `/diary` — список записів
  - `/diary/[entryId]` — перегляд запису
- `/journey` — подорож по тижнях
  - `/journey/[weekNumber]` — детальна інформація за тиждень
- `/profile` — профіль
  - `/profile/edit` — редагування даних

---

## 🚀 Як запустити

### 1. Клонування репозиторію

```bash
git clone https://github.com/IhorMtr/project-TeamSurvivors-front
cd project-TeamSurvivors-front
```

### 2. Встановлення залежностей

```bash
npm install
```

### 3. Налаштування середовища

Створіть файл `.env` у корені проєкту та додайте змінні (приклад у
`env.example.txt`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/confirm-google-auth
```

### 4. Запуск у режимі розробки

```bash
npm run dev
```

---

## 🌍 API (бекенд)

### Auth

- `POST /api/auth/register` — реєстрація
- `POST /api/auth/login` — авторизація
- `POST /api/auth/logout` — вихід
- `POST /api/auth/refresh` — оновлення access токена
- `GET /api/auth/get-oauth-url` — отримати посилання для Google OAuth
- `POST /api/auth/confirm-oauth` — підтвердити Google OAuth

### Користувач

- `GET /api/users/me` — інформація про користувача
- `PATCH /api/users/me` — редагування профілю
- `PATCH /api/users/me/photo` — оновлення фото профілю

### Щоденник

- `GET /api/diaries` — отримати всі записи
- `POST /api/diaries` — створити запис
- `GET /api/diaries/{entryId}` — отримати запис за ID
- `PATCH /api/diaries/{entryId}` — оновити запис
- `DELETE /api/diaries/{entryId}` — видалити запис

### Завдання

- `GET /api/tasks` — отримати всі завдання
- `POST /api/tasks` — створити завдання
- `PATCH /api/tasks/{taskId}` — оновити статус завдання

### Вагітність (Weeks)

- `GET /api/weeks/my-day/{estimateBirthDate}` — інформація за розрахунковою
  датою пологів
- `GET /api/weeks/my-day-demo` — демо-дані дня
- `GET /api/weeks/baby-state/{currentWeek}` — розвиток дитини за тижнем
- `GET /api/weeks/mom-state/{currentWeek}` — стан мами за тижнем

📑 Swagger доступний за адресою:
https://project-teamsurvivors.onrender.com/api/api-docs/

---

## 🧩 Додатково

- Код стилізовано під **Prettier**, перевіряється через **ESLint**
- Використовується повна типізація (**TypeScript**)
- CI/CD можливо налаштувати через GitHub Actions (lint/test/build)
