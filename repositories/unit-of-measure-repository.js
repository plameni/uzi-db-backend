const sequelize = require('./../common/db-config');

const getAllUnitsOfMeasure = async () => {
    try {
        const [results] = await sequelize.query(`
            SELECT uom.*, a.username as updated_by_name
            FROM units_of_measure uom
            LEFT JOIN account a ON uom.updated_by = a.id
        `);
        return results;
    } catch (error) {
        console.error('Error in getAllUnitsOfMeasure:', error);
        return null;
    }
};

const getUnitsOfMeasurePaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM units_of_measure'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(`
            SELECT uom.*, a.username as updated_by_name
            FROM units_of_measure uom
            LEFT JOIN account a ON uom.updated_by = a.id
            ORDER BY uom.created DESC
            LIMIT ? OFFSET ?
        `, { replacements: [limit, offset] });

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getUnitsOfMeasurePaginated:', error);
        return null;
    }
};

const getUnitOfMeasureByID = async (id) => {
    try {
        const [results] = await sequelize.query(`
            SELECT uom.*, a.username as updated_by_name
            FROM units_of_measure uom
            LEFT JOIN account a ON uom.updated_by = a.id
            WHERE uom.id = ?
        `, { replacements: [id] });
        return results[0];
    } catch (error) {
        console.error('Error in getUnitOfMeasureByID:', error);
        return null;
    }
};

const insertUnitOfMeasure = async (unitOfMeasure) => {
    try {
        const [results] = await sequelize.query(
            'INSERT INTO units_of_measure (name, description, multiplication_factor, created, updated, updated_by) VALUES (?, ?, ?, NOW(), NOW(), ?)',
            { replacements: [unitOfMeasure.name, unitOfMeasure.description, unitOfMeasure.multiplication_factor, unitOfMeasure.updated_by] }
        );
        return results.insertId;
    } catch (error) {
        console.error('Error in insertUnitOfMeasure:', error);
        return null;
    }
};

const updateUnitOfMeasure = async (id, unitOfMeasure) => {
    try {
        const [results] = await sequelize.query(
            'UPDATE units_of_measure SET name = ?, description = ?, multiplication_factor = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [unitOfMeasure.name, unitOfMeasure.description, unitOfMeasure.multiplication_factor, unitOfMeasure.updated_by, id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateUnitOfMeasure:', error);
        return false;
    }
};

const deleteUnitOfMeasure = async (id) => {
    try {
        const [results] = await sequelize.query(
            'DELETE FROM units_of_measure WHERE id = ?',
            { replacements: [id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteUnitOfMeasure:', error);
        return false;
    }
};

module.exports = {
    getAllUnitsOfMeasure,
    getUnitsOfMeasurePaginated,
    getUnitOfMeasureByID,
    insertUnitOfMeasure,
    updateUnitOfMeasure,
    deleteUnitOfMeasure
};