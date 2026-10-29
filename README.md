# 🏍️ Rideo

**A production-grade bike rental platform for Indian cities.**

Rideo is a full-stack monorepo (pnpm + Turborepo) featuring a customer website, an admin analytics dashboard, and a NestJS backend connected to a cloud PostgreSQL database (Neon).

## 🎯 Features

### Customer App

- Email/Password authentication (JWT)
- Browse bikes with city & category filters
- Real-time booking system with QR code
- User profile & Change password
- My Bookings dashboard

### Admin Dashboard ⭐

- Real-time KPIs (Total Users, Revenue, Bookings)
- Bike Inventory Management
- Booking Management (Confirm/Cancel)
- User Directory
- Data Visualization (Bikes by City)

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** NestJS, Prisma ORM, JWT
- **Database:** PostgreSQL (Neon Cloud)
- **Monorepo:** Turborepo, pnpm workspaces
- **Deployment:** Vercel (Frontend), Render (Backend), Neon (Database)

## 📁 Structure

```text
Rideo/
├── apps/
│   ├── customer/    # Customer website
│   ├── admin/       # Admin dashboard
│   └── api/         # NestJS backend
├── packages/
│   ├── database/    # Prisma schema & migrations
│   └── types/       # Shared TypeScript types
└── docs/
```
