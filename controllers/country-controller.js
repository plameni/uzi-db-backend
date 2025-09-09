const countryRepository = require('./../repositories/country-repository');

const getAllCountriesPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await countryRepository.getCountriesPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        console.error('Error in getAllCountriesPaginated:', error);
        res.status(500).send({ error: error.message });
    }
};

const getCountryByID = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await countryRepository.getCountryByID(id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const insertCountry = async (req, res) => {
    try {
        const insertedId = await countryRepository.insertCountry(req.body);
        if (insertedId !== null) {
            res.status(201).send({ id: insertedId });
        } else {
            res.status(500).send({ error: 'Insert failed' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateCountry = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await countryRepository.updateCountry(id, req.body);
        if (success) {
            res.send({ message: 'Updated successfully' });
        } else {
            res.status(500).send({ error: 'Update failed' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deleteCountry = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await countryRepository.deleteCountry(id);
        if (success) {
            res.send({ message: 'Deleted successfully' });
        } else {
            res.status(500).send({ error: 'Delete failed' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllCountriesPaginated,
    getCountryByID,
    insertCountry,
    updateCountry,
    deleteCountry
};
