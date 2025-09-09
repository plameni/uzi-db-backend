const sequelize = require('./../common/db-config');


const getAllCriminalActs = async () => {
    try {
        const [results] = await sequelize.query(`
        SELECT ca.*, a.username AS updated_by_name
        FROM criminal_acts ca
        LEFT JOIN account a ON ca.updated_by = a.id
        ORDER BY ca.created DESC
    `);
        return results;
    } catch (error) {
        console.error('Error in getAllCriminalActs:', error);
        return null;
    }
};


const getCriminalActsPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query('SELECT COUNT(*) AS total FROM criminal_acts');
        const totalCount = countResult[0].total;


        const [results] = await sequelize.query(
        `SELECT ca.*, a.username AS updated_by_name
        FROM criminal_acts ca
        LEFT JOIN account a ON ca.updated_by = a.id
        ORDER BY ca.created DESC
        LIMIT ? OFFSET ?`,
        { replacements: [limit, offset] }
        );


        return { count: totalCount, rows: results };
    } catch (error) {
        console.error('Error in getCriminalActsPaginated:', error);
        return null;
    }
};


const getCriminalActByID = async (id) => {
    try {
        const [results] = await sequelize.query(
        `SELECT ca.*, a.username AS updated_by_name
        FROM criminal_acts ca
        LEFT JOIN account a ON ca.updated_by = a.id
        WHERE ca.id = ?`,
        { replacements: [id] }
        );
    return results[0];
    } catch (error) {
        console.error('Error in getCriminalActByID:', error);
    return null;
    }
};


const insertCriminalAct = async (criminalAct) => {
    try {
    const [results] = await sequelize.query(
        `INSERT INTO criminal_acts (name, description, created, updated, updated_by)
        VALUES (?, ?, NOW(), NOW(), ?)` ,
        { replacements: [criminalAct.name, criminalAct.description, criminalAct.updated_by || null] }
        );
    return results.insertId;
    } catch (error) {
        console.error('Error in insertCriminalAct:', error);
        return null;
    }
};


const updateCriminalAct = async (id, criminalAct) => {
    try {
        const [results] = await sequelize.query(
        `UPDATE criminal_acts
        SET name = ?, description = ?, updated = NOW(), updated_by = ?
        WHERE id = ?`,
        { replacements: [criminalAct.name, criminalAct.description, criminalAct.updated_by || null, id] }
        );
    return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateCriminalAct:', error);
        return false;
    }
};


const deleteCriminalAct = async (id) => {
    try {
        const [results] = await sequelize.query('DELETE FROM criminal_acts WHERE id = ?', { replacements: [id] });
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteCriminalAct:', error);
        return false;
    }
};


module.exports = {
    getAllCriminalActs,
    getCriminalActsPaginated,
    getCriminalActByID,
    insertCriminalAct,
    updateCriminalAct,
    deleteCriminalAct,
};