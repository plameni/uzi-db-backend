const sequelize = require('./../common/db-config');

const getAllRoles = async () => {
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM role');
        return results;
    } catch (error) {
        return null;
    }
};

const getRoleByID = async (id) => {
    try {
        const [results, metadata] = await sequelize.query(
            'SELECT * FROM role WHERE id = ?',
            { replacements: [id] }
        );
        return results[0];
    } catch (error) {
        return null;
    }
};

const getRolesPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM role'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(
            'SELECT * FROM role ORDER BY created DESC LIMIT ? OFFSET ?',
            { replacements: [limit, offset] }
        );

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getRolesTypesPaginated:', error);
        return null;
    }
};


const insertRole = async (role) => {
    try {
        const [results, metadata] = await sequelize.query(
            'INSERT INTO role (name, description, created, updated, updated_by) VALUES (?, ?, NOW(), NOW(),?)',
            { replacements: [role.name, role.description,role.updatedBy ] }
        );
        return results;
    } catch (error) {
        return null;
    }
};

const updateRole = async (id, role) => {
    try {
        const [results, metadata] = await sequelize.query(
            'UPDATE role SET name = ?, description = ?, updated = NOW(), updated_by=? WHERE id = ?',
            { replacements: [role.name, role.description,role.updatedBy ,id] }
        );
        return true;
    } catch (error) {
        return null;
    }
};

const deleteRole = async (id) => {
    try {
        const [results, metadata] = await sequelize.query(
            'DELETE FROM role WHERE id = ?',
            { replacements: [id] }
        );
        return true;
    } catch (error) {
        return null;
    }
};

module.exports = {
    getRolesPaginated,
    getAllRoles,
    getRoleByID,
    insertRole,
    updateRole,
    deleteRole
};
