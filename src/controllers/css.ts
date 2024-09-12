import db from '../db';
import {getUserByID} from './user';
import {RunResult} from "sqlite3";
import {isOfType} from "../util";

export type CSS = {
    id: number,
    name: string,
    viewed_time: number,
    author_id: number,
    html: string,
    css: string,
    category: CSSCategory,
}

const isCSS = (o: unknown): o is CSS => isOfType(o, {
    id: x => typeof x === 'number',
    name: x => typeof x === 'string',
    viewed_time: x => typeof x === 'number',
    author_id: x => typeof x === 'number',
    html: x => typeof x === 'string',
    css: x => typeof x === 'string',
    category: x => (cssCategories as unknown as unknown[]).includes(x),
});

const pickCSS = ({id, name, viewed_time, author_id, html, css, category}: CSS): CSS => ({id, name, viewed_time, author_id, html, css, category});


export function getCSSs(ids: number[]): Promise<CSS[] | Error> {
    return new Promise((resolve) => {
        db.all(`SELECT * FROM css WHERE id IN (${ids.map(() => '?').join(',')})`, ids, (err, rows) => {
            if (err !== null) {
                resolve(err);
            } else {
                if (rows.length === 0) {
                    resolve([]);
                } else {
                    if (isCSS(rows[0])) {
                        resolve((rows as CSS[]).map(x => pickCSS(x)));
                    } else {
                        resolve(Error("Unexpected row schema"));
                    }
                }
            }
        });
    });
}


const isIDRow = (o: unknown): o is {id: number} => isOfType(o, {
    id: x => typeof x === 'number',
});

export async function getValidIDs(options: {
    category?: string,
    author_id?: number,
    limit?: number,
    offset?: number,
    order?: string[],
}): Promise<number[] | Error> {
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
                return Error('Illegal column name contained inside options.order');
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
    return new Promise((resolve) => {
        db.all(`SELECT id FROM css ${where} ${order} ${limit}`, params, (err, rows) => {
            if (err !== null) {
                resolve(err);
            } else {
                if (rows.length === 0) {
                    resolve([]);
                } else {
                    if (isIDRow(rows[0])) {
                        resolve((rows as {id: number}[]).map(x => x.id));
                    } else {
                        resolve(Error("Unexpected row scheme returned"));
                    }
                }
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
        return Error("Incorrect password");
    }

    return new Promise((resolve) => {
        db.run(`INSERT INTO css (name, author_id, html, css, category) VALUES (?, ?, ?, ?, ?)`, [name, userID, html, css, category],
            function (err) {
                if (err !== null) {
                    resolve(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}


export async function deleteCSS(id: number, password_hashed: string): Promise<void| Error> {
    let styles = await getCSSs([id]);
    if (styles instanceof Error) {
        return styles
    }
    let style = styles[0];
    if (style === undefined) {
        return Error('ID does not exist');
    }
    let user = await getUserByID(style.author_id);
    if (user instanceof Error) {
        return user;
    }

    if (user.password_hashed !== password_hashed) {
        return Error("Incorrect password!");
    }

    return new Promise((resolve) => {
        db.run(`DELETE FROM css WHERE id=${id}`, [], (err) => {
            if (err !== null) {
                resolve(err);
            } else {
                resolve();
            }
        })
    });
}
