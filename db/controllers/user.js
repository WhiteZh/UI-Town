const db = require('../db');

/**
 * @param {string} name
 * @param {string} email
 * @param {string} password_hashed
 * @returns {Promise<number>}
 */
function createUser(name, email, password_hashed) {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        throw Error('Wrong email format');
    }
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (name, email, password_hashed) VALUES (?, ?, ?)`,
            [name, email, password_hashed],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}

/**
 * @param {number} id
 * @returns {Promise<Object>}
 */
function getUserByID(id) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, object) => {
            if (err) {
                reject(err);
            } else {
                resolve(object);
            }
        });
    })
}

/**
 * @param {string} email
 * @returns {Promise<Object>}
 */
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, object) => {
            if (err) {
                reject(err);
            } else {
                resolve(object);
            }
        });
    });
}

/**
 * @param {number} id
 * @param {Object} properties
 * @returns {Promise<boolean>}
 */
function updateUser(id, properties) {
    let emplace = Array(Object.keys(properties).length).fill('? = ?').join(',');
    return new Promise((resolve, reject) => {
        db.run(`UPDATE users SET ${emplace} WHERE id = ?`, [...Object.entries(properties).flat(), id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    })
}

module.exports = {
    createUser,
    getUserByID,
    getUserByEmail,
    updateUser,
};