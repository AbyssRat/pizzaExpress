// GET /api/pizza Összes pizza lekérdezése READ
// GET /api/pizza/:pazon Egy adott pizza lekérdezése READ
// POST /api/pizza Új pizza hozzáadása CREATE
// PUT /api/pizza/:pazon Pizza adatainak módosítása (pl. ár) UPDATE
// DELETE /api/pizza/:pazon Pizza törlése DELETE

import express from 'express';
import * as pizzaModel from '../model/pizzaModel.js';
const pizzaRouter = express.Router();

pizzaRouter.get('/', async (req, res) => {
    const pizzas = await pizzaModel.getAllPizzas();
    res.json(pizzas);
});

pizzaRouter.get('/:pazon', async (req, res) => {
    const pizza = await pizzaModel.getPizzaById(req.params.pazon);
    res.json(pizza);
});

pizzaRouter.post('/', async (req, res) => {
    const newPizza = req.body;
    const result = await pizzaModel.insertPizza(newPizza);
    res.status(201).json({ message: 'Pizza created', id: result.insertId });
});

pizzaRouter.put('/:pazon', async (req, res) => {
    const updatedPizza = req.body;
    await pizzaModel.updatePizza(req.params.pazon, updatedPizza);
    res.json({ message: 'Pizza updated' });
});

pizzaRouter.delete('/:pazon', async (req, res) => {
    await pizzaModel.deletePizza(req.params.pazon);
    res.json({ message: 'Pizza deleted' });
});




export default pizzaRouter;