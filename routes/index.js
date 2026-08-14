const router = require('express').Router();

// Base message for the API
router.get('/', (req, res) => {
  res.send('Welcome to the Gym Management API!');
});

// Authentication routes 
router.use('/auth', require('./auth'));

// Swagger documentation route
router.use('/', require('./swagger'));

// Link the classes routes
router.use('/classes', require('./classes'));
router.use('/memberships', require('./memberships'));
router.use('/trainers', require('./trainers'));
router.use('/equipment', require('./equipment'));

module.exports = router;

