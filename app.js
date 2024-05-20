const express = require('express');
const app = express();
const port = 3000;

const cssRouter = require('./routers/css');

app.use('/css', cssRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));