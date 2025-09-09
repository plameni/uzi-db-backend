const sequelize = require('./../common/db-config');

const getAllStreets = async () => {
    try {
        const [results] = await sequelize.query(`
            SELECT s.*, c.name as city_name, a.username as updated_by_name
            FROM street s
            JOIN city c ON s.city_id = c.id
            LEFT JOIN account a ON s.updated_by = a.id
        `);
        return results;
    } catch (error) {
        console.error('Error in getAllStreets:', error);
        return null;
    }
};

const getStreetsPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM street'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(`
            SELECT s.*, c.name as city_name, a.username as updated_by_name
            FROM street s
            JOIN city c ON s.city_id = c.id
            LEFT JOIN account a ON s.updated_by = a.id
            ORDER BY s.created DESC
            LIMIT ? OFFSET ?
        `, { replacements: [limit, offset] });

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getStreetsPaginated:', error);
        return null;
    }
};

const getStreetByID = async (id) => {
    try {
        const [results] = await sequelize.query(`
            SELECT s.*, c.name as city_name, a.username as updated_by_name
            FROM street s
            JOIN city c ON s.city_id = c.id
            LEFT JOIN account a ON s.updated_by = a.id
            WHERE s.id = ?
        `, { replacements: [id] });
        return results[0];
    } catch (error) {
        console.error('Error in getStreetByID:', error);
        return null;
    }
};

const insertStreet = async (street) => {
    try {
        const [results] = await sequelize.query(
            'INSERT INTO street (city_id, name, description, created, updated, updated_by) VALUES (?, ?, ?, NOW(), NOW(), ?)',
            { replacements: [street.city_id, street.name, street.description, street.updated_by] }
        );
        return results.insertId;
    } catch (error) {
        console.error('Error in insertStreet:', error);
        return null;
    }
};

const updateStreet = async (id, street) => {
    try {
        const [results] = await sequelize.query(
            'UPDATE street SET city_id = ?, name = ?, description = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [street.city_id, street.name, street.description, street.updated_by, id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateStreet:', error);
        return false;
    }
};

const deleteStreet = async (id) => {
    try {
        const [results] = await sequelize.query(
            'DELETE FROM street WHERE id = ?',
            { replacements: [id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteStreet:', error);
        return false;
    }
};

const getCitiesForDropdown = async () => {
    try {
        const [results] = await sequelize.query(
            'SELECT id, name FROM city ORDER BY name'
        );
        return results;
    } catch (error) {
        console.error('Error in getCitiesForDropdown:', error);
        return null;
    }
};

module.exports = {
    getAllStreets,
    getStreetsPaginated,
    getStreetByID,
    insertStreet,
    updateStreet,
    deleteStreet,
    getCitiesForDropdown
};