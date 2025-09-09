const sequelize = require('./../common/db-config');

const getAllSubjectTypes = async () => {
    try {
        const [results] = await sequelize.query('SELECT * FROM subject_type');
        return results;
    } catch (error) {
        console.error('Error in getAllSubjectTypes:', error);
        return null;
    }
};

const getSubjectTypeByID = async (id) => {
    try {
        const [results] = await sequelize.query(
            'SELECT * FROM subject_type WHERE id = ?',
            { replacements: [id] }
        );
        return results[0];
    } catch (error) {
        console.error('Error in getSubjectTypeByID:', error);
        return null;
    }
};

const getSubjectTypesPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM subject_type'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(
            'SELECT * FROM subject_type ORDER BY created DESC LIMIT ? OFFSET ?',
            { replacements: [limit, offset] }
        );

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getSubjectTypesPaginated:', error);
        return null;
    }
};

const insertSubjectType = async (subjectType) => {
    try {
        const [results] = await sequelize.query(
            'INSERT INTO subject_type (name, description, created, updated, updated_by) VALUES (?, ?, NOW(), NOW(), ?)',
            { replacements: [subjectType.name, subjectType.description, subjectType.updatedBy] }
        );
        return results;
    } catch (error) {
        console.error('Error in insertSubjectType:', error);
        return null;
    }
};

const updateSubjectType = async (id, subjectType) => {
    try {
        await sequelize.query(
            'UPDATE subject_type SET name = ?, description = ?, updated = NOW(), updated_by = ? WHERE id = ?',
            { replacements: [subjectType.name, subjectType.description, subjectType.updatedBy, id] }
        );
        return true;
    } catch (error) {
        console.error('Error in updateSubjectType:', error);
        return null;
    }
};

const deleteSubjectType = async (id) => {
    try {
        await sequelize.query(
            'DELETE FROM subject_type WHERE id = ?',
            { replacements: [id] }
        );
        return true;
    } catch (error) {
        console.error('Error in deleteSubjectType:', error);
        return null;
    }
};

module.exports = {
    getAllSubjectTypes,
    getSubjectTypeByID,
    getSubjectTypesPaginated,
    insertSubjectType,
    updateSubjectType,
    deleteSubjectType
};