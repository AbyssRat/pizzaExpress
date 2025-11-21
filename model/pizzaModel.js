import pool from '../db.js';

export const getAllPizzas = async () => {
    const [rows] = await pool.query('SELECT * FROM pizza');
    return rows;
}
//pazon, pnev, par
export const getPizzaById = async (pazon) => {
    const [rows] = await pool.query('SELECT * FROM pizza WHERE pazon = ?', [pazon]);
    return rows[0];
};

export const insertPizza = async (pizza) => {
    const { pazon, pnev, par } = pizza;
    const [result] = await pool.query('INSERT INTO pizza (pazon, pnev, par) VALUES (?, ?, ?)', [pazon, pnev, par]);
    return result;
}

export const updatePizza = async (pizza) => {
    const { pazon, pnev, par } = pizza;
    await pool.query('UPDATE pizza SET pnev = ?, par = ? WHERE pazon = ?', [pnev, par, pazon]);
};

export const deletePizza = async (pazon) => {
    await pool.query('DELETE FROM pizza WHERE pazon = ?', [pazon]);
};


