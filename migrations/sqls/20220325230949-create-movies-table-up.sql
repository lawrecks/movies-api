CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    title VARCHAR,
    release_date DATE,
    genre VARCHAR,
    director VARCHAR,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW() 
);