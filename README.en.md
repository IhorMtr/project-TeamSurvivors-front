# 🕊️ Lehlehka

🌐 [English](README.en.md) | [Українська](README.md)

---

## 📖 About the project

**Lehlehka** is a simple and convenient pregnancy tracker for expectant mothers.

A user can:

- register (via email/password or **Google OAuth**);
- upload a profile avatar (stored in **Cloudinary**);
- track pregnancy weeks (descriptions of the mother's state and baby's
  development);
- keep a personal diary;
- create tasks and mark them as completed.

The backend provides a REST API with integrated **Swagger** documentation.

---

## ⚙️ Technologies Used

### Frontend

- **Next.js 15+ (App Router)**
- **React 18**, **TypeScript**
- **@tanstack/react-query** — API data fetching
- **Zustand** — state management
- **Formik** + **Yup** — forms and validation
- **Axios** — HTTP requests
- **react-hot-toast**, **react-spinners** — UX components
- **modern-normalize** — styling

### Backend

- **Node.js**, **Express**
- **MongoDB** (**Mongoose**)
- **JWT (jsonwebtoken)**, **bcrypt**, **google-auth-library**
- **Multer** + **Cloudinary** — image uploads
- **Swagger** — API documentation
- **pino**, **pino-http**, **pino-pretty** — logging

---

## 🗂 Project Structure (frontend)

```

.
|-- app/                     # Routes (Next.js App Router)
|   |-- (auth routes)/       # Authentication/registration
|   |-- (private routes)/    # Private pages (diary, profile, pregnancy journey)
|   |-- layout.tsx           # Global layout
|   |-- globals.css          # Global styles
|
|-- components/              # UI and business components
|-- lib/                     # API clients, hooks, schemas, Zustand store
|-- public/                  # Public assets (icons, images, fonts)
|-- services/                # API calls (tasks, weeks)
|-- types/                   # TypeScript types
|-- utils/                   # Utilities and validation schemas
|-- env.example.txt          # Example env variables
|-- next.config.ts           # Next.js config
|-- tsconfig.json            # TypeScript config
|-- eslint.config.mjs        # ESLint + Prettier config
|-- README.md                # Main project description

```

---

## 🛣 Routing (App Router)

- `/auth/register` — registration
- `/auth/login` — login
- `/auth/confirm-google-auth` — confirm Google OAuth
- `/diary` — list of diary entries
  - `/diary/[entryId]` — view diary entry
- `/journey` — pregnancy journey by weeks
  - `/journey/[weekNumber]` — detailed info for a week
- `/profile` — profile
  - `/profile/edit` — edit profile

---

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone https://github.com/IhorMtr/project-TeamSurvivors-front
cd project-TeamSurvivors-front
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add variables (see
`env.example.txt`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/auth/confirm-google-auth
```

### 4. Start development server

```bash
npm run dev
```

---

## 🌍 API (backend)

### Auth

- `POST /api/auth/register` — registration
- `POST /api/auth/login` — login
- `POST /api/auth/logout` — logout
- `POST /api/auth/refresh` — refresh access token
- `GET /api/auth/get-oauth-url` — get Google OAuth link
- `POST /api/auth/confirm-oauth` — confirm Google OAuth

### Users

- `GET /api/users/me` — get user info
- `PATCH /api/users/me` — update profile
- `PATCH /api/users/me/photo` — update profile photo

### Diaries

- `GET /api/diaries` — get all entries
- `POST /api/diaries` — create entry
- `GET /api/diaries/{entryId}` — get entry by ID
- `PATCH /api/diaries/{entryId}` — update entry
- `DELETE /api/diaries/{entryId}` — delete entry

### Tasks

- `GET /api/tasks` — get all tasks
- `POST /api/tasks` — create task
- `PATCH /api/tasks/{taskId}` — update task status

### Pregnancy (Weeks)

- `GET /api/weeks/my-day/{estimateBirthDate}` — info by estimated due date
- `GET /api/weeks/my-day-demo` — demo day info
- `GET /api/weeks/baby-state/{currentWeek}` — baby development by week
- `GET /api/weeks/mom-state/{currentWeek}` — mom’s state by week

📑 Swagger docs available at:
[https://project-teamsurvivors.onrender.com/api/api-docs/](https://project-teamsurvivors.onrender.com/api/api-docs/)

---

## 🧩 Additional Info

- Code formatted with **Prettier**, linted with **ESLint**
- Fully typed with **TypeScript**
- CI/CD can be configured with GitHub Actions (lint/test/build)
