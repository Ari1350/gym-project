const router = require('express').Router();
const membershipsController = require('../controllers/memberships');

// GET routes
router.get('/', membershipsController.getAllMembers);
router.get('/:id', membershipsController.getSingleMember);

// POST route
router.post('/', membershipsController.createMember);

// PUT route
router.put('/:id', membershipsController.updateMember);

// DELETE route
router.delete('/:id', membershipsController.deleteMember);

module.exports = router;
