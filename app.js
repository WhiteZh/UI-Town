const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

const cssRouter = require('./routers/css');
const usersRouter = require('./routers/users');

app.use('/api/css', cssRouter);
app.use('/api/users', usersRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));