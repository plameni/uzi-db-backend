const courtRepository = require('./../repositories/court-repository');

const getAllCourts = async (req, res) => {
    const results = await courtRepository.getAllCourts();
    res.send(results);
};

const getAllCourtsPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await courtRepository.getCourtsPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getCourtByID = async (req, res) => {
    const { id } = req.params;
    const result = await courtRepository.getCourtByID(id);
    res.send(result);
};

const insertCourt = async (req, res) => {
    try {
        const insertedId = await courtRepository.insertCourt(req.body);
        if (insertedId !== null) {
            res.status(201).send({ id: insertedId });
        } else {
            res.status(500).send({ error: 'Insert failed' });
        }
    } catch (error) {
        console.error('Error in insertCourt:', error);
        res.status(500).send({ error: error.message });
    }
};

const updateCourt = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await courtRepository.updateCourt(id, req.body);
        if (success) {
            res.send({ message: 'Updated successfully' });
        } else {
            res.status(500).send({ error: 'Update failed' });
        }
    } catch (error) {
        console.error('Error in updateCourt:', error);
        res.status(500).send({ error: error.message });
    }
};

const deleteCourt = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await courtRepository.deleteCourt(id);
        if (success) {
            res.send({ message: 'Deleted successfully' });
        } else {
            res.status(500).send({ error: 'Delete failed' });
        }
    } catch (error) {
        console.error('Error in deleteCourt:', error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllCourtsPaginated,
    getAllCourts,
    getCourtByID,
    insertCourt,
    updateCourt,
    deleteCourt
};