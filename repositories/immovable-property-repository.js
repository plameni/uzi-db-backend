const sequelize = require('./../common/db-config');

const getAllImmovableProperties = async () => {
    try {
        const [results] = await sequelize.query(`
            SELECT ipt.*, a.username as updated_by_name
            FROM immovable_property_type ipt
            LEFT JOIN account a ON ipt.updated_by = a.id
        `);
        return results;
    } catch (error) {
        console.error('Error in getAllImmovableProperties:', error);
        return null;
    }
};

const getImmovablePropertiesPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM immovable_property_type'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(`
            SELECT ipt.*, a.username as updated_by_name
            FROM immovable_property_type ipt
            LEFT JOIN account a ON ipt.updated_by = a.id
            ORDER BY ipt.created DESC
            LIMIT ? OFFSET ?
        `, { replacements: [limit, offset] });

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getImmovablePropertiesPaginated:', error);
        return null;
    }
};

const getImmovablePropertyByID = async (id) => {
    try {
        const [results] = await sequelize.query(`
            SELECT ipt.*, a.username as updated_by_name
            FROM immovable_property_type ipt
            LEFT JOIN account a ON ipt.updated_by = a.id
            WHERE ipt.id = ?
        `, { replacements: [id] });
        return results[0];
    } catch (error) {
        console.error('Error in getImmovablePropertyByID:', error);
        return null;
    }
};

const insertImmovableProperty = async (property) => {
    try {
        const [results] = await sequelize.query(
            'INSERT INTO immovable_property_type (name, description, created, updated, updated_by) VALUES (?, ?, NOW(), NOW(), ?)',
            { replacements: [property.name, property.description, property.updated_by] }
        );
        return results.insertId;
    } catch (error) {
        console.error('Error in insertImmovableProperty:', error);
        return null;
    }
};

const updateImmovableProperty = async (id, property) => {
    try {
        const [results] = await sequelize.query(
            'UPDATE immovable_property_type SET name = ?, description = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [property.name, property.description, property.updated_by, id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateImmovableProperty:', error);
        return false;
    }
};

const deleteImmovableProperty = async (id) => {
    try {
        const [results] = await sequelize.query(
            'DELETE FROM immovable_property_type WHERE id = ?',
            { replacements: [id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteImmovableProperty:', error);
        return false;
    }
};

module.exports = {
    getAllImmovableProperties,
    getImmovablePropertiesPaginated,
    getImmovablePropertyByID,
    insertImmovableProperty,
    updateImmovableProperty,
    deleteImmovableProperty
};
