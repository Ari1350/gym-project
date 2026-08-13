const router = require('express').Router();

// Base message for the API
router.get('/', (req, res) => {
  res.send('Welcome to the Gym Management API!');
});

// Link the classes routes
router.use('/classes', require('./classes'));

module.exports = router;

