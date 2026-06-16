# V.Colors — Textile Manufacturer Website

Monorepo for the V.Colors B2B textile website (Surat, Gujarat).

## Project structure

```
v-colors/
├── frontend/     React + Vite + Tailwind (public website + admin UI)
├── backend/      Express + MongoDB API
├── .env          Environment variables (create from .env.example)
└── README.md
```

## Requirements

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

1. **Install dependencies**

```bash
npm run install:all
```

2. **Environment**

Copy `.env` to project root (same folder as this README). Required keys:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — auth secret
- `CLIENT_URL` — e.g. `http://localhost:5173`
- `VITE_API_URL` — use `/api` for local dev (Vite proxy)
- Optional: Cloudinary, Stripe, SMTP, Twilio

3. **Seed database** (first time)

```bash
npm run seed
```

## Development

Run **frontend + backend** together:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

Or run separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Production

```bash
npm run build
npm run start
```

Serve the `frontend/dist` folder with your host/CDN and point the API to the backend.

## Admin

Default admin (after seed): see `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`.

Login: `/admin/login`
