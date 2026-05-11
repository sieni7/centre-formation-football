-- T2.4: Audit Logging & Triggers

-- 1. Table audit_logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    academy_id UUID REFERENCES academies(id),
    user_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL, -- CREATE, UPDATE, DELETE
    entity_type TEXT NOT NULL, -- profile, academy, media, etc.
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    user_agent TEXT
);

CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- 2. Audit Function
CREATE OR REPLACE FUNCTION audit_action()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (
        academy_id,
        user_id,
        action,
        entity_type,
        entity_id,
        old_data,
        new_data
    )
    VALUES (
        COALESCE(NEW.academy_id, OLD.academy_id),
        auth.uid(),
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP IN ('CREATE', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
    );
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Triggers for Profiles
CREATE TRIGGER audit_profiles_trigger
AFTER INSERT OR UPDATE OR DELETE ON profiles
FOR EACH ROW EXECUTE FUNCTION audit_action();

-- 4. Triggers for Academies
CREATE TRIGGER audit_academies_trigger
AFTER INSERT OR UPDATE OR DELETE ON academies
FOR EACH ROW EXECUTE FUNCTION audit_action();

-- 5. Automatic Cleanup (every 6 months)
-- This can be handled by a Supabase Edge Function or cron if enabled
-- DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL '6 months';
