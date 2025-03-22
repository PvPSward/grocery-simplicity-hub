
const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

// Get all payments
router.get('/', paymentsController.getAllPayments);

// Get payments by date range
router.get('/range', paymentsController.getPaymentsByDateRange);

// Get a specific payment
router.get('/:id', paymentsController.getPaymentById);

// Create a new payment
router.post('/', paymentsController.createPayment);

// Update a payment
router.put('/:id', paymentsController.updatePayment);

// Delete a payment
router.delete('/:id', paymentsController.deletePayment);

module.exports = router;
