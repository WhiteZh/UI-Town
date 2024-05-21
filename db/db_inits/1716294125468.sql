CREATE TABLE nusers
(
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hashed CHAR(256)    NOT NULL
);

INSERT INTO nusers
SELECT *
FROM users;

DROP TABLE users;

ALTER TABLE nusers
    RENAME TO users;