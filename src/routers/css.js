const express = require('express');
const router = express.Router();

const cssController = require('../controllers/css');

/**
 * @param {string | string[] | undefined} req.query.id
 */
router.get('/', async (req, res) => {
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

    try {
        res.json(await cssController.getCSSs(ids));
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});


router.post('/', async (req, res) => {
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

    try {
        res.json(await cssController.createCSS(body.userID, body.password_hashed, body.name, body.html, body.css, body.category));
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

router.delete('/', async (req, res) => {
    /**
     * @type {number}
     */
    let id = req.query.id;
    /**
     * @type {string}
     */
    let password_hashed = req.query.password_hashed;

    try {
        await cssController.deleteCSS(id, password_hashed);
        res.json({
            ok: true,
            id: id,
        });
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

router.get('/valid', async (req, res) => {
    let options = {
        category: req.query.category,
        limit: parseInt(req.query.limit),
        offset: parseInt(req.query.offset),
        order: req.query.order ? (Array.isArray(req.query.order) ? req.query.order : [req.query.order]) : null,
    };

    try {
        res.json(await cssController.getValidIDs(options));
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

module.exports = router;