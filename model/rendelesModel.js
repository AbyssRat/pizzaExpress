import pool from '../db.js';
//tetel.razon, tetel.pazon, tetel.db, pizza.par, pizza.pnev
export const getAllRendelesWithSum = async () => {
    const [rows] = await pool.query(`
        SELECT rendeles.razon, rendeles.vazon, rendeles.fazon, rendeles.idopont,
               SUM(pizza.par * tetel.db) AS osszeg
        FROM rendeles
        JOIN tetel ON rendeles.razon = tetel.razon
        JOIN pizza ON tetel.pazon = pizza.pazon
        GROUP BY rendeles.razon, rendeles.vazon, rendeles.fazon, rendeles.idopont
 `);
    return rows;
}
export const getRendelesById = async (razon) => {
    const [rows] = await pool.query('SELECT * FROM rendeles WHERE razon = ?', [razon]);
    return rows[0];
};

export const insertRendeles = async (rendeles) => {
    const { Vazon, Fazon, Idopont } = rendeles;
    const [result] = await pool.query(
        'INSERT INTO rendeles (vazon, fazon, idopont) VALUES (?, ?, ?)',
        [Vazon, Fazon, Idopont]
    );
    return result;
}

export const deleteRendeles = async (razon) => {
    const [result] = await pool.query(
        'DELETE FROM rendeles WHERE razon = ?',
        [razon]
    );
    return result;
};

