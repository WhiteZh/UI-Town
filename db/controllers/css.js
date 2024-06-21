const db = require('../db');

const userController = require('./user');

/**
 * @param {number[]} ids
 * @returns {Promise<Object[]>}
 */
function getCSSs(ids) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM css WHERE id IN (${ids.map(() => '?').join(',')})`, ids, (err, objects) => {
            if (err) {
                reject(err);
            } else {
                resolve(objects);
            }
        });
    });
}

/**
 * @param {Object} options
 * @param {string | undefined} options.category
 * @param {number | undefined} options.limit
 * @param {number | undefined} options.offset
 * @param {string[]} options.order
 * @returns {Promise<number[]>}
 */
function getValidIDs(options) {
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
                throw Error('Illegal column name contained inside options.order');
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
    return new Promise((resolve, reject) => {
        db.all(`SELECT id FROM css ${where} ${order} ${limit}`, params, (err, objects) => {
            if (err) {
                reject(err);
            } else {
                resolve(objects.map(e => e.id));
            }
        });
    });
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
 * @returns {Promise<number>}
 */
async function createCSS(userID, password_hashed, name, html, css, category) {
    let user = await userController.getUserByID(userID);
    if (!user) {
        throw Error("User does not exist");
    }
    if (user.password_hashed !== password_hashed) {
        throw Error("Incorrect password");
    }
    if (!name) {
        throw Error("Must provide a name");
    }
    if (categories.indexOf(category) === -1) {
        throw Error("Category does not exist");
    }
    if (!html) {
        throw Error("HTML content must not be blank");
    }

    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO css (name, author_id, html, css, category) VALUES (?, ?, ?, ?, ?)`, [name, userID, html, css, category],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}

module.exports = {
    getCSSs,
    getValidIDs,
    createCSS,
}