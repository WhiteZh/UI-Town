import db from '../db';


export type User = {
    id: number,
    name: string,
    email: string,
    password_hashed: string,
}


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


export function getUserByID(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, object: User) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(object);
            }
        });
    })
}


export function getUserByEmail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, object: User) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(object);
            }
        });
    });
}


export function updateUser(id: number, properties: {
    name?: string,
    email?: string,
    password_hashed?: string,
}): Promise<boolean> {
    let emplace = Array(Object.keys(properties).length).fill('? = ?').join(',');
    return new Promise((resolve, reject) => {
        db.run(`UPDATE users SET ${emplace} WHERE id = ?`, [...Object.entries(properties).flat(), id], (err) => {
            if (er !== null) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    })
}
