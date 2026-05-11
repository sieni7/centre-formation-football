# Design System: Football Academy OS

This design system is optimized for a professional "Football Academy" environment, emphasizing performance, clarity, and elite sport aesthetics.

## 1. Palette de Couleurs (Sport Elite)

| Rôle | Couleur | Valeur Hex | Tailwind |
|------|---------|------------|----------|
| **Primary** | Turf Green | `#1B5E20` | `bg-green-900` |
| **Secondary** | Pitch White | `#F8F9FA` | `bg-slate-50` |
| **Accent** | Trophy Gold | `#FFD700` | `bg-yellow-400` |
| **Danger** | Red Card | `#C62828` | `bg-red-800` |
| **Neutral** | Stadium Gray | `#455A64` | `text-slate-600` |
| **Surface** | Glass White | `rgba(255,255,255,0.8)` | `backdrop-blur` |

## 2. Typographie

- **Headings (Display)**: `Outfit` (Bold/ExtraBold) - For academy name, hero titles.
- **Body**: `Inter` (Regular/Medium) - For data, stats, and long text.
- **Data (Mono)**: `JetBrains Mono` (Optional) - For specific technical IDs.

## 3. Composants Clés

### A. Match Cards
- Borders rounded (1.5rem)
- Subtle shadow (0 4px 20px rgba(0,0,0,0.05))
- Left color strip indicating status (Green=Win, Gray=Upcoming, Red=Loss)

### B. Player Profiles
- Circular avatars with status rings.
- Large jersey number in the background (low opacity).

### C. Hero Section
- High-contrast background (dark green or football pitch image).
- Gold accents for primary CTAs.

## 4. Spacing & Grid
- Base unit: 4px.
- Container: Max-width 1280px (xl).
- Gaps: 24px (standard), 32px (sections).
