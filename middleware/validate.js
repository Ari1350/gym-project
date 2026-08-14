const { body, validationResult } = require('express-validator');

// Rules for Gym Classes
const classValidationRules = () => {
  return [
    body('name').trim().notEmpty().withMessage('Class name is required.'),
    body('trainer').trim().notEmpty().withMessage('Trainer name is required.'),
    body('schedule').trim().notEmpty().withMessage('Schedule details are required.'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be a number greater than 0.')
  ];
};

// Rules for Gym Memberships
const membershipValidationRules = () => {
  return [
    body('firstName').trim().notEmpty().withMessage('First name is required.'),
    body('lastName').trim().notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Please provide a valid email address.'),
    body('planType').trim().notEmpty().withMessage('Plan type is required (e.g., Monthly, Yearly).')
  ];
};

// Rules for Gym Trainers
const trainerValidationRules = () => {
  return [
    body('firstName').trim().notEmpty().withMessage('Trainer first name is required.'),
    body('lastName').trim().notEmpty().withMessage('Trainer last name is required.'),
    body('specialty').trim().notEmpty().withMessage('Trainer specialty is required.'),
    body('phone').trim().notEmpty().withMessage('Phone number is required.')
  ];
};

// Rules for Gym Equipment
const equipmentValidationRules = () => {
  return [
    body('itemName').trim().notEmpty().withMessage('Equipment name is required.'),
    body('area').trim().notEmpty().withMessage('Gym area location is required.'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a number greater than 0.')
  ];
};

// Middleware to catch the validation errors and return them
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); 
  }
  
  // Create an array with all the error messages
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  // Return status 422 
  
  return res.status(422).json({
    message: 'Validation failed. Please correct your data.',
    errors: extractedErrors
  });
};

module.exports = {
  classValidationRules,
  membershipValidationRules,
  trainerValidationRules,
  equipmentValidationRules,
  validate
};
