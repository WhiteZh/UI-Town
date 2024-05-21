const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

fs.readdir(path.join(__dirname, 'db_inits'), (err, files) => {
    if (err) {
        console.log(err.message);
        return;
    }

    files = files.filter(name => name.match(/^[0-9]+\.sql$/)).sort((a, b) => parseInt(a.match(/^[0-9]+/)[0]) - parseInt(b.match(/^[0-9]+/)[0]));
    console.log(files);
    let cnt = files.length;
    for (let i = 0; i < files.length; i++) {
        fs.readFile(path.join(__dirname, `db_inits/${files[i]}`), (err, data) => {
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
                        db.exec(command, err => {
                            if (err) {
                                console.error(err.message);
                            }

                            cnt--;
                            if (cnt === 0) {
                                console.log('Serialized database.');
                            }
                        })
                    }
                });
            }
        });
    }
});

module.exports = {};