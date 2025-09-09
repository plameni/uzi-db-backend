const sequelize = require('./../common/db-config');

const getCountriesPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query('SELECT COUNT(*) as total FROM country');
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(`
            SELECT c.*, a.username as updated_by_name, a.id as userId 
            FROM country c 
            LEFT JOIN account a ON c.updated_by = a.id 
            ORDER BY c.created DESC 
            LIMIT ? OFFSET ? 
        `, { replacements: [limit, offset] });

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getCountriesPaginated:', error);
        throw error;
    }
};

const getCountryByID = async (id) => {
    try {
        const [results] = await sequelize.query(
           `
            SELECT c.*, a.username as updated_by_name, a.id as userId
            FROM country c
            LEFT JOIN account a ON c.updated_by = a.id
            WHERE c.id = ?
        `,
            { replacements: [id] }
        );
        return results[0];
    } catch (error) {
        console.error('Error in getCountryByID:', error);
        throw error;
    }
};

const insertCountry = async (country) => {
    try {
        const [results] = await sequelize.query(
            'INSERT INTO country (name, description, created, updated, updated_by) VALUES (?, ?, NOW(), NOW(), ?)',
            { replacements: [country.name, country.description, country.updated_by || null] }
        );
        return results.insertId;
    } catch (error) {
        console.error('Error in insertCountry:', error);
        return null;
    }
};

const updateCountry = async (id, country) => {
    try {
        const [results] = await sequelize.query(
            'UPDATE country SET name = ?, description = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [country.name, country.description, country.updated_by || null, id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateCountry:', error);
        return false;
    }
};

const deleteCountry = async (id) => {
    try {
        const [results] = await sequelize.query(
            'DELETE FROM country WHERE id = ?',
            { replacements: [id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteCountry:', error);
        return false;
    }
};

module.exports = {
    getCountriesPaginated,
    getCountryByID,
    insertCountry,
    updateCountry,
    deleteCountry
};
