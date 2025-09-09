const propertyTypeRepository = require('./../repositories/property_type-repository');

const getAllPropertyTypes = async (req, res) => {
    const results = await propertyTypeRepository.getAllPropertyTypes();
    res.send(results);
};

const getPropertyTypeByID = async (req, res) => {
    const { id } = req.params;
    const result = await propertyTypeRepository.getPropertyTypeByID(id);
    res.send(result);
};

const getPropertyTypesPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await propertyTypeRepository.getPropertyTypesPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


const insertPropertyType = async (req, res) => {
    const insertedId = await propertyTypeRepository.insertPropertyType(req.body);
    if (insertedId !== null) {
        res.status(201).send({ id: insertedId });
    } else {
        res.status(500).send({ error: 'Insert failed' });
    }
};

const updatePropertyType = async (req, res) => {
    const { id } = req.params;
    const success = await propertyTypeRepository.updatePropertyType(id, req.body);
    if (success) {
        res.send({ message: 'Updated successfully' });
    } else {
        res.status(500).send({ error: 'Update failed' });
    }
};

const deletePropertyType = async (req, res) => {
    const { id } = req.params;
    const success = await propertyTypeRepository.deletePropertyType(id);
    if (success) {
        res.send({ message: 'Deleted successfully' });
    } else {
        res.status(500).send({ error: 'Delete failed' });
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
