# Sprint 2: Public Pages Specification

## 1. Home Page (`/`)
- **Hero Section**: High-quality background image (via Media Assets) with Academy Name and Motto.
- **Values Section**: Three cards (Excellence, Discipline, Passion).
- **Latest News**: Horizontal scroll of the last 3 media assets/posts.

## 2. Squad Page (`/squad`)
- **Grid Layout**: Responsive grid of `PlayerCard`.
- **Filters**: Simple filter by position (Gk, Def, Mid, Fwd).
- **Card Content**:
  - Image (Avatar)
  - Full Name
  - Position
  - Age (derived from birthdate)

## 3. Schedule Page (`/schedule`)
- **List View**: Vertical timeline of upcoming matches and training.
- **MatchCard Content**:
  - Date & Time
  - Opponent
  - Location (Home/Away)
  - Type (Friendly, Tournament, Training)

## 4. UI/UX Standards
- **Skeletons**: Use pulsing gray shapes for loading states.
- **Empty States**: "Aucun joueur trouvé" or "Aucun événement prévu" with Lucide icons.
- **Design System**: Primary Color: Football Green (#22c55e), Secondary: Navy Blue (#1e3a8a).
