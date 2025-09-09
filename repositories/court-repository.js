const sequelize = require('./../common/db-config');

const getAllCourts = async () => {
    try {
        const [results] = await sequelize.query(`
            SELECT c.*, a.username as updated_by_name
            FROM courts c
            LEFT JOIN account a ON c.updated_by = a.id
        `);
        return results;
    } catch (error) {
        console.error('Error in getAllCourts:', error);
        return null;
    }
};

const getCourtsPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM courts'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(`
            SELECT c.*, a.username as updated_by_name
            FROM courts c
            LEFT JOIN account a ON c.updated_by = a.id
            ORDER BY c.created DESC
            LIMIT ? OFFSET ?
        `, { replacements: [limit, offset] });

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getCourtsPaginated:', error);
        return null;
    }
};

const getCourtByID = async (id) => {
    try {
        const [results] = await sequelize.query(`
            SELECT c.*, a.username as updated_by_name
            FROM courts c
            LEFT JOIN account a ON c.updated_by = a.id
            WHERE c.id = ?
        `, { replacements: [id] });
        return results[0];
    } catch (error) {
        console.error('Error in getCourtByID:', error);
        return null;
    }
};

const insertCourt = async (court) => {
    try {
        const [results] = await sequelize.query(
            'INSERT INTO courts (name, description, created, updated, updated_by) VALUES (?, ?, NOW(), NOW(), ?)',
            { replacements: [court.name, court.description, court.updated_by] }
        );
        return results.insertId;
    } catch (error) {
        console.error('Error in insertCourt:', error);
        return null;
    }
};

const updateCourt = async (id, court) => {
    try {
        const [results] = await sequelize.query(
            'UPDATE courts SET name = ?, description = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [court.name, court.description, court.updated_by, id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateCourt:', error);
        return false;
    }
};

const deleteCourt = async (id) => {
    try {
        const [results] = await sequelize.query(
            'DELETE FROM courts WHERE id = ?',
            { replacements: [id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteCourt:', error);
        return false;
    }
};

module.exports = {
    getAllCourts,
    getCourtsPaginated,
    getCourtByID,
    insertCourt,
    updateCourt,
    deleteCourt
};