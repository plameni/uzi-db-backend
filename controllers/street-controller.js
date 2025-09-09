const streetRepository = require('./../repositories/street-repository');

const getAllStreets = async (req, res) => {
    const results = await streetRepository.getAllStreets();
    res.send(results);
};

const getAllStreetsPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await streetRepository.getStreetsPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getStreetByID = async (req, res) => {
    const { id } = req.params;
    const result = await streetRepository.getStreetByID(id);
    res.send(result);
};

const insertStreet = async (req, res) => {
    try {
        const insertedId = await streetRepository.insertStreet(req.body);
        if (insertedId !== null) {
            res.status(201).send({ id: insertedId });
        } else {
            res.status(500).send({ error: 'Insert failed' });
        }
    } catch (error) {
        console.error('Error in insertStreet:', error);
        res.status(500).send({ error: error.message });
    }
};

const updateStreet = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await streetRepository.updateStreet(id, req.body);
        if (success) {
            res.send({ message: 'Updated successfully' });
        } else {
            res.status(500).send({ error: 'Update failed' });
        }
    } catch (error) {
        console.error('Error in updateStreet:', error);
        res.status(500).send({ error: error.message });
    }
};

const deleteStreet = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await streetRepository.deleteStreet(id);
        if (success) {
            res.send({ message: 'Deleted successfully' });
        } else {
            res.status(500).send({ error: 'Delete failed' });
        }
    } catch (error) {
        console.error('Error in deleteStreet:', error);
        res.status(500).send({ error: error.message });
    }
};

const getCitiesForDropdown = async (req, res) => {
    const results = await streetRepository.getCitiesForDropdown();
    res.send(results);
};

module.exports = {
    getAllStreetsPaginated,
    getAllStreets,
    getStreetByID,
    insertStreet,
    updateStreet,
    deleteStreet,
    getCitiesForDropdown
};