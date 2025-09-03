-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Service Providers Table
CREATE TABLE IF NOT EXISTS service_providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    photos TEXT DEFAULT '[]',
    videos TEXT DEFAULT '[]',
    location VARCHAR(255),
    age INTEGER,
    tags TEXT DEFAULT '[]',
    availability BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_providers_availability ON service_providers(availability);
CREATE INDEX IF NOT EXISTS idx_service_providers_created_at ON service_providers(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, role) 
VALUES ('admin@linkup.local', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2w3kT4/OOC', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Optional: Insert sample service providers
INSERT INTO service_providers (name, description, photos, videos, location, age, tags, availability) 
VALUES 
(
    'Emma Thompson',
    'Professional companion with 5+ years of experience. Specializing in dinner dates and social events. Elegant, well-educated, and fluent in multiple languages.',
    '["https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=600&fit=crop", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"]',
    '[]',
    'Manhattan, NY',
    26,
    '["Dinner Dates", "Social Events", "Travel Companion"]',
    true
),
(
    'Sophia Chen',
    'Sophisticated and charming companion available for upscale events and private engagements. Harvard graduate with a passion for art and culture.',
    '["https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"]',
    '[]',
    'Beverly Hills, CA',
    24,
    '["Business Events", "Art Gallery Tours", "Private Dinners"]',
    true
),
(
    'Isabella Rodriguez',
    'Bilingual companion specializing in luxury experiences. Former model with extensive travel experience and knowledge of fine dining.',
    '["https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop", "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=400&h=600&fit=crop"]',
    '[]',
    'Miami, FL',
    28,
    '["Luxury Travel", "Fine Dining", "Fashion Events"]',
    true
)
ON CONFLICT DO NOTHING;