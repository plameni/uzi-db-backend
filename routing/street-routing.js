const express = require('express');
const streetController = require('./../controllers/street-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const streetRouter = express.Router();

streetRouter.get('/', streetController.getAllStreetsPaginated);
streetRouter.get('/cities', streetController.getCitiesForDropdown);

streetRouter.route('/')
    .post(authMiddleware, streetController.insertStreet);

streetRouter.route('/:id')
    .get(streetController.getStreetByID)
    .put(authMiddleware, streetController.updateStreet)
    .delete(authMiddleware, streetController.deleteStreet);

module.exports = streetRouter;