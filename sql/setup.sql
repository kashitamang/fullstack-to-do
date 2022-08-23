-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE tasks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT ,
  task VARCHAR NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT(false),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users(email, password_hash) VALUES 
('test1@test.com', 'nottest1passwordhash'),
('test2@test.com', 'nottest2passwordhash'),
('test3@test.com', 'nottest3passwordhash');

INSERT INTO tasks(task, completed, user_id) VALUES 
('think about mistakes', TRUE, '1'),
('art project', FALSE, '2'),
('get life together', TRUE, '3');