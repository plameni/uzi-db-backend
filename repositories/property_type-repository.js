const sequelize = require('./../common/db-config');

const getAllPropertyTypes = async () => {
    try {
        const [results, metadata] = await sequelize.query('SELECT * FROM property_type');
        return results;
    } catch (error) {
        return null;
    }
};

const getPropertyTypeByID = async (id) => {
    try {
        const [results, metadata] = await sequelize.query(
            'SELECT * FROM property_type WHERE id = ?',
            { replacements: [id] }
        );
        return results[0];
    } catch (error) {
        return null;
    }
};

const getPropertyTypesPaginated = async (limit, offset) => {
    try {
        const [countResult] = await sequelize.query(
            'SELECT COUNT(*) as total FROM property_type'
        );
        const totalCount = countResult[0].total;

        const [results] = await sequelize.query(
            'SELECT * FROM property_type ORDER BY created DESC LIMIT ? OFFSET ?',
            { replacements: [limit, offset] }
        );

        return {
            count: totalCount,
            rows: results
        };
    } catch (error) {
        console.error('Error in getPropertyTypesPaginated:', error);
        return null;
    }
};


const insertPropertyType = async (propertyType) => {
    try {
        const [results, metadata] = await sequelize.query(
            'INSERT INTO property_type (name, description, created, updated, updated_by) VALUES (?, ?, NOW(), NOW(),?)',
            { replacements: [propertyType.name, propertyType.description,propertyType.updatedBy ] }
        );
        return results;
    } catch (error) {
        return null;
    }
};

const updatePropertyType = async (id, propertyType) => {
    try {
        const [results, metadata] = await sequelize.query(
            'UPDATE property_type SET name = ?, description = ?, updated = NOW(), updated_by=? WHERE id = ?',
            { replacements: [propertyType.name, propertyType.description,propertyType.updatedBy ,id] }
        );
        return true;
    } catch (error) {
        return null;
    }
};

const deletePropertyType = async (id) => {
    try {
        const [results, metadata] = await sequelize.query(
            'DELETE FROM property_type WHERE id = ?',
            { replacements: [id] }
        );
        return true;
    } catch (error) {
        return null;
    }
};

module.exports = {
    getPropertyTypesPaginated,
    getAllPropertyTypes,
    getPropertyTypeByID,
    insertPropertyType,
    updatePropertyType,
    deletePropertyType
};
