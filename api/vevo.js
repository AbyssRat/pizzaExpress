// GET /api/vevo Összes vevő lekérdezése READ
// GET /api/vevo/:vazon Egy adott vevő lekérdezése READ
// POST /api/vevo Új vevő hozzáadása CREATE
// PUT /api/vevo/:vazon Vevő adatainak módosítása UPDATE
// DELETE /api/vevo/:vazon Vevő törlése DELETE

import express from 'express';
import * as vevoModel from '../model/vevoModel.js';
const vevoRouter = express.Router();

vevoRouter.get('/', async (req, res) => {
    try {
        const vevok = await vevoModel.getAllVevos();
        res.status(200).send(vevok);
    } catch (error) {
        console.error('Hiba a vevők lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a vevők lekérése során.' });
    }
});

vevoRouter.get('/:vazon', async (req, res) => {
    try {
        const vazon = req.params.vazon;
        const vevo = await vevoModel.getVevoById(vazon);
        if (vevo) {
            res.status(200).send(vevo);
        } else {
            res.status(404).send({ error: 'Vevő nem található.' });
        }
    } catch (error) {
        console.error('Hiba a vevő lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a vevő lekérése során.' });
    }
});


//vazon, vnev, vcim

vevoRouter.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { Azon, Nev, Cim } = req.body;

        if (!Nev || !Cim) {
            return res.status(400).send({
                error: 'Név és cím megadása kötelező.'
            });
        }

        const result = await vevoModel.insertVevo(req.body);
        res.status(201).send({
            message: 'Vevő sikeresen hozzáadva.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Hiba a vevő hozzáadásakor:', error);
        res.status(500).send({
            error: 'Hiba történt a vevő hozzáadása során.'
        });
    }
});


vevoRouter.put('/:vazon', async (req, res) => {
    try {
        const vazon = req.params.vazon;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const existingVevo = await vevoModel.getVevoById(vazon);
        if (!existingVevo) {
            return res.status(404).send({ error: 'Vevő nem található.' });
        }

        await vevoModel.updateVevo(vazon, req.body);
        res.status(200).send({ message: 'Vevő sikeresen frissítve.' });
    } catch (error) {
        console.error('Hiba a vevő frissítésekor:', error);
        res.status(500).send({ error: 'Hiba történt a vevő frissítése során.' });
    }
});

vevoRouter.delete('/:vazon', async (req, res) => {
    try {
        const vazon = req.params.vazon;

        const existingVevo = await vevoModel.getVevoById(vazon);
        if (!existingVevo) {
            return res.status(404).send({ error: 'Vevő nem található.' });
        }

        await vevoModel.deleteVevo(vazon);
        res.status(200).send({ message: 'Vevő sikeresen törölve.' });
    } catch (error) {
        console.error('Hiba a vevő törlésekor:', error);
        res.status(500).send({ error: 'Hiba történt a vevő törlése során.' });
    }
});

export default vevoRouter;