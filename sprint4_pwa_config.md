# Sprint 4: PWA Configuration Details

## 1. Web App Manifest (`/public/manifest.json`)
The manifest ensures the app is installable and has the correct branding on the home screen.

```json
{
  "name": "Centre de Formation Football",
  "short_name": "CDF Football",
  "description": "Système de gestion professionnel pour écoles de football",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#22c55e",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 2. Service Worker Strategy
Using a Service Worker to enable offline functionality for critical data.

- **Stale-While-Revalidate**:
  - `GET /api/schedule`: Ensures the player always sees a schedule, even if offline, while updating it in the background.
- **Cache-First**:
  - `Static Assets` (JS, CSS, Images): Fast loading from cache.
- **Network-Only (with Fallback)**:
  - `POST /api/convocations`: Must be online to respond, with an "Offline" message if the network is unavailable.

## 3. Offline Fallback
A dedicated `/offline` route or a simple static `offline.html` will be displayed when the user is disconnected and the requested page is not in the cache.
