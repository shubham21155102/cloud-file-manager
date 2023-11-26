CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);
CREATE DATABASE propacityusers;
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
CREATE TABLE folders(
   identifier VARCHAR(255) PRIMARY KEY,
   name VARCHAR(255),
   parent VARCHAR(255),
   type VARCHAR(255) DEFAULT 'folder',
   layer INTEGER DEFAULT 0,
   owner VARCHAR(255),
   FOREIGN KEY (owner) REFERENCES users(username),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE files(
   identifier VARCHAR(255) PRIMARY KEY,
   name VARCHAR(255),
   parent VARCHAR(255),
   content VARCHAR(255),
   type VARCHAR(255) DEFAULT 'file',
   layer INTEGER DEFAULT 0,
    owner VARCHAR(255),
    FOREIGN KEY (owner) REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);