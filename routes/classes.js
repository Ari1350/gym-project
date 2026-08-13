const router = require('express').Router();
const classesController = require('../controllers/classes');

// Route to get all classes
router.get('/', classesController.getAllClasses);

// Route to get one class by ID
router.get('/:id', classesController.getSingleClass);

module.exports = router;
