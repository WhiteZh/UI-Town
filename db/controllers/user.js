const db = require('../db');

/**
 * @param {string} name
 * @param {string} email
 * @param {string} password_hashed
 * @param {function(Error | null, number): void} callback
 * @returns {void}
 */
function createUser(name, email, password_hashed, callback) {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        callback(Error('Wrong email format'), -1);
        return;
    }
    db.run(`INSERT INTO users (name, email, password_hashed) VALUES (?, ?, ?)`,
        [name, email, password_hashed],
        function(err) {
            callback(err, this.lastID);
        });
}

/**
 * @param {number} id
 * @param {function(Error | null, Object): void} callback
 * @returns {void}
 */
function getUserByID(id, callback) {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], callback);
}

/**
 * @param {string} email
 * @param {function(Error | null, Object): void} callback
 * @returns {void}
 */
function getUserByEmail(email, callback) {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
}

/**
 * @param {number} id
 * @param {Object} properties
 * @param {function(Error | null): void} callback
 * @returns {void}
 */
function updateUser(id, properties, callback) {
    let emplace = Array(Object.keys(properties).length).fill('? = ?').join(',');
    db.run(`UPDATE users SET ${emplace} WHERE id = ?`, [...Object.entries(properties).flat(), id], callback);
}

module.exports = {
    createUser,
    getUserByID,
    getUserByEmail,
    updateUser,
};