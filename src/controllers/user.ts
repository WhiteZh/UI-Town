import db from '../db';
import {deleteUndefinedFields, isOfType, SqlRowTypeError} from "../util";


export function createUser(name: string, email: string, password_hashed: string): Promise<number | Error> {
    return new Promise((resolve) => {
        if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === null) {
            resolve(Error('Wrong email format'));
            return;
        }
        db.run(`INSERT INTO users (name, email, password_hashed) VALUES (?, ?, ?)`, [name, email, password_hashed], function (err) {
            if (err !== null) {
                console.error(err);
                resolve(err);
                return;
            } else {
                resolve(this.lastID);
            }
        });
    });
}

type UserRes = {
    id: number,
    name: string,
    email: string,
    password_hashed: string,
    description: string,
    icon: string | null,
};

type UserRow = {
    id: number,
    name: string,
    email: string,
    password_hashed: string,
    description: string,
    icon: Buffer | null,
    icon_type: string | null,
};

const pickUserRes: (_: UserRes) => UserRes =
    ({id, name, email, password_hashed, description, icon}) =>
    ({id, name, email, password_hashed, description, icon});

const isUserRowType = (o: unknown): o is UserRow => isOfType(o, {
    id: x => typeof x === 'number',
    name: x => typeof x === 'string',
    email: x => typeof x === 'string',
    password_hashed: x => typeof x === 'string',
    description: x => typeof x === 'string',
    icon: x => x instanceof Buffer || x === null,
    icon_type: x => typeof x === 'string' || x === null,
});

const retrieveUserSQL = (resolve: (_: UserRes | Error) => void) => (err: Error | null, row: unknown) => {
    if (err !== null) {
        console.error(err);
        resolve(err);
    } else {
        if (isUserRowType(row)) {
            resolve(pickUserRes({
                ...row,
                icon: row.icon === null || row.icon_type === null ? null : `data:image/${row.icon_type};base64,${row.icon.toString("base64")}`
            }));
        } else {
            let err = SqlRowTypeError();
            console.error(err);
            console.error(row);
            resolve(err);
        }
    }
}

export function getUserByID(id: number): Promise<UserRes | Error> {
    return new Promise((resolve) => {
        db.get(`SELECT id, name, email, password_hashed, description, icon, icon_type FROM users WHERE id = ?`, [id], retrieveUserSQL(resolve));
    })
}

export function getUserByEmail(email: string): Promise<UserRes | Error> {
    return new Promise((resolve) => {
        db.get(`SELECT id, name, email, password_hashed, description, icon, icon_type FROM users WHERE email = ?`, [email], retrieveUserSQL(resolve));
    });
}


export function updateUser(id: number, properties: {
    name?: string,
    email?: string,
    password_hashed?: string,
    description?: string,
    icon?: Buffer,
    icon_type?: string,
}): Promise<void | Error> {

    if (properties.icon === undefined || properties.icon_type === undefined) {
        properties.icon = undefined;
        properties.icon_type = undefined;
    }

    deleteUndefinedFields(properties);

    let emplace = Object.keys(properties).map(v => `${v} = ?`).join(',');
    return new Promise((resolve) => {
        db.run(`UPDATE users SET ${emplace} WHERE id = ?`, [...Object.values(properties), id], (err) => {
            if (err !== null) {
                console.error(err);
                resolve(err);
            } else {
                resolve();
            }
        });
    });
}
