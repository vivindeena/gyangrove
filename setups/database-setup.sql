-- Add the 'uuid-ossp' extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    city_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    event_time TIME NOT NULL,
    latitude DECIMAL(10, 6) NOT NULL,
    longitude DECIMAL(10, 6) NOT NULL
);
