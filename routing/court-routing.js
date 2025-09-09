const express = require('express');
const courtController = require('./../controllers/court-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const courtRouter = express.Router();

courtRouter.get('/', courtController.getAllCourtsPaginated);

courtRouter.route('/')
    .post(authMiddleware, courtController.insertCourt);

courtRouter.route('/:id')
    .get(courtController.getCourtByID)
    .put(authMiddleware, courtController.updateCourt)
    .delete(authMiddleware, courtController.deleteCourt);

module.exports = courtRouter;