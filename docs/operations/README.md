# Operations

This folder is the home for deployment runbooks, service-level objectives, incident response,
backup/restore procedures, monitoring, and operational dashboards. Do not store credentials here.

## Live deployment configuration

- In Vercel, set `NEXT_PUBLIC_API_URL` to `https://rideo.onrender.com/api` for the
  customer app, then redeploy so the value is included in the frontend build.
- In Render, set `DATABASE_URL` to the Neon PostgreSQL connection string and `JWT_SECRET`
  to a strong, private random value. Never commit or share either value.
- The API allows `https://rideo-two.vercel.app`,
  `https://rideo-git-main-aryan-8f3a.vercel.app`, and `http://localhost:3000` for CORS.
  Set `CUSTOMER_URL` or `ADMIN_URL` in Render only when using additional frontend origins.
