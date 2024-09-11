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
            if (err !== null) {
                reject(err);
            } else {
                resolve(objects);
            }
        });
    });
}


export function getValidIDs(options: {
    category?: string,
    author_id?: number,
    limit?: number,
    offset?: number,
    order?: string[],
}): Promise<number[]> {
    let where = '';
    let order = '';
    let limit = '';
    let params = [];
    if (options.category !== undefined || options.author_id !== undefined) {
        let conditions: string[] = [];
        if (options.category !== undefined) {
            conditions.push('category=?');
            params.push(options.category);
        }
        if (options.author_id !== undefined) {
            conditions.push('author_id=?');
            params.push(options.author_id);
        }
        where = `WHERE ${conditions.join(' AND ')} `;
        console.log(where)
    }
    if (options.order !== undefined) {
        for (let each of options.order) {
            if (each.match(/^[a-zA-Z_]+$/) === null) {
                throw Error('Illegal column name contained inside options.order');
            }
        }
        order = `ORDER BY ${options.order.join(',')} `;
    }
    if (options.limit !== undefined) {
        limit = `LIMIT ? `;
        params.push(options.limit);
        if (options.offset !== undefined) {
            limit += `OFFSET ? `;
            params.push(options.offset);
        }
    }
    return new Promise((resolve, reject) => {
        db.all(`SELECT id FROM css ${where} ${order} ${limit}`, params, (err: Error|null, objects: CSS[]) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(objects.map(e => e.id));
            }
        });
    });
}


export const cssCategories = [
    "button",
    "checkbox",
    "toggle switch",
    "loader",
    "card",
    "input",
    "transition",
    "special effect",
] as const;
export type CSSCategory = typeof cssCategories[number];
export async function createCSS(userID: number, password_hashed: string, name: string, html: string, css: string, category: CSSCategory): Promise<number | Error> {
    let user = await getUserByID(userID);
    if (user instanceof Error) {
        return user;
    }
    if (user.password_hashed !== password_hashed) {
        throw Error("Incorrect password");
    }

    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO css (name, author_id, html, css, category) VALUES (?, ?, ?, ?, ?)`, [name, userID, html, css, category],
            function (this:RunResult, err: Error|null) {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}


export async function deleteCSS(id: number, password_hashed: string): Promise<void| Error> {
    let [style] = await getCSSs([id]);
    if (style === undefined) {
        throw Error('ID does not exist');
    }
    let user = await getUserByID(style.author_id);
    if (user instanceof Error) {
        return user;
    }

    if (user.password_hashed !== password_hashed) {
        throw Error("Incorrect password!");
    }

    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM css WHERE id=${id}`, [], (err) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve();
            }
        })
    });
}
