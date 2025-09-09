const express = require('express');
const movablePropertyTypeController = require('./../controllers/movable-property-type-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const movablePropertyTypeRouter = express.Router();

movablePropertyTypeRouter.get('/', movablePropertyTypeController.getAllMovablePropertyTypesPaginated);

movablePropertyTypeRouter.route('/')
    .post(authMiddleware, movablePropertyTypeController.insertMovablePropertyType);

movablePropertyTypeRouter.route('/:id')
    .get(movablePropertyTypeController.getMovablePropertyTypeByID)
    .put(authMiddleware, movablePropertyTypeController.updateMovablePropertyType)
    .delete(authMiddleware, movablePropertyTypeController.deleteMovablePropertyType);

module.exports = movablePropertyTypeRouter;