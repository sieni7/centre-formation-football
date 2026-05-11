# Sprint 3: Dashboard Specifications

## 1. Coach Dashboard (`/dashboard/coach`)
```
+------------------------------------------+
| Header (Academy Logo + User Profile)     |
+------------------------------------------+
| Stats Summary (Players, Matches, Goals)  |
+------------------------------------------+
| [ Players List ] [ Upcoming Matches ]    |
| - John Doe (FWD) | - vs Elite FC (15/05) |
| - Jane Doe (DEF) | - Training (17/05)    |
+------------------------------------------+
| Actions: [Add Player] [Create Match]     |
+------------------------------------------+
```

## 2. Player Dashboard (`/dashboard/player`)
```
+------------------------------------------+
| Next Match: vs Elite FC (In 2 days)      |
| Action: [Accept] [Decline]               |
+------------------------------------------+
| Stats Overview:                          |
| [ 5 Goals ] [ 3 Assists ] [ 85% Pres. ]  |
+------------------------------------------+
| Schedule Calendar (7 days view)          |
+------------------------------------------+
```

## 3. Parent Dashboard (`/dashboard/parent`)
```
+------------------------------------------+
| Child: John Doe                          |
+------------------------------------------+
| Next Match Notification (John)           |
| Action: [Confirm Presence]               |
+------------------------------------------+
| Performance Report (Last 5 matches)      |
+------------------------------------------+
```

## 4. UI/UX Standards
- **Optimistic Updates**: Immediate UI feedback on convocation response.
- **Offline Support**: Dashboard data cached for 24h.
- **Responsive**: Mobile-first grid layouts.
