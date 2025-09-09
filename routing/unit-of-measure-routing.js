const express = require('express');
const unitOfMeasureController = require('./../controllers/unit-of-measure-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const unitOfMeasureRouter = express.Router();

unitOfMeasureRouter.get('/', unitOfMeasureController.getAllUnitsOfMeasurePaginated);

unitOfMeasureRouter.route('/')
    .post(authMiddleware, unitOfMeasureController.insertUnitOfMeasure);

unitOfMeasureRouter.route('/:id')
    .get(unitOfMeasureController.getUnitOfMeasureByID)
    .put(authMiddleware, unitOfMeasureController.updateUnitOfMeasure)
    .delete(authMiddleware, unitOfMeasureController.deleteUnitOfMeasure);

module.exports = unitOfMeasureRouter;