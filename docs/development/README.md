# Local development

Use Node.js 20.11+, pnpm 9+, Python 3.11+, and Docker Compose.

1. Copy root `.env.example` to `.env` and fill in local values.
2. Run `docker compose up -d` for PostgreSQL and Redis.
3. Run `pnpm install`.
4. Run `pnpm db:generate` and `pnpm db:migrate`.
5. Run `pnpm dev` to start both web applications and the API.
6. Start ML separately: `cd apps/ml-service`, create/activate a virtual environment,
   `pip install -e .`, then `uvicorn app.main:app --reload --port 8000`.

Customer: http://localhost:3000 · Admin: http://localhost:3001 · API: http://localhost:4000/api/health
· ML: http://localhost:8000/health

