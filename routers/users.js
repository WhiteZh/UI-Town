const express = require('express');
const router = express.Router();

const userController = require('../db/controllers/user');
router.get('/login', async (req, res) => {
    if (!req.query.password_hashed) {
        res.status(400).json({ error: "No hashed password is provided"});
        return;
    }
    if (!req.query.email) {
        res.status(400).json({ error: "No user identification is provided"});
        return;
    }

    try {
        res.json(await userController.getUserByEmail(req.query.email));
    } catch (e) {
        res.status(400).json({error: e.message});
    }
});

module.exports = router;