-- ==========================================
-- SPRINT 3: CŒUR MÉTIER & REALTIME
-- ==========================================

-- 1. Players Table
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    jersey_number INTEGER,
    position TEXT, -- GK, DEF, MID, FWD
    birth_date DATE,
    public_profile BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

-- 2. Matches Table
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
    opponent TEXT NOT NULL,
    match_date TIMESTAMPTZ NOT NULL,
    location TEXT,
    is_home BOOLEAN DEFAULT true,
    score_team INTEGER,
    score_opponent INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

-- 3. Convocations Table
CREATE TABLE convocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'PENDING', -- PENDING, ACCEPTED, DECLINED
    response_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- 4. Player Stats Table
CREATE TABLE player_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    minutes_played INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Parent-Player Relation
CREATE TABLE parent_joueur (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(parent_id, player_id)
);

-- 6. Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES profiles(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL, -- CONVOCATION, INFO, ALERT
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notification_recipients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notification_id UUID REFERENCES notifications(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ,
    UNIQUE(notification_id, user_id)
);

-- 7. Indexes
CREATE INDEX idx_players_academy_id ON players(academy_id);
CREATE INDEX idx_matches_academy_id ON matches(academy_id);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_convocations_match ON convocations(match_id);
CREATE INDEX idx_convocations_player ON convocations(player_id);
CREATE INDEX idx_parent_joueur_parent ON parent_joueur(parent_id);
CREATE INDEX idx_parent_joueur_player ON parent_joueur(player_id);
CREATE INDEX idx_notifications_academy ON notifications(academy_id);
CREATE INDEX idx_notification_recipients_user ON notification_recipients(user_id);

-- 8. Enable RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE convocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_joueur ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_recipients ENABLE ROW LEVEL SECURITY;

-- 9. RLS Policies

-- Players: Tenant isolation
CREATE POLICY "tenant_isolation_players" ON players
    FOR ALL USING (academy_id IN (SELECT academy_id FROM users_academies WHERE user_id = auth.uid()));

-- Matches: Tenant isolation
CREATE POLICY "tenant_isolation_matches" ON matches
    FOR ALL USING (academy_id IN (SELECT academy_id FROM users_academies WHERE user_id = auth.uid()));

-- Convocations: Players see own, Coach sees all in academy
CREATE POLICY "players_see_own_convocations" ON convocations
    FOR SELECT USING (
        player_id IN (SELECT id FROM players WHERE profile_id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM users_academies ua
            WHERE ua.user_id = auth.uid()
            AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('ACADEMY_ADMIN', 'COACH')
        )
    );

-- Parent_Joueur: Parent sees own children
CREATE POLICY "parent_see_own_children" ON parent_joueur
    FOR SELECT USING (parent_id = auth.uid());

-- Notifications: Users see their received notifications
CREATE POLICY "users_see_own_notifications" ON notification_recipients
    FOR SELECT USING (user_id = auth.uid());
