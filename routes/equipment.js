const router = require('express').Router();
const equipmentController = require('../controllers/equipment');
const isAuthenticated = require('../middleware/isAuthenticated');
const { equipmentValidationRules, validate } = require('../middleware/validate');


// Public routes
router.get('/', equipmentController.getAllEquipment);
router.get('/:id', equipmentController.getSingleEquipment);

// Protected routes (Requires GitHub Login)
router.post('/', isAuthenticated, equipmentValidationRules(), validate, equipmentController.createEquipment);
router.put('/:id', isAuthenticated, equipmentValidationRules(), validate, equipmentController.updateEquipment);
router.delete('/:id', isAuthenticated, equipmentController.deleteEquipment);

module.exports = router;
