const db = require('../db');

/**
 * @param {number[]} ids
 * @param {function(Error | null, Object[]): void} callback
 */
function getCSSs(ids, callback) {
    db.all(`SELECT * FROM css WHERE id IN (${ids.map(() => '?').join(',')})`, ids, callback);
}

module.exports = {
    getCSSs,
}