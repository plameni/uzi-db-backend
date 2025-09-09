const warehouseRepository = require('./../repositories/warehouse-repository');

const getAllWarehouses = async (req, res) => {
    const results = await warehouseRepository.getAllWarehouses();
    res.send(results);
};

const getAllWarehousesPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await warehouseRepository.getWarehousesPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getWarehouseByID = async (req, res) => {
    const { id } = req.params;
    const result = await warehouseRepository.getWarehouseByID(id);
    res.send(result);
};

const insertWarehouse = async (req, res) => {
    try {
        const insertedId = await warehouseRepository.insertWarehouse(req.body);
        if (insertedId !== null) {
            res.status(201).send({ id: insertedId });
        } else {
            res.status(500).send({ error: 'Insert failed' });
        }
    } catch (error) {
        console.error('Error in insertWarehouse:', error);
        res.status(500).send({ error: error.message });
    }
};

const updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await warehouseRepository.updateWarehouse(id, req.body);
        if (success) {
            res.send({ message: 'Updated successfully' });
        } else {
            res.status(500).send({ error: 'Update failed' });
        }
    } catch (error) {
        console.error('Error in updateWarehouse:', error);
        res.status(500).send({ error: error.message });
    }
};

const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await warehouseRepository.deleteWarehouse(id);
        if (success) {
            res.send({ message: 'Deleted successfully' });
        } else {
            res.status(500).send({ error: 'Delete failed' });
        }
    } catch (error) {
        console.error('Error in deleteWarehouse:', error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllWarehousesPaginated,
    getAllWarehouses,
    getWarehouseByID,
    insertWarehouse,
    updateWarehouse,
    deleteWarehouse
};