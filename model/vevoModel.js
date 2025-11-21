import pool from '../db.js';

export const getAllVevos = async () => {
    const [rows] = await pool.query('SELECT * FROM vevo');
    return rows;
}
//vazon, vnev, vcim

export const getVevoById = async (vazon) => {
    const [rows] = await pool.query('SELECT * FROM vevo WHERE vazon = ?', [vazon]);
    return rows[0];
};

export const insertVevo = async (vevo) => {
    const { Nev, Cim, Telefon } = vevo;
    const [result] = await pool.query(
        'INSERT INTO vevo (vnev, vcim, vtel) VALUES (?, ?, ?)',
        [Nev, Cim, Telefon]
    );
    return result;
} 

export const updateVevo = async (vazon, vevo) => {
    const { Nev, Cim, Telefon } = vevo;
    const [result] = await pool.query(
        'UPDATE vevo SET vnev = ?, vcim = ?, vtel = ? WHERE vazon = ?',
        [Nev, Cim, Telefon, vazon]
    );
    return result;
};

export const deleteVevo = async (vazon) => {
    const [result] = await pool.query(
        'DELETE FROM vevo WHERE vazon = ?',
        [vazon]
    );
    return result;
};


