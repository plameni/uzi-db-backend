const express = require('express');
const entityController = require('./../controllers/entity-controller');

const entityRouter = express.Router();

entityRouter.route('/')
  .get(entityController.getEntitiesPaginated)
  .post(entityController.insertEntity);

entityRouter.route('/:id')
  .get(entityController.getEntityByID)
  .put(entityController.updateEntity)
  .delete(entityController.deleteEntity);

entityRouter.get('/subject/:subjectId', entityController.getEntitiesBySubjectID);

module.exports = entityRouter;