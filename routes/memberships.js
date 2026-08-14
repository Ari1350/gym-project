const router = require('express').Router();
const membershipsController = require('../controllers/memberships');
const isAuthenticated = require('../middleware/isAuthenticated');
const { membershipValidationRules, validate } = require('../middleware/validate');

// GET routes
router.get('/', membershipsController.getAllMembers);
router.get('/:id', membershipsController.getSingleMember);

// POST route
router.post('/', isAuthenticated, membershipValidationRules(), validate, membershipsController.createMember);

// PUT route
router.put('/:id', isAuthenticated, membershipValidationRules(), validate, membershipsController.updateMember);

// DELETE route
router.delete('/:id', isAuthenticated, membershipsController.deleteMember);

module.exports = router;
