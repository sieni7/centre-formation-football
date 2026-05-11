-- T2.1: Media Assets Schema & Storage Policies

-- 1. Table media_assets
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    academy_id UUID REFERENCES academies(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES profiles(id),
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL, -- bytes
    storage_path TEXT UNIQUE NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    deleted_at TIMESTAMPTZ
);

-- 2. Indexes
CREATE INDEX idx_media_academy_id ON media_assets(academy_id);
CREATE INDEX idx_media_mime_type ON media_assets(mime_type);

-- 3. Enable RLS
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for media_assets
CREATE POLICY "Public can see media assets" ON media_assets
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Admins can manage media assets" ON media_assets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users_academies ua
            WHERE ua.user_id = auth.uid()
            AND ua.academy_id = media_assets.academy_id
            AND (SELECT role FROM profiles WHERE id = auth.uid()) IN ('ACADEMY_ADMIN', 'COACH')
        )
    );

-- 5. Storage Policies (Note: These must be applied to the 'storage' schema)
-- Assuming bucket 'media' exists

-- Allow public read access to media bucket
CREATE POLICY "Media are publicly readable" ON storage.objects
    FOR SELECT USING (bucket_id = 'media');

-- Allow admins/coaches to upload to media bucket
CREATE POLICY "Admins can upload media" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'media' AND
        (SELECT (role IN ('ACADEMY_ADMIN', 'COACH')) FROM profiles WHERE id = auth.uid())
    );
