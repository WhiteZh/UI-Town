import express from "express";
import {getUserByEmail} from '../controllers/user';
import {ErrRes, newErrRes} from "./util";
import {Response} from "express";

const router = express.Router();

router.get('/login', async (req, res: Response<number | ErrRes>) => {
    if (req.query.password_hashed === undefined) {
        res.status(400).json({ error: "No hashed password is provided"});
        return;
    }
    if (req.query.email === undefined) {
        res.status(400).json({ error: "No user identification is provided"});
        return;
    }
    if (Array.isArray(req.query.email) || Array.isArray(req.query.password_hashed)) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    try {
        let user = await getUserByEmail(req.query.email.toString());
        res.json(user ? user.id : -1);
    } catch (e) {
        res.status(400).json({error: newErrRes(e)});
    }
});

export default router;