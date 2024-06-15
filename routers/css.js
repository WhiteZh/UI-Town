const express = require('express');
const router = express.Router();

const cssController = require('../db/controllers/css');

/**
 * @param {string | string[] | undefined} req.query.id
 */
router.get('/', (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).json({error: "provide at least 1 id"});
        return;
    }
    const ids = Array.isArray(req.query.id) ? req.query.id.map(x => parseInt(x)) : [parseInt(req.query.id)];
    for (let each of ids) {
        if (isNaN(each)) {
            res.status(400).json({error: "ids should be numbers"});
            return;
        }
    }

    cssController.getCSSs(ids, (err, rows) => {
        if (err) {
            res.status(400).json({error: err.message});
        } else {
            res.json(rows);
        }
    });
});


router.post('/', (req, res) => {
    /**
     * @type {Object}
     * @property {number} userID
     * @property {string} password_hashed
     * @property {string} name
     * @property {string} html
     * @property {string} css
     * @property {string} category
     */
    const body = req.body;
    /*if (typeof (body) !== 'object' || typeof (body.userID) !== 'number' || typeof (body.password_hashed) !== 'string' || typeof (body.name) !== 'string' || typeof (body.html) !== 'string' || typeof (body.css) !== 'string' || typeof (body.category) !== 'string') {
        res.status(400).json({error: 'Bad request'});
        return;
    }*/

    cssController.createCSS(body.userID, body.password_hashed, body.name, body.html, body.css, body.category, (err, id) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json(id);
    });
});

router.get('/valid', (req, res) => {
    let options = {
        category: req.query.category,
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset),
        order: req.query.order ? (Array.isArray(req.query.order) ? req.query.order : [req.query.order]) : null,
    };

    cssController.getValidIDs(options, (err, ids) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.json(ids.map(o => o.id));
    });
})

module.exports = router;