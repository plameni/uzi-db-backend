const express = require('express');
const subjectTypeController = require('./../controllers/subject-type-controller');

const subjectTypeRouter = express.Router();

subjectTypeRouter.route('/')
    .get(subjectTypeController.getSubjectTypesPaginated)
    .post(subjectTypeController.insertSubjectType);

subjectTypeRouter.route('/:id')
    .get(subjectTypeController.getSubjectTypeByID)
    .put(subjectTypeController.updateSubjectType)
    .delete(subjectTypeController.deleteSubjectType);

module.exports = subjectTypeRouter;