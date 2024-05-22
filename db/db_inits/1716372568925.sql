BEGIN TRANSACTION;

CREATE TABLE ncss
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(255) NOT NULL,
    viewed_time INTEGER NOT NULL DEFAULT 0,
    author_id   INTEGER,
    html        TEXT NOT NULL,
    css         TEXT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE SET NULL
);

INSERT INTO ncss
SELECT *
FROM css;

DROP TABLE css;

ALTER TABLE ncss
    RENAME TO css;

COMMIT;