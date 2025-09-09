const movablePropertyTypeRepository = require('./../repositories/movable-property-type-repository');

const getAllMovablePropertyTypes = async (req, res) => {
    const results = await movablePropertyTypeRepository.getAllMovablePropertyTypes();
    res.send(results);
};

const getAllMovablePropertyTypesPaginated = async (req, res) => {
    console.log("djksafhjksbfhjawbfhjwbfhjwab")
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await movablePropertyTypeRepository.getMovablePropertyTypesPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getMovablePropertyTypeByID = async (req, res) => {
    const { id } = req.params;
    const result = await movablePropertyTypeRepository.getMovablePropertyTypeByID(id);
    res.send(result);
};

const insertMovablePropertyType = async (req, res) => {
    try {
        const insertedId = await movablePropertyTypeRepository.insertMovablePropertyType(req.body);
        if (insertedId !== null) {
            res.status(201).send({ id: insertedId });
        } else {
            res.status(500).send({ error: 'Insert failed' });
        }
    } catch (error) {
        console.error('Error in insertMovablePropertyType:', error);
        res.status(500).send({ error: error.message });
    }
};

const updateMovablePropertyType = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await movablePropertyTypeRepository.updateMovablePropertyType(id, req.body);
        if (success) {
            res.send({ message: 'Updated successfully' });
        } else {
            res.status(500).send({ error: 'Update failed' });
        }
    } catch (error) {
        console.error('Error in updateMovablePropertyType:', error);
        res.status(500).send({ error: error.message });
    }
};

const deleteMovablePropertyType = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await movablePropertyTypeRepository.deleteMovablePropertyType(id);
        if (success) {
            res.send({ message: 'Deleted successfully' });
        } else {
            res.status(500).send({ error: 'Delete failed' });
        }
    } catch (error) {
        console.error('Error in deleteMovablePropertyType:', error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllMovablePropertyTypesPaginated,
    getAllMovablePropertyTypes,
    getMovablePropertyTypeByID,
    insertMovablePropertyType,
    updateMovablePropertyType,
    deleteMovablePropertyType
};