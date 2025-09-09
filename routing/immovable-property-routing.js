const express = require('express');
const controller = require('./../controllers/immovable-property-controller');
const authMiddleware = require('./../middleware/auth-middleware');

const router = express.Router();

router.get('/', controller.getAllImmovablePropertiesPaginated);

router.route('/')
    .post(authMiddleware, controller.insertImmovableProperty);

router.route('/:id')
    .get(controller.getImmovablePropertyByID)
    .put(authMiddleware, controller.updateImmovableProperty)
    .delete(authMiddleware, controller.deleteImmovableProperty);

module.exports = router;
