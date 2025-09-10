const express = require('express');
const accountController = require('./../controllers/acc-controller');

const accountRouter = express.Router();

accountRouter.route('/')
  .get(accountController.getAccountsPaginated)
  .post(accountController.insertAccount);

accountRouter.route('/:id')
  .get(accountController.getAccountByID)
  .put(accountController.updateAccount)
  .delete(accountController.deleteAccount);

// dodatne rute
accountRouter.put('/:id/activate', accountController.activateAccount);
accountRouter.put('/:id/deactivate', accountController.deactivateAccount);
accountRouter.get('/:id/is-active', accountController.isAccountActive);
accountRouter.get('/active/all', accountController.getActiveAccounts);
accountRouter.get('/:id/is-super-admin', accountController.isSuperAdmin);

module.exports = accountRouter;