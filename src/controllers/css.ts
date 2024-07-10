import db from '../db';
import {getUserByID} from './user';
import {RunResult} from "sqlite3";

export type CSS = {
    id: number,
    name: string,
    viewed_time: number,
    author_id: number,
    html: string,
    css: string,
    category: CSSCategory,
}


export function getCSSs(ids: number[]): Promise<CSS[]> {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM css WHERE id IN (${ids.map(() => '?').join(',')})`, ids, (err: Error|null, objects: CSS[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(objects);
            }
        });
    });
}


export function getValidIDs(options: {
    category?: string,
    limit?: number,
    offset?: number,
    order?: string[]
}): Promise<number[]> {
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
        db.all(`SELECT id FROM css ${where} ${order} ${limit}`, params, (err: Error|null, objects: CSS[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(objects.map(e => e.id));
            }
        });
    });
}


export const CSSCategories = [
    "button",
    "checkbox",
    "toggle switch",
    "loader",
    "card",
    "input",
    "transition",
    "special effect",
] as const;
export type CSSCategory = typeof CSSCategories[number];
export async function createCSS(userID: number, password_hashed: string, name: string, html: string, css: string, category: CSSCategory): Promise<number> {
    let user = await getUserByID(userID);
    if (!user) {
        throw Error("User does not exist");
    }
    if (user.password_hashed !== password_hashed) {
        throw Error("Incorrect password");
    }
    if (!name) {
        throw Error("Must provide a name");
    }
    if (!html) {
        throw Error("HTML content must not be blank");
    }

    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO css (name, author_id, html, css, category) VALUES (?, ?, ?, ?, ?)`, [name, userID, html, css, category],
            function (this:RunResult, err: Error|null) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}


export async function deleteCSS(id: number, password_hashed: string): Promise<void> {
    let [style] = await getCSSs([id]);
    if (style === undefined) {
        throw Error('ID does not exist');
    }
    let user = await getUserByID(style.author_id);

    if (user.password_hashed !== password_hashed) {
        throw Error("Incorrect password!");
    }

    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM css WHERE id=${id}`, [], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}
