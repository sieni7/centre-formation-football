# Guide d'Onboarding – Académie de Football

## Introduction

Ce guide vous accompagne dans la configuration et la prise en main de votre académie sur la plateforme "Centre de Formation de Football".

## Prérequis

- Un compte administrateur créé (contactez l'équipe technique)
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)
- Option PWA : iOS (Safari) ou Android (Chrome)

## Étape 1 : Première connexion

1. Rendez-vous sur `/auth/login`
2. Utilisez les identifiants fournis par l'équipe technique
3. Changez votre mot de passe immédiatement

## Étape 2 : Configuration de votre académie

### 2.1 Informations générales

```sql
-- Exécuter dans Supabase SQL Editor
UPDATE academies 
SET name = 'Nom de votre académie',
    slug = 'votre-slug-unique',
    settings = '{"timezone": "Europe/Paris", "currency": "EUR"}'::jsonb
WHERE id = 'votre-academy-id';
```

### 2.2 Upload du logo

1. Accédez à `/dashboard/academy/settings`
2. Uploader votre logo (format PNG/JPG/WEBP, max 5MB)
3. Le logo apparaîtra automatiquement sur le site public

### 2.3 Création des rôles utilisateurs

| Rôle | Description | Droits |
|------|-------------|--------|
| **ACADEMY_ADMIN** | Gestion complète de l'académie | CRUD toutes entités |
| **COACH** | Gestion sportive (joueurs, matchs, convocations) | CRUD joueurs/matchs |
| **PLAYER** | Consultation stats, réponses convocations | Lecture + réponse |
| **PARENT** | Suivi des enfants, réponses convocations | Lecture enfants |

## Étape 3 : Gestion des utilisateurs

### 3.1 Inviter un coach

1. Dashboard Admin → "Gestion utilisateurs" → "Inviter"
2. Remplir email et rôle (COACH)
3. L'utilisateur reçoit un email d'invitation

### 3.2 Importer des joueurs

**Méthode 1 : Import CSV**
```csv
nom,prenom,numero,poste,date_naissance
Dupont,Jean,10,ATT,2010-05-15
Martin,Lucas,5,DEF,2010-08-22
```

**Méthode 2 : Création manuelle**
- Dashboard Coach → "Joueurs" → "Nouveau joueur"

### 3.3 Lier un parent à un joueur

1. Dashboard Admin → "Parents" → "Lier parent"
2. Sélectionner le parent et le(s) joueur(s)
3. Le parent voit instantanément les convocations de ses enfants

## Étape 4 : Gestion sportive

### 4.1 Créer un match

```typescript
// Formulaire (Coach Dashboard)
{
  opponent: "AS Saint-Étienne",
  match_date: "2026-06-15T15:00:00+02:00",
  location: "Stade Municipal",
  is_home: true
}
```

### 4.2 Convoquer des joueurs

1. Ouvrir le match concerné
2. Cliquer sur "Convoquer"
3. Sélectionner les joueurs
4. Validation → Notifications envoyées automatiquement

### 4.3 Suivre les réponses

| Statut | Icône | Signification |
|--------|-------|---------------|
| PENDING | ⏳ | En attente de réponse |
| ACCEPTED | ✅ | Joueur présent |
| DECLINED | ❌ | Joueur absent |

## Étape 5 : Personnalisation du site public

### 5.1 Page d'accueil

Les contenus de la page d'accueil sont modifiables via le Dashboard.

### 5.2 Effectif public

Seuls les joueurs avec `public_profile = true` apparaissent sur `/squad`

```sql
-- Rendre un joueur visible publiquement
UPDATE players SET public_profile = true WHERE id = 'player-id';
```

## Étape 6 : Utilisation mobile (PWA)

### Installation sur iOS

1. Ouvrir Safari sur l'URL de l'application
2. Taper sur le bouton "Partager" (carré avec flèche)
3. Sélectionner "Sur l'écran d'accueil"
4. Nommer l'application → "Ajouter"

### Installation sur Android

1. Ouvrir Chrome sur l'URL de l'application
2. Appuyer sur "Ajouter à l'écran d'accueil"
3. Confirmer → l'app s'installe

### Offline

L'application fonctionne en mode hors-ligne pour :
- Consultation de l'agenda (cache 7 jours)
- Consultation des profils (cache 24h)

## Support

Technique : support@centredeformation.com
Utilisateur : help@centredeformation.com
