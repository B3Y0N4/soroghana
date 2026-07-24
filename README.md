# Soro Ghana

Marketplace connecting vetted Ghanaian professionals (translators, fixers, developers, on-ground services) with local and international clients — built as an AI-coordinated human-assistance network. See project memory / architecture notes for the full business model.

## Setup

```bash
npm install
```

Copy `.env` and fill in:

- `DATABASE_URL` — Postgres connection string (Supabase: Project Settings > Database > Connection string > URI, "Transaction pooler" variant)
- `ADMIN_PASSWORD` / `SESSION_SECRET` — gate the `/admin` ops console (see `proxy.ts`, `lib/admin-session.ts`)
- `STRIPE_SECRET_KEY` / `PAYSTACK_SECRET_KEY` — optional until you're actually charging/paying out (see `lib/payments/`)

Then set up the database:

```bash
npx prisma migrate dev --name init   # creates tables
npx prisma db seed                   # loads the 8 sample providers from lib/providers.ts
```

```bash
npm run dev
```

## What's real vs. stubbed

- **Real**: post-job / join forms persist to Postgres; `/browse` and provider profiles read from the DB; `/admin` is a working manual matching + KYC console (this stands in for the AI Coordinator until there's enough match history to automate it).
- **Stubbed on purpose**: `lib/payments/` has real Stripe/Paystack integration code, but it throws until you set the corresponding env var — there's no fake "success" path. GPS tracking is intentionally not built yet; the plan is WhatsApp-reported check-ins first (see `Engagement.checkInsJson`), real GPS only if volume demands it.

## Deploying

If deploying this (e.g. to Vercel), set the same env vars above in the platform's project settings — `.env` is gitignored and won't travel with the repo.
