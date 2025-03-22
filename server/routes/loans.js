
const express = require('express');
const router = express.Router();
const loansController = require('../controllers/loansController');

// Get all loans
router.get('/', loansController.getAllLoans);

// Get loan stats (active, overdue, completed)
router.get('/stats', loansController.getLoanStats);

// Get a specific loan
router.get('/:id', loansController.getLoanById);

// Create a new loan
router.post('/', loansController.createLoan);

// Update a loan
router.put('/:id', loansController.updateLoan);

// Delete a loan
router.delete('/:id', loansController.deleteLoan);

// Record a payment for a loan
router.post('/:id/payment', loansController.recordPayment);

module.exports = router;
