const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

app.use(morgan('combined'));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

const cssRouter = require('./routers/css');
const usersRouter = require('./routers/users');

app.use('/api/css', cssRouter);
app.use('/api/users', usersRouter);

app.get('*', (req, res) => {
    console.log('req.path: ' + req.path);
    if (req.path.match(/^\/api/)) {
        res.status(400);
    } else {
        res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    }
});

app.listen(port, () => console.log(`Listening on port ${port}\n http://localhost/`));