import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());
app.use(express.json());

//ide

import futarRouter from './api/futar.js';
import pizzaRouter from './api/pizza.js';


//:3

app.use('/futar', futarRouter);
app.use('/pizza', pizzaRouter);



//itt meg vége

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});