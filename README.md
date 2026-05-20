# Usman Akhtar Portfolio

Full-stack MERN portfolio with a public website and a protected admin panel. The admin panel lets you manage hero content, about content, projects, services, skills, resume, social links, and contact messages.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT admin login
- Uploads: Cloudinary in production, local fallback in development
- Deployment target: Frontend on Vercel, backend on Render

## Project Structure

```txt
backend/
  models/
  routes/
  middleware/
  utils/
  scripts/
  server.js

frontend/
  src/
    components/
    pages/
    utils/
  vite.config.js
  vercel.json
```

## Features

- Public portfolio pages
- Admin login
- Editable hero section
- Editable about page and home about section
- Project CRUD with image upload
- Services CRUD
- Skills CRUD
- Resume upload
- Social links management
- Contact form and message management
- Production-ready API URL handling
- Vercel SPA routing support

## Local Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

Create `backend/.env` from `backend/.env.example`:

```txt
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
PUBLIC_API_URL=http://localhost:5000
ALLOWED_ORIGINS=http://localhost:3000
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Start backend:

```bash
npm run dev
```

Seed admin user:

```bash
npm run seed:admin
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

For local development, no frontend `.env` is required because Vite proxies `/api` to `http://localhost:5000`.

Start frontend:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Admin panel:

```txt
http://localhost:3000/admin/login
```

## Environment Variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | Backend port, defaults to `5000` |
| `MONGODB_URI` | Yes | MongoDB Atlas/local connection string |
| `JWT_SECRET` | Yes | Secret used to sign admin JWT tokens |
| `ADMIN_EMAIL` | Yes | Email used by admin seed script |
| `ADMIN_PASSWORD` | Yes | Password used by admin seed script |
| `PUBLIC_API_URL` | Production recommended | Backend public URL, used for uploaded asset URLs |
| `ALLOWED_ORIGINS` | Production recommended | Comma-separated frontend origins allowed by CORS |
| `CLOUDINARY_CLOUD_NAME` | Production recommended | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Production recommended | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Production recommended | Cloudinary API secret |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Production required | Render backend URL, e.g. `https://your-backend.onrender.com` |

## Deployment

### Backend on Render

Create a new Render Web Service.

Settings:

```txt
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Add environment variables:

```txt
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
PUBLIC_API_URL=https://your-backend.onrender.com
ALLOWED_ORIGINS=https://your-frontend.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

After first deploy, open Render shell and seed the admin:

```bash
npm run seed:admin
```

Backend test URLs:

```txt
https://your-backend.onrender.com/api/hero
https://your-backend.onrender.com/api/projects
```

### Frontend on Vercel

Create a new Vercel project from the same repo.

Settings:

```txt
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Add environment variable:

```txt
VITE_API_URL=https://your-backend.onrender.com
```

Deploy.

Public site:

```txt
https://your-frontend.vercel.app/
```

Admin panel:

```txt
https://your-frontend.vercel.app/admin/login
```

## Separate Portfolio and Admin Links

Simple setup:

```txt
Portfolio: https://your-frontend.vercel.app/
Admin: https://your-frontend.vercel.app/admin/login
```

Custom domain setup:

```txt
Portfolio: https://portfolio.yourdomain.com
Admin: https://portfolio.yourdomain.com/admin/login
```

If using multiple domains, add all of them to backend `ALLOWED_ORIGINS`:

```txt
ALLOWED_ORIGINS=https://portfolio.yourdomain.com,https://www.yourdomain.com,https://your-frontend.vercel.app
```

## Admin Credentials

Admin credentials come from backend environment variables:

```txt
ADMIN_EMAIL
ADMIN_PASSWORD
```

Run this after changing credentials:

```bash
cd backend
npm run seed:admin
```

Note: If an admin user already exists, the seed script will not overwrite it.

## Production Notes

- Use Cloudinary for production uploads. Render's local filesystem is not reliable for persistent uploads.
- `frontend/vercel.json` is included so React Router routes like `/admin/login` do not 404 on refresh.
- `VITE_API_URL` must not include `/api`; use only the backend base URL.
- `PUBLIC_API_URL` should be the Render backend base URL.

## Troubleshooting

### Frontend cannot load data

Check Vercel environment variable:

```txt
VITE_API_URL=https://your-backend.onrender.com
```

Redeploy frontend after changing it.

### CORS error

Add frontend URL to Render backend:

```txt
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

Restart/redeploy backend.

### Admin login fails

Run on Render shell:

```bash
npm run seed:admin
```

Also verify:

```txt
JWT_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD
MONGODB_URI
```

### Image upload fails

Check Cloudinary variables:

```txt
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### Page refresh gives 404 on Vercel

Make sure `frontend/vercel.json` exists and redeploy frontend.

## Useful Commands

Backend:

```bash
cd backend
npm run dev
npm start
npm run seed:admin
```

Frontend:

```bash
cd frontend
npm run dev
npm run build
npm run preview
```
