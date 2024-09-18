import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 80;

app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

import cssRouter from './routers/css';
import usersRouter from './routers/users';

app.use('/api/css', cssRouter);
app.use('/api/users', usersRouter);

app.get('*', (req, res) => {
    console.log('req.path: ' + req.path);
    if (req.path.match(/^\/api/)) {
        res.status(400);
    } else {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
    }
});

app.listen(port, () => console.log(`Listening on port ${port}\nhttp://localhost:${port}/`));