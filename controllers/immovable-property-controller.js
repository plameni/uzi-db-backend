const repository = require('./../repositories/immovable-property-repository');

const getAllImmovableProperties = async (req, res) => {
    const results = await repository.getAllImmovableProperties();
    res.send(results);
};

const getAllImmovablePropertiesPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await repository.getImmovablePropertiesPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getImmovablePropertyByID = async (req, res) => {
    const { id } = req.params;
    const result = await repository.getImmovablePropertyByID(id);
    res.send(result);
};

const insertImmovableProperty = async (req, res) => {
    try {
        const insertedId = await repository.insertImmovableProperty(req.body);
        if (insertedId !== null) {
            res.status(201).send({ id: insertedId });
        } else {
            res.status(500).send({ error: 'Insert failed' });
        }
    } catch (error) {
        console.error('Error in insertImmovableProperty:', error);
        res.status(500).send({ error: error.message });
    }
};

const updateImmovableProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await repository.updateImmovableProperty(id, req.body);
        if (success) {
            res.send({ message: 'Updated successfully' });
        } else {
            res.status(500).send({ error: 'Update failed' });
        }
    } catch (error) {
        console.error('Error in updateImmovableProperty:', error);
        res.status(500).send({ error: error.message });
    }
};

const deleteImmovableProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await repository.deleteImmovableProperty(id);
        if (success) {
            res.send({ message: 'Deleted successfully' });
        } else {
            res.status(500).send({ error: 'Delete failed' });
        }
    } catch (error) {
        console.error('Error in deleteImmovableProperty:', error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllImmovablePropertiesPaginated,
    getAllImmovableProperties,
    getImmovablePropertyByID,
    insertImmovableProperty,
    updateImmovableProperty,
    deleteImmovableProperty
};
