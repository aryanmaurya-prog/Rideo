# Architecture

Rideo is a pnpm/Turborepo monorepo with separate customer and admin Next.js applications,
a NestJS API, and a FastAPI ML service. PostgreSQL is the system of record; Redis is intended
for ephemeral caching, queues, and rate limiting. Shared TypeScript contracts live in
`packages/types`, while Prisma schema and client dependencies are owned by `packages/database`.

Production requirements before launch: establish authentication and authorization boundaries,
validate payment webhooks, enforce transactional booking/availability rules, add observability,
and configure secrets, migrations, backups, and deployment environments.

