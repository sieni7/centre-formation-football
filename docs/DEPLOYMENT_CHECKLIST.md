# Checklist Déploiement – Production

## 1. PRÉ-DÉPLOIEMENT

- [ ] Build local (`npm run build`) sans erreur
- [ ] Tests RLS (`npm test`) 100% passants
- [ ] Audit sécurité : aucune clé `service_role` dans le frontend
- [ ] Lighthouse scores > 90 sur mobile/desktop

## 2. INFRASTRUCTURE SUPABASE

- [ ] Migrations SQL exécutées dans l'ordre
- [ ] Buckets Storage (`media`, `exports`) créés
- [ ] Realtime activé sur les tables critiques
- [ ] Edge Function `export-matches` déployée
- [ ] Backups quotidiens activés

## 3. DÉPLOIEMENT VERCEL

- [ ] Variables d'environnement configurées
- [ ] Branche `main` liée au projet
- [ ] Node version 20.x sélectionnée
- [ ] Domaine personnalisé configuré et SSL actif

## 4. MONITORING

- [ ] Sentry DSN configuré et erreurs trackées
- [ ] PostHog API key configurée et events trackés
- [ ] Vercel Web Vitals activé

## 5. VALIDATION FONCTIONNELLE (UAT)

- [ ] Accès Home page OK
- [ ] Connexion Admin/Coach/Joueur OK
- [ ] Création match + Convocation OK
- [ ] Notification temps réel OK
- [ ] Export CSV OK
- [ ] PWA installable sur iOS/Android

**Statut final :** ✅ PRÊT POUR GO-LIVE
