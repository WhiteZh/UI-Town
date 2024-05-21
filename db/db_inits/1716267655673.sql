CREATE TABLE users
(
    id              INTEGER PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    password_hashed CHAR(256)    NOT NULL
)