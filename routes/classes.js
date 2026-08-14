const router = require('express').Router();
const classesController = require('../controllers/classes');
const isAuthenticated = require('../middleware/isAuthenticated');
const { classValidationRules, validate } = require('../middleware/validate');

// GET routes remain public (Anyone can view gym classes)
router.get('/', classesController.getAllClasses);
router.get('/:id', classesController.getSingleClass);

// POST route is protected (Only logged-in users can create a gym class)
router.post('/', isAuthenticated, classValidationRules(), validate, classesController.createClass);

// PUT route is protected (Only logged-in users can update a gym class)
router.put('/:id', isAuthenticated, classValidationRules(), validate, classesController.updateClass);

// DELETE route is protected (Only logged-in users can delete a gym class)
router.delete('/:id', isAuthenticated, classesController.deleteClass);

module.exports = router;