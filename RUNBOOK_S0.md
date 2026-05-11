# RUNBOOK SPRINT 0 - Project Initialized

## Technical State
- **Framework**: Next.js 15.2.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (ready for keys)
- **Monitoring**: Sentry/PostHog (ready for keys)

## Project Structure
```
/src
  /app         - Next.js App Router routes
  /components  - Shared UI components
  /domains     - Business logic (Domain-Driven Design)
    /_template - Template for new domains
  /hooks       - Shared custom hooks
  /lib         - External clients & utilities (Supabase, Sentry, etc.)
  /types       - Global TypeScript definitions
```

## Environment Variables
Configured in `.env.local.example`. Required for Sprint 1:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Governance
- **Commits**: Conventional Commits (enforced via `CONTRIBUTING.md`)
- **PRs**: Template in `.github/PULL_REQUEST_TEMPLATE.md`
- **Agents**: Protocols in `AGENTS.md`

## Next Steps
- Provision Supabase tables.
- Start Sprint 1 (Core Features).
