# Centre de Formation de Football

PWA de gestion d'école de football – SaaS multi-tenant.

## 🚀 Tech Stack

- **Frontend** : Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS
- **Backend** : Supabase (PostgreSQL, RLS, Auth, Storage, Realtime)
- **État & Cache** : TanStack Query, Zustand
- **Formulaires** : React Hook Form, Zod
- **Monitoring** : Sentry, PostHog
- **Tests** : Vitest (RLS), Playwright (E2E)
- **PWA** : Service Worker, Manifest, Offline-ready

## 📁 Structure du projet

```
/src
  /app          # Routes Next.js (public, auth, dashboard)
  /components   # Composants UI réutilisables
  /domains      # Logique métier (DDD)
    /players
    /matches
    /convocations
    /notifications
  /lib          # Clients (Supabase, Sentry, PostHog)
  /hooks        # Custom hooks React
  /types        # Types globaux
  /test         # Tests RLS
/supabase
  /migrations   # Migrations SQL versionnées
  /functions    # Edge Functions
/public         # Assets statiques + PWA manifest
```

## 🏁 Démarrage rapide

```bash
# Cloner le dépôt
git clone [repo-url]
cd [project]

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Remplir NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY

# Lancer le développement
npm run dev

# Build production
npm run build
npm start
```

## 📚 Documentation complète

- [Onboarding académie](./docs/ONBOARDING.md)
- [Déploiement](./docs/DEPLOYMENT.md)
- [Schéma base de données](./docs/SCHEMA.md)
- [Checklist Déploiement](./docs/DEPLOYMENT_CHECKLIST.md)

## 🧪 Tests

```bash
# Tests RLS (Vitest)
npm test

# Tests E2E (Playwright)
npx playwright test

# Lint & Typecheck
npm run lint
```

## 📊 Monitoring

- **Sentry** : [URL dashboard] – erreurs et performances
- **PostHog** : [URL dashboard] – analytics utilisateurs

## 👥 Équipe

| Rôle | Contact |
|------|---------|
| Product & Architecture Lead | Antigravity |

## 📝 License

Proprietary
