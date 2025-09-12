const express = require('express');
const subjectController = require('./../controllers/subject-controller');

const upload = require('./../middleware/upload-middleware');
const subjectRouter = express.Router();

subjectRouter.route('/')
  .get(subjectController.getSubjectsPaginated)
  .post(upload.single('pdfFile'), subjectController.insertSubject);

subjectRouter.get('/search', subjectController.searchSubjects);

subjectRouter.route('/:id')
  .get(subjectController.getSubjectByID)
  .put(subjectController.updateSubject)
  .delete(subjectController.deleteSubject);

module.exports = subjectRouter;