import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());
app.use(express.json());

//ide

import futarRouter from './api/futar.js';
import pizzaRouter from './api/pizza.js';
import vevoRouter from './api/vevo.js';
import rendelesRouter from './api/rendeles.js';
import tetelRouter from './api/tetel.js';

//:3

app.use('/futar', futarRouter);
app.use('/pizza', pizzaRouter);
app.use('/vevo', vevoRouter);
app.use('/rendeles', rendelesRouter);
app.use('/tetel', tetelRouter);



//itt meg vége

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});