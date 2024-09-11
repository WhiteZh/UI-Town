import express from 'express';
import {Response} from "express";
import {getCSSs, createCSS, deleteCSS, getValidIDs, CSSCategory, cssCategories} from '../controllers/css';
import {CSS} from "../controllers/css";
import {ErrRes} from "../util";

const router = express.Router();


router.get('/', async (req, res: Response<CSS[] | ErrRes>) => {
    try {
        if (req.query.id === undefined) {
            res.status(400).json(ErrRes("provide at least 1 id"));
            return;
        }
        const ids = Array.isArray(req.query.id) ? req.query.id.map(x => parseInt(x.toString())) : [parseInt(req.query.id.toString())];
        if (ids.includes(NaN)) {
            res.status(400).json(ErrRes("ids should be numbers"));
            return;
        }

        res.json(await getCSSs(ids));
    } catch (e) {
        res.status(400).json(ErrRes(e));
    }
});


router.post('/', async (req, res: Response<number | ErrRes>) => {
    if (typeof req.body !== 'object' ||
        typeof req.body.userID !== 'number' ||
        typeof req.body.password_hashed !== 'string' ||
        typeof req.body.name !== 'string' ||
        typeof req.body.html !== 'string' ||
        typeof req.body.css !== 'string' ||
        typeof req.body.category !== 'string' ||
        !cssCategories.includes(req.body.category)
    ) {
        res.status(400).json(ErrRes('Bad request'));
        return;
    }

    let body = req.body as {
        userID: number,
        password_hashed: string,
        name: string,
        html: string,
        css: string,
        category: CSSCategory,
    };

    try {
        let css = await createCSS(body.userID, body.password_hashed, body.name, body.html, body.css, body.category);
        if (css instanceof Error) {
            res.status(400).json(ErrRes(css.message));
            return;
        } else {
            res.json(css);
        }
    } catch (e) {
        res.status(400).json(ErrRes(e));
        return;
    }
});

router.delete('/', async (req, res: Response<void | ErrRes>) => {
    let id = req.query.id;
    let password_hashed = req.query.password_hashed;

    if (id === undefined || password_hashed === undefined || Array.isArray(id) || Array.isArray(password_hashed) || isNaN(parseInt(id.toString()))) {
        res.status(400).json(ErrRes("Bad request"));
        return;
    }

    let ID = parseInt(id.toString());

    try {
        await deleteCSS(ID, password_hashed.toString());
        res.send();
    } catch (e) {
        res.status(400).json(ErrRes(e));
    }
});

router.get('/valid', async (req, res: Response<number[] | ErrRes>) => {
    if ((req.query.category !== undefined && Array.isArray(req.query.category)) ||
        (req.query.limit !== undefined && Array.isArray(req.query.limit)) ||
        (req.query.offset !== undefined && Array.isArray(req.query.offset)) ||
        (req.query.author_id !== undefined && Array.isArray(req.query.author_id))
    ) {
        res.status(400).json(ErrRes("Bad request"));
        return;
    }

    let limit = req.query.limit?.toString();
    let offset = req.query.offset?.toString();
    let author_id = req.query.author_id?.toString();

    let options = {
        category: req.query.category?.toString(),
        author_id: author_id ? parseInt(author_id) : undefined,
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined,
        order: req.query.order ? (Array.isArray(req.query.order) ? req.query.order.map(x => x.toString()) : [req.query.order.toString()]) : undefined,
    };

    try {
        res.json(await getValidIDs(options));
    } catch (e) {
        res.status(400).json(ErrRes(e));
    }
});


export default router;