# Guide de Déploiement – Production

## Architecture cible

```
┌─────────────────┐     ┌─────────────────┐
│   Vercel (FE)   │────▶│  Supabase (DB)  │
│  Next.js 16     │     │  PostgreSQL     │
└─────────────────┘     │  RLS + Storage  │
                        └─────────────────┘
                               │
                        ┌───────▼───────┐
                        │ Edge Function │
                        │ (Deno)        │
                        └───────────────┘
```

## Prérequis

- [ ] Compte [Vercel](https://vercel.com)
- [ ] Compte [Supabase](https://supabase.com)
- [ ] Compte [Sentry](https://sentry.io) (optionnel)
- [ ] Compte [PostHog](https://posthog.com) (optionnel)

---

## Étape 1 : Préparation de l'environnement

### 1.1 Variables d'environnement (Vercel)

| Variable | Description | Source |
|----------|-------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase | Supabase Settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase | Supabase Settings |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN | Sentry Settings |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog API key | PostHog Settings |

---

## Étape 2 : Déploiement Supabase

### 2.1 Exécuter les migrations

```bash
# SQL Editor → New Query
# Exécuter chaque migration dans l'ordre chronologique :
supabase/migrations/
├── 20240510_initial_schema.sql
├── 20240510_sprint2_media.sql
├── 20240510_sprint2_audit.sql
└── 20240510_sprint3_schema.sql
```

### 2.2 Configurer Storage

```sql
-- Créer bucket media (public)
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
-- Créer bucket exports (privé)
INSERT INTO storage.buckets (id, name, public) VALUES ('exports', 'exports', false);
```

### 2.3 Activer Realtime

Activer Realtime sur les tables `convocations` et `notifications` via le Dashboard Supabase (Database -> Replication).

### 2.4 Déployer Edge Function

```bash
supabase functions deploy export-matches
```

---

## Étape 3 : Déploiement Vercel

1. Importer le dépôt Git dans Vercel.
2. Configurer les variables d'environnement.
3. Déclencher le build (`npm run build`).

---

## Étape 4 : Seed des données

```bash
# S'assurer d'avoir SUPABASE_SERVICE_ROLE_KEY dans .env.local
npm run seed
```

---

## Étape 5 : Vérification

- [ ] Page d'accueil OK
- [ ] Connexion OK
- [ ] Export CSV OK
- [ ] Notifications Realtime OK
