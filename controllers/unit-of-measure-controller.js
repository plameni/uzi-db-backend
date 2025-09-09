const unitOfMeasureRepository = require('./../repositories/unit-of-measure-repository');

const getAllUnitsOfMeasure = async (req, res) => {
    const results = await unitOfMeasureRepository.getAllUnitsOfMeasure();
    res.send(results);
};

const getAllUnitsOfMeasurePaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await unitOfMeasureRepository.getUnitsOfMeasurePaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getUnitOfMeasureByID = async (req, res) => {
    const { id } = req.params;
    const result = await unitOfMeasureRepository.getUnitOfMeasureByID(id);
    res.send(result);
};

const insertUnitOfMeasure = async (req, res) => {
    try {
        const insertedId = await unitOfMeasureRepository.insertUnitOfMeasure(req.body);
        if (insertedId !== null) {
            res.status(201).send({ id: insertedId });
        } else {
            res.status(500).send({ error: 'Insert failed' });
        }
    } catch (error) {
        console.error('Error in insertUnitOfMeasure:', error);
        res.status(500).send({ error: error.message });
    }
};

const updateUnitOfMeasure = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await unitOfMeasureRepository.updateUnitOfMeasure(id, req.body);
        if (success) {
            res.send({ message: 'Updated successfully' });
        } else {
            res.status(500).send({ error: 'Update failed' });
        }
    } catch (error) {
        console.error('Error in updateUnitOfMeasure:', error);
        res.status(500).send({ error: error.message });
    }
};

const deleteUnitOfMeasure = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await unitOfMeasureRepository.deleteUnitOfMeasure(id);
        if (success) {
            res.send({ message: 'Deleted successfully' });
        } else {
            res.status(500).send({ error: 'Delete failed' });
        }
    } catch (error) {
        console.error('Error in deleteUnitOfMeasure:', error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllUnitsOfMeasurePaginated,
    getAllUnitsOfMeasure,
    getUnitOfMeasureByID,
    insertUnitOfMeasure,
    updateUnitOfMeasure,
    deleteUnitOfMeasure
};