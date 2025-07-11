-- PRTU Member Portal Database Schema for Supabase PostgreSQL
-- This file contains the SQL commands to create the members table in your Supabase database

-- Create the members table
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    treasury_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    district VARCHAR(255),
    school_name VARCHAR(500),
    phone VARCHAR(20),
    email VARCHAR(255),
    date_of_joining DATE,
    member_since DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on treasury_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_members_treasury_id ON members(treasury_id);

-- Create an index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);

-- Create an updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger
CREATE TRIGGER update_members_updated_at 
    BEFORE UPDATE ON members 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing (remove this in production)
INSERT INTO members (treasury_id, name, designation, district, school_name, phone, email, date_of_joining, member_since, status) VALUES
('TRY001234', 'John Doe', 'Primary Teacher', 'Hyderabad', 'Government Primary School, Jubilee Hills', '+91-9876543210', 'john.doe@email.com', '2020-01-15', '2020-01-15', 'active'),
('TRY005678', 'Jane Smith', 'Secondary Teacher', 'Warangal', 'Government High School, Warangal', '+91-9876543211', 'jane.smith@email.com', '2019-06-10', '2019-06-10', 'active'),
('TRY009876', 'Rajesh Kumar', 'Head Master', 'Nizamabad', 'Government Secondary School, Nizamabad', '+91-9876543212', 'rajesh.kumar@email.com', '2018-03-22', '2018-03-22', 'active'),
('TRY002468', 'Priya Reddy', 'Assistant Teacher', 'Karimnagar', 'Government Elementary School, Karimnagar', '+91-9876543213', 'priya.reddy@email.com', '2021-08-05', '2021-08-05', 'inactive');

-- Row Level Security (RLS) - Enable if needed
-- ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Create a policy for public read access (adjust as needed)
-- CREATE POLICY "Allow public read access" ON members FOR SELECT USING (true);

-- Note: You may want to create more specific policies based on your security requirements
