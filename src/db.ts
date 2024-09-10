import {verbose} from "sqlite3";
import path from 'path';
import fs from 'fs';

const sqlite3 = verbose();

const db = new sqlite3.Database(path.join(__dirname, '../db/database.sqlite'), (err: Error|null) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
    }
});

let db_version = 0;

const version_path = path.join(__dirname, '../db/db-version.txt');
if (fs.existsSync(version_path)) {
    db_version = parseInt(fs.readFileSync(version_path).toString());
}

fs.readdir(path.join(__dirname, '../db/db_inits'), async (err: Error|null, files: string[]) => {
    if (err) {
        console.error(err.message);
        throw err;
    }

    files = files.filter(name => name.match(/^[0-9]+\.sql$/));
    files = files.filter(name => parseInt((name.match(/^[0-9]+/) ?? ['0'])[0]) > db_version);
    if (files.length === 0) {
        console.log("No initialization process is required to be performed.");
        return;
    }
    files = files.sort((a, b) => parseInt(a.match(/^[0-9]+/)![0]) - parseInt(b.match(/^[0-9]+/)![0]));
    db_version = parseInt(files[files.length-1].match(/^[0-9]+/)![0]);
    console.log(files);

    let commands: string[] = [];
    for (let i in files) {
        commands[i] = await new Promise<string>((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'db', 'db_inits', files[i]), (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.toString());
                }
            });
        });
    }

    for (let i in commands) {
        console.log(commands[i]);
        await new Promise<void>((resolve, reject) => db.exec(commands[i], (err: Error|null) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }));
        console.log(`Successfully committed: ${files[i]}`);
        await new Promise<void>((resolve, reject) => fs.writeFile(version_path, files[i].match(/^[0-9]+/)![0], err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        }));
    }

    console.log('Initialized database.');
});


export default db;
