// GET /api/futar Összes futár lekérdezése READ (Listázás)
// GET /api/futar/:fazon Egy adott futár lekérdezése azonosító alapján READ (Egyedi elem)
// POST /api/futar Új futár felvétele CREATE
// PUT /api/futar/:fazon Futár adatainak módosítása UPDATE
// DELETE /api/futar/:fazon Futár törlése DELETE

import express from 'express';
import * as futarModel from '../model/futarModel.js';
const futarRouter = express.Router();

futarRouter.get('/', async (req, res) => {
    try {
        const futarok = await futarModel.getAllFutars();
        res.status(200).send(futarok);
    } catch (error) {
        console.error('Hiba a futárok lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a futárok lekérése során.' });
    }
});

futarRouter.get('/:fazon', async (req, res) => {
    // ide akkor jön ha http
    try {
        const fazon = req.params.fazon;
        const futar = await futarModel.getFutarById(fazon);
        if (futar) {
            res.status(200).send(futar);
        } else {
            res.status(404).send({ error: 'Futár nem található.' });
        }
    } catch (error) {
        console.error('Hiba a futár lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a futár lekérése során.' });
    }
});

futarRouter.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { Nev, Jarmu_Tipus, Rendszam, Telefon } = req.body;

        if (!Nev || !Jarmu_Tipus || !Rendszam) {
            return res.status(400).send({
                error: 'Név, jármű típus és rendszám megadása kötelező.'
            });
        }

        const result = await futarModel.insertFutar(req.body);
        res.status(201).send({
            message: 'Futár sikeresen hozzáadva.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Hiba a futár hozzáadásakor:', error);
        res.status(500).send({
            error: 'Hiba történt a futár hozzáadása során.'
        });
    }
});

futarRouter.put('/:fazon', async (req, res) => {
    try {
        const fazon = req.params.fazon;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const updated = await futarModel.updateFutar(fazon, req.body);
        if (updated) {
            res.status(200).send({ message: 'Futár sikeresen frissítve.' });
        } else {
            res.status(404).send({ error: 'Futár nem található.' });
        }
    } catch (error) {
        console.error('Hiba a futár frissítésekor:', error);
        res.status(500).send({ error: 'Hiba történt a futár frissítése során.' });
    }
});

futarRouter.delete('/:fazon', async (req, res) => {
    try {
        const fazon = req.params.fazon;
        const deleted = await futarModel.deleteFutar(fazon);
        if (deleted) {
            res.status(200).send({ message: 'Futár sikeresen törölve.' });
        } else {
            res.status(404).send({ error: 'Futár nem található.' });
        }
    } catch (error) {
        console.error('Hiba a futár törlésekor:', error);
        res.status(500).send({ error: 'Hiba történt a futár törlése során.' });
    }
});

export default futarRouter;