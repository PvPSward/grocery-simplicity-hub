
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Get all users
router.get('/', usersController.getAllUsers);

// Get a specific user
router.get('/:id', usersController.getUserById);

// Create a new user
router.post('/', usersController.createUser);

// Update a user
router.put('/:id', usersController.updateUser);

// Delete a user
router.delete('/:id', usersController.deleteUser);

// Update user status (active/inactive)
router.patch('/:id/status', usersController.updateUserStatus);

// Reset user password
router.post('/:id/reset-password', usersController.resetPassword);

module.exports = router;
