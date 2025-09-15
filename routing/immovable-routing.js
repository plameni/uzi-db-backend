const express = require('express');
const immovableController = require('./../controllers/immovable-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const immovableRouter = express.Router();

// GET /immovable -> paginated
immovableRouter.get('/', immovableController.getAllImmovablesPaginated);

// GET /immovable/all -> full list
immovableRouter.get('/all', immovableController.getAllImmovables);

immovableRouter
  .route('/')
  .post(authMiddleware, immovableController.insertImmovable);

immovableRouter
  .route('/:id')
  .get(immovableController.getImmovableByID)
  .put(authMiddleware, immovableController.updateImmovable)
  .delete(authMiddleware, immovableController.deleteImmovable);

immovableRouter
  .route('/subj/:id')
  .get(immovableController.getImmovableBySubjectID)

module.exports = immovableRouter;
