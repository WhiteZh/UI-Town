const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password_hashed CHAR(256) NOT NULL
    )`, err => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Serialized users table.');
        }
    });
    db.run(`CREATE TABLE IF NOT EXISTS css (
        id INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        viewed_time INTEGER DEFAULT 0,
        author_id INTEGER,
        FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE SET NULL
    )`, err => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Serialized css table.');
        }
    });
})

module.exports = {};