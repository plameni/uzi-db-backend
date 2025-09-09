const sequelize = require('./../common/db-config');

const getAllWarehouses = async () => {
    try {
        const [results] = await sequelize.query(`
            SELECT w.*, a.username as updated_by_name
            FROM warehouse w
            LEFT JOIN account a ON w.updated_by = a.id
        `);
        return results;
    } catch (error) {
        console.error('Error in getAllWarehouses:', error);
        return null;
    }
};

const getWarehousesPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM warehouse'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(`
            SELECT w.*, a.username as updated_by_name
            FROM warehouse w
            LEFT JOIN account a ON w.updated_by = a.id
            ORDER BY w.created DESC
            LIMIT ? OFFSET ?
        `, { replacements: [limit, offset] });

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getWarehousesPaginated:', error);
        return null;
    }
};

const getWarehouseByID = async (id) => {
    try {
        const [results] = await sequelize.query(`
            SELECT w.*, a.username as updated_by_name
            FROM warehouse w
            LEFT JOIN account a ON w.updated_by = a.id
            WHERE w.id = ?
        `, { replacements: [id] });
        return results[0];
    } catch (error) {
        console.error('Error in getWarehouseByID:', error);
        return null;
    }
};

const insertWarehouse = async (warehouse) => {
    try {
        const [results] = await sequelize.query(
            'INSERT INTO warehouse (name, description, created, updated, updated_by) VALUES (?, ?, NOW(), NOW(), ?)',
            { replacements: [warehouse.name, warehouse.description, warehouse.updated_by] }
        );
        return results.insertId;
    } catch (error) {
        console.error('Error in insertWarehouse:', error);
        return null;
    }
};

const updateWarehouse = async (id, warehouse) => {
    try {
        const [results] = await sequelize.query(
            'UPDATE warehouse SET name = ?, description = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [warehouse.name, warehouse.description, warehouse.updated_by, id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in updateWarehouse:', error);
        return false;
    }
};

const deleteWarehouse = async (id) => {
    try {
        const [results] = await sequelize.query(
            'DELETE FROM warehouse WHERE id = ?',
            { replacements: [id] }
        );
        return results.affectedRows > 0;
    } catch (error) {
        console.error('Error in deleteWarehouse:', error);
        return false;
    }
};

module.exports = {
    getAllWarehouses,
    getWarehousesPaginated,
    getWarehouseByID,
    insertWarehouse,
    updateWarehouse,
    deleteWarehouse
};