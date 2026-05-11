-- ==========================================
-- SPRINT 1: SOCLE SAAS & MULTI-TENANCY
-- ==========================================

-- 1. Enums
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ACADEMY_ADMIN', 'COACH', 'PLAYER', 'PARTNER');

-- 2. Academies Table
CREATE TABLE academies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    settings JSONB DEFAULT '{}'::jsonb,
    deleted_at TIMESTAMPTZ
);

-- 3. Profiles Table (linked to auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'PLAYER' NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 4. Users_Academies Junction Table
CREATE TABLE users_academies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    UNIQUE(user_id, academy_id)
);

-- 5. Indexes for Performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_users_academies_user_id ON users_academies(user_id);
CREATE INDEX idx_users_academies_academy_id ON users_academies(academy_id);
CREATE INDEX idx_academies_slug ON academies(slug);

-- 6. Enable RLS
ALTER TABLE academies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_academies ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies

-- ACADEMIES
CREATE POLICY "Users can see their own academies" ON academies
    FOR SELECT USING (
        id IN (SELECT academy_id FROM users_academies WHERE user_id = auth.uid() AND deleted_at IS NULL)
        AND deleted_at IS NULL
    );

CREATE POLICY "Admins can update their academy" ON academies
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users_academies ua
            WHERE ua.user_id = auth.uid()
            AND ua.academy_id = id
            AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'ACADEMY_ADMIN'
        )
    );

-- PROFILES
CREATE POLICY "Users can see their own profile" ON profiles
    FOR SELECT USING (id = auth.uid() AND deleted_at IS NULL);

CREATE POLICY "Admins can see academy profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users_academies ua_admin
            WHERE ua_admin.user_id = auth.uid()
            AND ua_admin.academy_id IN (
                SELECT ua_user.academy_id 
                FROM users_academies ua_user 
                WHERE ua_user.user_id = profiles.id
                AND ua_user.deleted_at IS NULL
            )
            AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'ACADEMY_ADMIN'
        )
        AND deleted_at IS NULL
    );

CREATE POLICY "Admins can update academy profiles" ON profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users_academies ua_admin
            WHERE ua_admin.user_id = auth.uid()
            AND ua_admin.academy_id IN (
                SELECT ua_user.academy_id 
                FROM users_academies ua_user 
                WHERE ua_user.user_id = profiles.id
                AND ua_user.deleted_at IS NULL
            )
            AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'ACADEMY_ADMIN'
        )
    );

-- USERS_ACADEMIES
CREATE POLICY "Users can see their memberships" ON users_academies
    FOR SELECT USING (user_id = auth.uid() AND deleted_at IS NULL);

CREATE POLICY "Admins can manage memberships" ON users_academies
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users_academies ua
            WHERE ua.user_id = auth.uid()
            AND ua.academy_id = users_academies.academy_id
            AND (SELECT role FROM profiles WHERE id = auth.uid()) = 'ACADEMY_ADMIN'
        )
    );

-- 8. Future-proofing (Example for next sprints)
-- These are placeholders for when the tables are created.
-- ALTER TABLE players ADD COLUMN academy_id UUID REFERENCES academies(id);
-- CREATE POLICY "Tenant isolation for players" ON players FOR ALL USING (academy_id IN (SELECT academy_id FROM users_academies WHERE user_id = auth.uid()));
