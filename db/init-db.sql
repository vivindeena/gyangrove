-- Add the 'uuid-ossp' extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    city_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_date ON events (event_date);

CREATE INDEX IF NOT EXISTS idx_events_event_time ON events (event_time);
