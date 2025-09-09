const express = require('express');
const warehouseController = require('./../controllers/warehouse-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const warehouseRouter = express.Router();

warehouseRouter.get('/', warehouseController.getAllWarehousesPaginated);

warehouseRouter.route('/')
    .post(authMiddleware, warehouseController.insertWarehouse);

warehouseRouter.route('/:id')
    .get(warehouseController.getWarehouseByID)
    .put(authMiddleware, warehouseController.updateWarehouse)
    .delete(authMiddleware, warehouseController.deleteWarehouse);

module.exports = warehouseRouter;