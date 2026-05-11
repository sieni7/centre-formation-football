# Schéma de la base de données

## Diagramme ER

```mermaid
erDiagram
    academies ||--o{ users_academies : contains
    academies ||--o{ players : contains
    academies ||--o{ matches : contains
    academies ||--o{ media_assets : contains
    
    profiles ||--o{ users_academies : belongs_to
    profiles ||--o{ players : coaches
    profiles ||--o{ parent_joueur : parent
    
    players ||--o{ convocations : receives
    players ||--o{ player_stats : has
    
    matches ||--o{ convocations : triggers
    
    notifications ||--o{ notification_recipients : targets
```

## Liste des tables

| Table | Description | RLS |
|-------|-------------|-----|
| `academies` | Entités multi-tenant | ✅ |
| `profiles` | Utilisateurs (lié à auth.users) | ✅ |
| `users_academies` | Junction multi-tenant | ✅ |
| `players` | Joueurs de l'académie | ✅ |
| `matches` | Matchs/entraînements | ✅ |
| `convocations` | Convocations joueurs | ✅ |
| `player_stats` | Statistiques individuelles | ✅ |
| `parent_joueur` | Relations parent-enfant | ✅ |
| `notifications` | Notifications système | ✅ |
| `notification_recipients` | Destinataires notifications | ✅ |
| `media_assets` | Fichiers uploadés | ✅ |
| `audit_logs` | Traçabilité actions | ✅ |
