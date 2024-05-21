const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'tmp.sql'), (err, data) => {
    if (err) {
        console.error(err.message);
        return;
    }

    fs.writeFile(path.join(__dirname, `${Date.now()}.sql`), data.toString(), err => {
        if (err) {
            console.error(err.message);
        }
    });
});