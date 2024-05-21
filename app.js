const express = require('express');
const app = express();
const port = 3000;

const cssRouter = require('./routers/css');
const usersRouter = require('./routers/users');

app.use('/css', cssRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));