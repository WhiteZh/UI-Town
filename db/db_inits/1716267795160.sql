BEGIN TRANSACTION;

PRAGMA foreign_keys = OFF;

CREATE TABLE nusers
(
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    password_hashed CHAR(256)    NOT NULL
);

INSERT INTO nusers
SELECT *
FROM users;

DROP TABLE users;

ALTER TABLE nusers
    RENAME TO users;

PRAGMA foreign_keys = ON;

COMMIT;