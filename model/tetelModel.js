import pool from '../db.js';

//razon, pazon, db

export const getTetelByRendelesId = async (razon) => {
    const [rows] = await pool.query('SELECT * FROM tetel WHERE razon = ?', [razon]);
    return rows;
};

export const insertTetel = async (tetel) => {
    const { Razon, Pazon, Darab } = tetel;
    const [result] = await pool.query(
        'INSERT INTO tetel (razon, pazon, db) VALUES (?, ?, ?)',
        [Razon, Pazon, Darab]
    );
    return result;
};

export const updateTetel = async (razon, pazon, tetel) => {
    const { Darab } = tetel;
    const [result] = await pool.query(
        'UPDATE tetel SET db = ? WHERE razon = ? AND pazon = ?',
        [Darab, razon, pazon]
    );
    return result;
};

export const deleteTetel = async (razon, pazon) => {
    const [result] = await pool.query(
        'DELETE FROM tetel WHERE razon = ? AND pazon = ?',
        [razon, pazon]
    );
    return result;
};

