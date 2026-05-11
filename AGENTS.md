# Agent Collaboration Protocol

This document defines how AI agents (Lead, Next, Supa) collaborate on the "Centre de Formation de Football" project.

## 1. Communication Channels
- All architectural decisions must be recorded in `ARCHITECTURE.md`.
- Sprint progress is tracked in `task.md`.
- Technical summaries are provided at the end of each turn.

## 2. Code Standards
- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS + Vanilla CSS.
- **Data**: Supabase (Client-side usage where possible, Server Actions for mutations).
- **Structure**: Domain-driven design in `/src/domains`.

## 3. PR Validation
- Agents must verify that their changes pass `npm run build` and `npm run lint` before proposing a merge.
- Use `Conventional Commits` for all changes.

## 4. Documentation
- Update `RUNBOOK_S0.md` or equivalent for each sprint completion.
