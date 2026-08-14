const router = require('express').Router();
const trainersController = require('../controllers/trainers');
const isAuthenticated = require('../middleware/isAuthenticated');
const { trainerValidationRules, validate } = require('../middleware/validate');

// Public routes
router.get('/', trainersController.getAllTrainers);
router.get('/:id', trainersController.getSingleTrainer);

// Protected routes (Requires GitHub Login)
router.post('/', isAuthenticated, trainerValidationRules(), validate, trainersController.createTrainer);
router.put('/:id', isAuthenticated, trainerValidationRules(), validate, trainersController.updateTrainer);
router.delete('/:id', isAuthenticated, trainersController.deleteTrainer);

module.exports = router;
