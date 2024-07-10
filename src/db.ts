import {verbose} from "sqlite3";
import path from 'path';
import fs from 'fs';

const sqlite3 = verbose();

const db = new sqlite3.Database(path.join(__dirname, '../db/database.sqlite'), (err: Error|null) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

let db_version = 0;

const version_path = path.join(__dirname, '../db/db-version.txt');
if (fs.existsSync(version_path)) {
    db_version = parseInt(fs.readFileSync(version_path).toString());
}

fs.readdir(path.join(__dirname, '../db/db_inits'), (err: Error|null, files: string[]) => {
    if (err) {
        console.error(err.message);
        return;
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
    let cnt = files.length;
    for (let i = 0; i < files.length; i++) {
        fs.readFile(path.join(__dirname, `../db/db_inits/${files[i]}`), (err, data) => {
            if (err) {
                console.error(err.message);
                return;
            }

            files[i] = data.toString();
            cnt--;
            if (cnt === 0) {
                db.serialize(() => {
                    let cnt = files.length;
                    for (let command of files) {
                        console.log(command);
                        db.exec(command, (err: Error|null) => {
                            if (err) {
                                console.error(err.message);
                            }

                            cnt--;
                            if (cnt === 0) {
                                console.log('Initialized database.');
                                fs.writeFile(version_path, db_version.toString(), err => {
                                    if (err) {
                                        console.error(err.message);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});


export default db;
