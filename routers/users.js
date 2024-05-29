const express = require('express');
const router = express.Router();

const userController = require('../db/controllers/user');
router.get('/isvalid', (req, res) => {
    if (!req.query.password_hashed) {
        res.status(400).json({ error: "No hashed password is provided"});
        return;
    }

    let callback = (err, user) => {
       if (err) {
           res.status(400).json({ error: err.message });
           return;
       }

       res.json(user.password_hashed === req.query.password_hashed);
   };

   if (req.query.id) {
       userController.getUserByID(req.query.id, callback);
   } else if (req.query.email) {
       userController.getUserByEmail(req.query.email, callback);
   } else {
       res.status(400).json({ error: "No user identification is provided" });
   }
});

module.exports = router;