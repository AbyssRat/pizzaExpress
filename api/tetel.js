// GET /api/tetel/:razon Adott rendeléshez tartozó tételek listázása READ
// POST /api/tetel Új rendelési tétel felvétele CREATE
// PUT /api/tetel/:razon/:pazon Tétel darabszámának módosítása UPDATE
// DELETE /api/tetel/:razon/:pazon Tétel törlése DELETE

import express from 'express';
import * as tetelModel from '../model/tetelModel.js';
const tetelRouter = express.Router();

tetelRouter.get('/:razon', async (req, res) => {
    try {
        const razon = req.params.razon;
        const tetelList = await tetelModel.getTetelByRendelesId(razon);
        res.status(200).send(tetelList);
    } catch (error) {
        console.error('Hiba a tételek lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a tételek lekérése során.' });
    }
});

tetelRouter.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { Razon, Pazon, Darab } = req.body;

        if (!Razon || !Pazon || !Darab) {
            return res.status(400).send({
                error: 'Rendelés azonosító, termék azonosító és darabszám megadása kötelező.'
            });
        }

        const result = await tetelModel.insertTetel(req.body);
        res.status(201).send({
            message: 'Tétel sikeresen hozzáadva.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Hiba a tétel hozzáadásakor:', error);
        res.status(500).send({
            error: 'Hiba történt a tétel hozzáadása során.'
        });
    }
});

tetelRouter.put('/:razon/:pazon', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const razon = req.params.razon;
        const pazon = req.params.pazon;
        const { Darab } = req.body;

        if (!Darab) {
            return res.status(400).send({
                error: 'Darabszám megadása kötelező.'
            });
        }

        const result = await tetelModel.updateTetel(razon, pazon, req.body);
        res.status(200).send({
            message: 'Tétel sikeresen frissítve.'
        });
    } catch (error) {
        console.error('Hiba a tétel frissítésekor:', error);
        res.status(500).send({
            error: 'Hiba történt a tétel frissítése során.'
        });
    }
});

tetelRouter.delete('/:razon/:pazon', async (req, res) => {
    try {
        const razon = req.params.razon;
        const pazon = req.params.pazon;

        const result = await tetelModel.deleteTetel(razon, pazon);
        res.status(200).send({
            message: 'Tétel sikeresen törölve.'
        });
    } catch (error) {
        console.error('Hiba a tétel törlésekor:', error);
        res.status(500).send({
            error: 'Hiba történt a tétel törlése során.'
        });
    }
});

export default tetelRouter;

