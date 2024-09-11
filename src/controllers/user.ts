import db from '../db';
import {deleteUndefinedFields, isOfType} from "../util";


export function createUser(name: string, email: string, password_hashed: string): Promise<number> {
    if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === null) {
        throw Error('Wrong email format');
    }
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (name, email, password_hashed) VALUES (?, ?, ?)`,
            [name, email, password_hashed],
            function (err) {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
    });
}

type getUserRet = {
    id: number,
    name: string,
    email: string,
    password_hashed: string,
    description: string,
    icon: string | null,
};

type getUserRow = {
    id: number,
    name: string,
    email: string,
    password_hashed: string,
    description: string,
    icon: Buffer | null,
};

const isGetUserRowType = (o: unknown): o is getUserRow => isOfType(o, {
    id: x => typeof x === 'number',
    name: x => typeof x === 'string',
    email: x => typeof x === 'string',
    password_hashed: x => typeof x === 'string',
    description: x => typeof x === 'string',
    icon: x => typeof x === 'string' || x === null,
});

export function getUserByID(id: number): Promise<getUserRet | Error> {
    return new Promise((resolve) => {
        db.get(`SELECT id, name, email, password_hashed, description, icon FROM users WHERE id = ?`, [id], (err, row) => {
            if (err !== null) {
                resolve(err);
            } else {
                if (isGetUserRowType(row)) {
                    resolve({
                        ...row,
                        icon: row.icon === null ? null : row.icon.toString("base64")
                    });
                } else {
                    resolve(Error("SQL returned row does not match the desired type"));
                }
            }
        });
    })
}

export function getUserByEmail(email: string): Promise<getUserRet | Error> {
    return new Promise((resolve) => {
        db.get(`SELECT (id, name, email, password_hashed, description, icon) FROM users WHERE email = ?`, [email], (err, row) => {
            if (err !== null) {
                resolve(err);
            } else {
                if (isGetUserRowType(row)) {
                    resolve({
                        ...row,
                        icon: row.icon === null ? null : row.icon.toString("base64")
                    });
                } else {
                    resolve(Error("SQL returned row does not match the desired type"));
                }
            }
        });
    });
}


export function updateUser(id: number, properties: {
    name?: string,
    email?: string,
    password_hashed?: string,
    description?: string,
    icon?: Buffer,
}): Promise<void | Error> {
    deleteUndefinedFields(properties);
    let emplace = Object.keys(properties).map(v => `${v} = ?`).join(',');
    return new Promise((resolve) => {
        db.run(`UPDATE users SET ${emplace} WHERE id = ?`, [...Object.values(properties), id], (err) => {
            if (err !== null) {
                resolve(err);
            } else {
                resolve();
            }
        });
    });
}
