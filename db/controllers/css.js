const db = require('../db');

const userController = require('./user');

/**
 * @param {number[]} ids
 * @param {function(Error | null, Object[]): void} callback
 * @returns {void}
 */
function getCSSs(ids, callback) {
    db.all(`SELECT * FROM css WHERE id IN (${ids.map(() => '?').join(',')})`, ids, callback);
}

/**
 * @param {Object} options
 * @param {string | undefined} options.category
 * @param {number | undefined} options.limit
 * @param {number | undefined} options.offset
 * @param {string[]} options.order
 * @param {function(Error | null, Object[]): void} callback
 * @returns {void}
 */
function getValidIDs(options, callback) {
    let where = '';
    let order = '';
    let limit = '';
    let params = [];
    if (options.category) {
        where = `WHERE category=? `;
        params.push(options.category);
    }
    if (options.order) {
        for (let each of options.order) {
            if (!each.match(/^[a-zA-Z_]+$/)) {
                callback(Error('Illegal column name contained inside options.order'), []);
                return;
            }
        }
        order = `ORDER BY ${options.order.join(',')} `;
    }
    if (options.limit) {
        limit = `LIMIT ? `;
        params.push(options.limit);
        if (options.offset) {
            limit += `OFFSET ? `;
            params.push(options.offset);
        }
    }
    db.all(`SELECT id FROM css ${where} ${order} ${limit}`, params, callback);
}

const categories = [
    'button',
    'checkbox',
    'toggle switch',
    'card',
    'loader',
    'input',
    'transition',
    'special effect'
];
/**
 * @param {number} userID
 * @param {string} password_hashed
 * @param {string} name
 * @param {string} html
 * @param {string} css
 * @param {string} category
 * @param {function(Error | null, number): void} callback
 * @returns {void}
 */
function createCSS(userID, password_hashed, name, html, css, category, callback) {
    userController.getUserByID(userID, (err, user) => {
        if (err) {
            callback(err, -1);
            return;
        }
        if (!user) {
            callback(Error("User does not exist"), -1);
            return;
        }

        if (user.password_hashed !== password_hashed) {
            callback(Error('Incorrect password'), -1);
            return;
        }

        if (categories.indexOf(category) === -1) {
            callback(Error('Category does not exist'), -1);
            return;
        }

        db.run(`INSERT INTO css (name, author_id, html, css, category) VALUES (?, ?, ?, ?, ?)`, [name, userID, html, css, category],
            function(err) {
            callback(err, this.lastID);
        });
    });
}

module.exports = {
    getCSSs,
    getValidIDs,
    createCSS,
}