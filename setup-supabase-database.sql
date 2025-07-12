-- Complete setup script for PRTU Member Portal Database
-- Run this in your Supabase SQL Editor

-- 1. Create the members table
CREATE TABLE IF NOT EXISTS public.members (
    id BIGSERIAL PRIMARY KEY,
    receipt_number TEXT,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    district TEXT,
    mandal TEXT,
    teacher_name TEXT NOT NULL,
    institution TEXT,
    management TEXT,
    designation TEXT,
    treasury_id TEXT UNIQUE NOT NULL,
    phone TEXT,
    nominee_name_1 TEXT,
    nominee_relation_1 TEXT,
    nominee_name_2 TEXT,
    nominee_relation_2 TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create indexes for faster searches
CREATE INDEX IF NOT EXISTS idx_members_treasury_id ON public.members(treasury_id);
CREATE INDEX IF NOT EXISTS idx_members_phone ON public.members(phone);
CREATE INDEX IF NOT EXISTS idx_members_teacher_name ON public.members(teacher_name);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- 4. Create policy to allow public read access (for member portal)
CREATE POLICY "Allow public read access" ON public.members
    FOR SELECT
    USING (true);

-- 5. Create policy to allow authenticated users to insert/update (for admin)
CREATE POLICY "Allow authenticated users to modify" ON public.members
    FOR ALL
    USING (auth.role() = 'authenticated');

-- 6. Insert sample data for testing
INSERT INTO public.members (
    receipt_number, 
    district, 
    mandal, 
    teacher_name, 
    institution, 
    management, 
    designation, 
    treasury_id, 
    phone, 
    nominee_name_1, 
    nominee_relation_1,
    nominee_name_2,
    nominee_relation_2
) VALUES 
    ('REC001', 'Hyderabad', 'Secunderabad', 'John Doe', 'Government High School', 'Government', 'Secondary Teacher', 'TRY001234', '+91-9876543210', 'Jane Doe', 'Wife', 'John Jr', 'Son'),
    ('REC002', 'Warangal', 'Warangal Rural', 'Priya Sharma', 'Government Primary School', 'Government', 'Primary Teacher', 'TRY005678', '+91-9876543211', 'Raj Sharma', 'Husband', 'Ravi Sharma', 'Son'),
    ('REC003', 'Karimnagar', 'Karimnagar Urban', 'Rajesh Kumar', 'Government Secondary School', 'Government', 'Head Master', 'TRY009876', '+91-9876543212', 'Sunita Kumar', 'Wife', 'Arjun Kumar', 'Son'),
    ('REC004', 'Nizamabad', 'Nizamabad Rural', 'Lakshmi Reddy', 'Government Elementary School', 'Government', 'Assistant Teacher', 'TRY002468', '+91-9876543213', 'Venkat Reddy', 'Husband', 'Sita Reddy', 'Daughter')
ON CONFLICT (treasury_id) DO NOTHING;

-- 7. Create function to update timestamp on record changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Create trigger to automatically update timestamp
DROP TRIGGER IF EXISTS update_members_updated_at ON public.members;
CREATE TRIGGER update_members_updated_at
    BEFORE UPDATE ON public.members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 9. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.members TO anon;
GRANT ALL ON public.members TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE members_id_seq TO authenticated;

-- Verification query - run this to check if everything is set up correctly
SELECT 
    'Setup completed successfully!' as message,
    COUNT(*) as total_members,
    'Sample Treasury IDs: ' || STRING_AGG(treasury_id, ', ') as sample_ids
FROM public.members;
