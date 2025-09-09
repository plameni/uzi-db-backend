const express = require('express');
const cityController = require('./../controllers/city-controller');
const authMiddleware = require('./../middleware/auth-middleware'); // Assuming you have authentication middleware

const cityRouter = express.Router();



cityRouter.get('/', cityController.getAllCitiesPaginated);
cityRouter.get('/all', cityController.getAllCities);
cityRouter.get('/countries', cityController.getCountriesForDropdown);


cityRouter.route('/')
    .post(authMiddleware, cityController.insertCity);

cityRouter.route('/:id')
    .get(cityController.getCityByID)
    .put(authMiddleware, cityController.updateCity)
    .delete(authMiddleware, cityController.deleteCity);
    

module.exports = cityRouter;