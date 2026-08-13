const router = require('express').Router();
const classesController = require('../controllers/classes');

// GET routes
router.get('/', classesController.getAllClasses);
router.get('/:id', classesController.getSingleClass);

// POST route (Create)
router.post('/', classesController.createClass);

// PUT route (Update)
router.put('/:id', classesController.updateClass);

// DELETE route (Delete)
router.delete('/:id', classesController.deleteClass);

module.exports = router;
