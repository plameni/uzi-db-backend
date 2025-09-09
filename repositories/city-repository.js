const sequelize = require('./../common/db-config');

const getAllCities = async () => {
    try {
        const [results] = await sequelize.query(`
            SELECT c.*, co.name as country_name, a.username as updated_by_name
            FROM city c
            JOIN country co ON c.country_id = co.id
            LEFT JOIN account a ON c.updated_by = a.id
        `);
        return results;
    } catch (error) {
        console.error('Error in getAllCities:', error);
        return null;
    }
};

const getCitiesPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM city'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(`
            SELECT c.*, co.name as country_name, a.username as updated_by_name, a.id as userId
            FROM city c
            JOIN country co ON c.country_id = co.id
            LEFT JOIN account a ON c.updated_by = a.id
            ORDER BY c.created DESC
            LIMIT ? OFFSET ?
        `, { replacements: [limit, offset] });

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getCitiesPaginated:', error);
        return null;
    }
};

const getCityByID = async (id) => {
    try {
        const [results] = await sequelize.query(`
            SELECT c.*, co.name as country_name, a.username as updated_by_name, a.id as userId
            FROM city c
            JOIN country co ON c.country_id = co.id
            LEFT JOIN account a ON c.updated_by = a.id
            WHERE c.id = ?
        `, { replacements: [id] });
        return results[0];
    } catch (error) {
        console.error('Error in getCityByID:', error);
        return null;
    }
};

const insertCity = async (city, userId) => {
    try {
        console.log("dnwkfwkfkwjfwjkfwdjhwhj",userId)
        const [results] = await sequelize.query(
            'INSERT INTO city (country_id, name, description, created, updated, updated_by) VALUES (?, ?, ?, NOW(), NOW(), ?)',
            { replacements: [city.country_id, city.name, city.description, city.updated_by] }
        );
        return results.insertId;
    } catch (error) {
        console.error('Error in insertCity:', error);
        return null;
    }
};

const updateCity = async (id, city, userId) => {
    try {
        const [results] = await sequelize.query(
            'UPDATE city SET country_id = ?, name = ?, description = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [city.country_id, city.name, city.description, city.updated_by, id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateCity:', error);
        return false;
    }
};

const deleteCity = async (id) => {
    try {
        const [results] = await sequelize.query(
            'DELETE FROM city WHERE id = ?',
            { replacements: [id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteCity:', error);
        return false;
    }
};

const getCountriesForDropdown = async () => {
    try {
        const [results] = await sequelize.query(
            'SELECT id, name FROM country ORDER BY name'
        );
        return results;
    } catch (error) {
        console.error('Error in getCountriesForDropdown:', error);
        return null;
    }
};

module.exports = {
    getAllCities,
    getCitiesPaginated,
    getCityByID,
    insertCity,
    updateCity,
    deleteCity,
    getCountriesForDropdown
};