import pool from '../db.js';

export const getAllFutars = async () => {
    const [rows] = await pool.query('SELECT * FROM futar');
    return rows;
}

export const getFutarById = async (fazon) => {
    const [rows] = await pool.query('SELECT * FROM futar WHERE Fazon = ?', [fazon]);
    return rows[0];
};

export const insertFutar = async (futar) => {
    const { Nev, Id, Telefon } = futar;
    const [result] = await pool.query(
        'INSERT INTO futar (fnev, fazon, ftel) VALUES (?, ?, ?)',
        [Nev, Id, Telefon]
    );
    return result;
}

export const updateFutar = async (fazon, futar) => {
    const { Nev, Id, Telefon } = futar;
    const [result] = await pool.query(
        'UPDATE futar SET fnev = ?, fazon = ?, ftel = ? WHERE fazon = ?',
        [Nev, Id, Telefon, fazon]
    );
    return result;
};

export const deleteFutar = async (fazon) => {
    const [result] = await pool.query(
        'DELETE FROM futar WHERE fazon = ?',
        [fazon]
    );
    return result;
};


