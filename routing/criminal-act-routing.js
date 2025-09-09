const express = require('express');
const criminalActController = require('./../controllers/criminal-act-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const criminalActRouter = express.Router();

// same pattern as streets: GET / -> paginated
criminalActRouter.get('/', criminalActController.getAllCriminalActsPaginated);

// optional: non-paginated list if you need it somewhere
criminalActRouter.get('/all', criminalActController.getAllCriminalActs);

criminalActRouter
  .route('/')
  .post(authMiddleware, criminalActController.insertCriminalAct);

criminalActRouter
  .route('/:id')
  .get(criminalActController.getCriminalActByID)
  .put(authMiddleware, criminalActController.updateCriminalAct)
  .delete(authMiddleware, criminalActController.deleteCriminalAct);

module.exports = criminalActRouter;