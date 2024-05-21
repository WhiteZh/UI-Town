CREATE TABLE css
(
    id          INTEGER PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    viewed_time INTEGER DEFAULT 0,
    author_id   INTEGER,
    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE SET NULL
)