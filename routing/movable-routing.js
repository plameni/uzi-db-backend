const express = require('express');
const movableController = require('./../controllers/movable-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const movableRouter = express.Router();

// GET /movable -> paginated
movableRouter.get('/', movableController.getAllMovablesPaginated);

// GET /movable/all -> full list
movableRouter.get('/all', movableController.getAllMovables);

movableRouter
  .route('/')
  .post(authMiddleware, movableController.insertMovable);

movableRouter
  .route('/:id')
  .get(movableController.getMovableByID)
  .put(authMiddleware, movableController.updateMovable)
  .delete(authMiddleware, movableController.deleteMovable);

movableRouter
  .route('/subj/:id')
  .get(movableController.getMovableBySubjectID)


module.exports = movableRouter;
