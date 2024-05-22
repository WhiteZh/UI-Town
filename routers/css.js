const express = require('express');
const router = express.Router();

const cssController = require('../db/controllers/css');

/**
 * @param {string | string[] | undefined} req.query.id
 */
router.get('/', (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).json({ error: "provide at least 1 id" });
        return;
    }
    const ids = Array.isArray(req.query.id) ? req.query.id.map(parseInt) : [parseInt(req.query.id)];
    for (let each of ids) {
        if (isNaN(each)) {
            res.status(400).json({ error: "ids should be numbers" });
            return;
        }
    }

    cssController.getCSSs(ids, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;