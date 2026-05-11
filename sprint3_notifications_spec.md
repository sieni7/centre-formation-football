# Sprint 3: Notifications Specification

## 1. Trigger Events
| Event | Recipient | Type | Content |
|-------|-----------|------|---------|
| New Match Created | All Players | CONVOCATION | "Nouveau match vs [Opponent] le [Date]" |
| Training Schedule | All Players | INFO | "Entraînement demain à [Heure]" |
| Player Response | Coach | ALERT | "[Player] a [Status] la convocation" |

## 2. Notification UI
- **Header Bell**: Shows unread count badge.
- **Dropdown List**: Displays last 5 notifications.
- **Push (Future)**: Support for Web Push API (Service Workers).

## 3. Rate Limiting
- **Logic**: Max 10 notifications per hour per user.
- **Storage**: Track count in local state or dedicated counter table if needed.

## 4. Realtime Implementation
- Use Supabase `.on('INSERT')` on `notification_recipients` table for the current user.
