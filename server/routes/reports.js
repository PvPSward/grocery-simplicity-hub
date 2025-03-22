
const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

// Get sales report
router.get('/sales', reportsController.getSalesReport);

// Get loans report
router.get('/loans', reportsController.getLoansReport);

// Get payments report
router.get('/payments', reportsController.getPaymentsReport);

// Get users activity report
router.get('/users', reportsController.getUsersReport);

module.exports = router;
