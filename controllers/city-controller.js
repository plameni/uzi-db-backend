const cityRepository = require('./../repositories/city-repository');

const getAllCities = async (req, res) => {
    const results = await cityRepository.getAllCities();
    res.send(results);
};

const getAllCitiesPaginated = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const offset = (page - 1) * perPage;

    try {
        const { count, rows } = await cityRepository.getCitiesPaginated(perPage, offset);
        res.send({
            data: rows,
            totalCount: count
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getCityByID = async (req, res) => {
    const { id } = req.params;
    const result = await cityRepository.getCityByID(id);
    res.send(result);
};

const insertCity = async (req, res) => {
    // Get userId from token (assuming it's stored in req.user by authentication middleware)
    const userId = req.user.id;
    const insertedId = await cityRepository.insertCity(req.body, userId);
    if (insertedId !== null) {
        res.status(201).send({ id: insertedId });
    } else {
        res.status(500).send({ error: 'Insert failed' });
    }
};

const updateCity = async (req, res) => {
    const { id } = req.params;
    // Get userId from token
    const userId = req.user.id;
    const success = await cityRepository.updateCity(id, req.body, userId);
    if (success) {
        res.send({ message: 'Updated successfully' });
    } else {
        res.status(500).send({ error: 'Update failed' });
    }
};

const deleteCity = async (req, res) => {
    const { id } = req.params;
    const success = await cityRepository.deleteCity(id);
    if (success) {
        res.send({ message: 'Deleted successfully' });
    } else {
        res.status(500).send({ error: 'Delete failed' });
    }
};

const getCountriesForDropdown = async (req, res) => {
    const results = await cityRepository.getCountriesForDropdown();
    res.send(results);
};



module.exports = {
    getAllCitiesPaginated,
    getAllCities,
    getCityByID,
    insertCity,
    updateCity,
    deleteCity,
    getCountriesForDropdown
};