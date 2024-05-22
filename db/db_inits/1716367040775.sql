BEGIN TRANSACTION;

CREATE TABLE ncss
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(255) NOT NULL,
    viewed_time INTEGER DEFAULT 0,
    html TEXT,
    css TEXT,
    author_id   INTEGER,
    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE SET NULL
);

INSERT INTO ncss
SELECT *
FROM css;

DROP TABLE css;

ALTER TABLE ncss
    RENAME TO css;

COMMIT;