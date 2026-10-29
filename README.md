# Rideo

**A two-wheeler rental platform for everyday city rides and Indian getaways.**

Rideo is organized as a pnpm workspace and Turborepo monorepo. It contains the customer web
app, operations dashboard, NestJS API, FastAPI ML service, shared UI/types, and Prisma database
package. This repository is a production-oriented **foundation**, not a finished rental service:
OTP, authorization, inventory/search, booking, Razorpay payments, QR unlocking, admin analytics,
map layers, email reports, and deployment integrations still require implementation and secrets.

## Workspace

```text
apps/
  customer/       Next.js customer experience (port 3000)
  admin/          Next.js operations dashboard (port 3001)
  api/            NestJS REST/WebSocket API (port 4000)
  ml-service/     FastAPI forecasting and analytics service (port 8000)
packages/
  database/       Prisma schema and generated client
  types/          Shared TypeScript domain contracts
  ui/             Shared React UI primitives
  config/         Shared configuration package boundary
docs/             Architecture, development, API, and operations docs
```

## Prerequisites

- Node.js 20.11 or newer
- pnpm 9 or newer
- Docker Desktop / Docker Compose
- Python 3.11 or newer (for the ML service)

## Getting started

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm dev
```

On Windows PowerShell, copy the environment file with `Copy-Item .env.example .env`.
The API health check is available at `http://localhost:4000/api/health`.

Run the ML service in a second terminal:

```bash
cd apps/ml-service
python -m venv .venv
# Activate .venv for your shell, then:
pip install -e .
uvicorn app.main:app --reload --port 8000
```

The forecasting endpoint accepts historical `ds` (date) and `y` (revenue) rows at
`POST /v1/forecast`; its output must not be treated as a business commitment without validation.

## Useful commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run customer, admin, and API dev servers |
| `pnpm build` | Build workspace packages and applications |
| `pnpm lint` | Lint Node workspace |
| `pnpm typecheck` | Type-check TypeScript packages |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Apply development database migrations |
| `pnpm db:studio` | Open Prisma Studio |

## Configuration and safety

Use each app's `.env.example` alongside the root `.env.example` as a variable inventory.
Never commit real credentials. Rotate local development secrets before any shared environment.
Restrict production CORS origins, add authentication and role checks before exposing admin
routes, verify payment signatures, and enforce idempotency and transactional booking rules.

### Local PostgreSQL authentication

For the local Compose database, keep `DATABASE_URL` in the root `.env`, `apps/api/.env` (if
present), and `packages/database/.env` consistent with the `rideo` user, `rideo_local`
password, and `rideo` database configured in `docker-compose.yml`. Compose maps host port
`5433` to PostgreSQL's container port `5432`, so local URLs must use `localhost:5433`. The API
reads its own environment while Prisma CLI commands read the database package's environment
file.

PostgreSQL only applies `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` when its data
volume is initialized. If an existing local volume was initialized with a different password,
update the role without deleting the volume or its data:

```bash
docker compose exec -T postgres psql -U rideo -d rideo -c "ALTER ROLE rideo WITH PASSWORD 'rideo_local';"
```

Then retry `pnpm db:migrate` or restart the API.

## Deployments

Deployment targets (Vercel, Railway, Neon, Upstash) are intended options, not provisioned
resources. Configure independent project environments, migrations, health checks, secure
secret stores, logging/metrics, and rollback procedures before production release.
See [documentation](./docs/README.md) for architecture and operational notes.
