const sequelize = require('./../common/db-config');

const getAllMovablePropertyTypes = async () => {
    try {
        const [results] = await sequelize.query(`
            SELECT mpt.*, a.username as updated_by_name
            FROM movable_property_type mpt
            LEFT JOIN account a ON mpt.updated_by = a.id
        `);
        return results;
    } catch (error) {
        console.error('Error in getAllMovablePropertyTypes:', error);
        return null;
    }
};

const getMovablePropertyTypesPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM movable_property_type'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(`
            SELECT mpt.*, a.username as updated_by_name
            FROM movable_property_type mpt
            LEFT JOIN account a ON mpt.updated_by = a.id
            ORDER BY mpt.created DESC
            LIMIT ? OFFSET ?
        `, { replacements: [limit, offset] });

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getMovablePropertyTypesPaginated:', error);
        return null;
    }
};

const getMovablePropertyTypeByID = async (id) => {
    try {
        const [results] = await sequelize.query(`
            SELECT mpt.*, a.username as updated_by_name
            FROM movable_property_type mpt
            LEFT JOIN account a ON mpt.updated_by = a.id
            WHERE mpt.id = ?
        `, { replacements: [id] });
        return results[0];
    } catch (error) {
        console.error('Error in getMovablePropertyTypeByID:', error);
        return null;
    }
};

const insertMovablePropertyType = async (movablePropertyType) => {
    try {
        const [results] = await sequelize.query(
            'INSERT INTO movable_property_type (name, description, created, updated, updated_by) VALUES (?, ?, NOW(), NOW(), ?)',
            { replacements: [movablePropertyType.name, movablePropertyType.description, movablePropertyType.updated_by] }
        );
        return results.insertId;
    } catch (error) {
        console.error('Error in insertMovablePropertyType:', error);
        return null;
    }
};

const updateMovablePropertyType = async (id, movablePropertyType) => {
    try {
        const [results] = await sequelize.query(
            'UPDATE movable_property_type SET name = ?, description = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [movablePropertyType.name, movablePropertyType.description, movablePropertyType.updated_by, id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateMovablePropertyType:', error);
        return false;
    }
};

const deleteMovablePropertyType = async (id) => {
    try {
        const [results] = await sequelize.query(
            'DELETE FROM movable_property_type WHERE id = ?',
            { replacements: [id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteMovablePropertyType:', error);
        return false;
    }
};

module.exports = {
    getAllMovablePropertyTypes,
    getMovablePropertyTypesPaginated,
    getMovablePropertyTypeByID,
    insertMovablePropertyType,
    updateMovablePropertyType,
    deleteMovablePropertyType
};