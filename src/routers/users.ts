import express from "express";
import {getUserByEmail, getUserByID, updateUser, User} from '../controllers/user';
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

router.get('/', async (req, res: Response<User | ErrRes>) => {
    if (req.query.id === undefined || req.query.password_hashed === undefined) {
        res.status(400).json({ error: "Required query parameters not provided" });
        return;
    }

    let id: number = parseInt((Array.isArray(req.query.id) ? req.query.id[0] : req.query.id) as string);
    let password_hashed: string = (Array.isArray(req.query.password_hashed) ? req.query.password_hashed[0] : req.query.password_hashed) as string;

    try {
        let user = await getUserByID(id);
        if (user.password_hashed === password_hashed) {
            res.json(user);
            return;
        } else {
            res.json({ error: "Authentication failed" });
            return;
        }
    } catch (e) {
        res.status(400).json({ error: String(e) });
        return;
    }
});

router.patch('/', async (req, res: Response<void | ErrRes>) => {
    const isValidBody = (body: any): body is {
        id: number,
        password_hashed: string,
        name?: string,
        email?: string,
        new_password_hashed?: string,
        description?: string,
        icon?: string,
    } => typeof body === 'object' && body.id !== undefined && typeof body.id === 'number' &&
        body.password_hashed !== undefined && typeof body.password_hashed === 'string'

    let body = req.body;
    if (!isValidBody(body)) {
        res.status(400).json({ error: "Bad request" });
        return;
    }

    let user = await getUserByID(body.id);
    if (user.password_hashed !== body.password_hashed) {
        res.status(400).json({ error: "Authentication failed" });
        return;
    }

    try {
        await updateUser(body.id, {
            name: body.name,
            email: body.email,
            password_hashed: body.new_password_hashed,
            description: body.description,
            icon: body.icon? Buffer.from(body.icon, 'base64') : undefined,
        });
        res.status(200).send();
    } catch (e) {
        res.status(400).json({ error: String(e) });
    }
});

export default router;