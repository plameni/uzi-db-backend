const express = require('express'); 
const propertyTypeController = require('./../controllers/property_type-controller');

const propertyTypeRouter = express.Router(); 

propertyTypeRouter.route('/')
                     .get(propertyTypeController.getPropertyTypesPaginated)
                     .post(propertyTypeController.insertPropertyType);

propertyTypeRouter.route('/:id')
    .get(propertyTypeController.getPropertyTypeByID)
    .put(propertyTypeController.updatePropertyType)
    .delete(propertyTypeController.deletePropertyType);

module.exports = propertyTypeRouter;
