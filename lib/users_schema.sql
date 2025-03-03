DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  image TEXT
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_id ON users(id);