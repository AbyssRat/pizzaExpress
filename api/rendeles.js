// GET /api/rendeles Összes rendelés listázása (összeggel!) READ
// GET /api/rendeles/:razon Egy rendelés lekérdezése READ
// POST /api/rendeles Új rendelés létrehozása CREATE
// DELETE /api/rendeles/:razon Rendelés törlése (tételekkel együtt, tranzakcióval) DELETE
//razon, vazon, fazon, idopont
import express from 'express';
import * as rendelesModel from '../model/rendelesModel.js';
const rendelesRouter = express.Router();

rendelesRouter.get('/', async (req, res) => {
    try {
        const rendelesek = await rendelesModel.getAllRendelesWithSum();
        res.status(200).send(rendelesek);
    } catch (error) {
        console.error('Hiba a rendelések lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a rendelések lekérése során.' });
    }
});

rendelesRouter.get('/:razon', async (req, res) => {
    try {
        const razon = req.params.razon;
        const rendeles = await rendelesModel.getRendelesById(razon);
        if (rendeles) {
            res.status(200).send(rendeles);
        } else {
            res.status(404).send({ error: 'Rendelés nem található.' });
        }
    } catch (error) {
        console.error('Hiba a rendelés lekérésekor:', error);
        res.status(500).send({ error: 'Hiba történt a rendelés lekérése során.' });
    }
});

rendelesRouter.post('/', async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: 'Hiányzó adatok.' });
        }

        const { Vazon, Fazon, Idopont } = req.body;

        if (!Vazon || !Fazon || !Idopont) {
            return res.status(400).send({
                error: 'Vevőazonosító, Futárazonosító és Időpont megadása kötelező.'
            });
        }

        const result = await rendelesModel.insertRendeles(req.body);
        res.status(201).send({
            message: 'Rendelés sikeresen hozzáadva.',
            id: result.insertId
        });
    } catch (error) {
        console.error('Hiba a rendelés hozzáadásakor:', error);
        res.status(500).send({
            error: 'Hiba történt a rendelés hozzáadása során.'
        });
    }
});

rendelesRouter.delete('/:razon', async (req, res) => {
    try {
        const razon = req.params.razon;
        const result = await rendelesModel.deleteRendeles(razon);
        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Rendelés sikeresen törölve.' });
        } else {
            res.status(404).send({ error: 'Rendelés nem található.' });
        }
    } catch (error) {
        console.error('Hiba a rendelés törlésekor:', error);
        res.status(500).send({ error: 'Hiba történt a rendelés törlése során.' });
    }
});

export default rendelesRouter;