CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL,
);

CREATE INDEX idx_users_email ON users(email);
