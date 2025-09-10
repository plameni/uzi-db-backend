const express = require('express'); 
const roleController = require('./../controllers/role-controller');

const roleRouter = express.Router(); 

roleRouter.route('/')
                     .get(roleController.getAllRoles)
                     .post(roleController.insertRole);

roleRouter.route('/:id')
    .get(roleController.getRoleByID)
    .put(roleController.updateRole)
    .delete(roleController.deleteRole);

module.exports = roleRouter;
