const express = require('express');
const countryController = require('./../controllers/country-controller');

const countryRouter = express.Router();

countryRouter.get('/', countryController.getAllCountriesPaginated);

countryRouter.route('/')
    .post(countryController.insertCountry);

countryRouter.route('/:id')
    .get(countryController.getCountryByID)
    .put(countryController.updateCountry)
    .delete(countryController.deleteCountry);

module.exports = countryRouter;
