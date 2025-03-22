
const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Get all sales
router.get('/', salesController.getAllSales);

// Get sales stats
router.get('/stats', salesController.getSalesStats);

// Get a specific sale
router.get('/:id', salesController.getSaleById);

// Create a new sale
router.post('/', salesController.createSale);

// Update a sale
router.put('/:id', salesController.updateSale);

// Delete a sale
router.delete('/:id', salesController.deleteSale);

// Get all products
router.get('/products', salesController.getAllProducts);

// Get a specific product
router.get('/products/:id', salesController.getProductById);

// Create a new product
router.post('/products', salesController.createProduct);

// Update a product
router.put('/products/:id', salesController.updateProduct);

// Delete a product
router.delete('/products/:id', salesController.deleteProduct);

module.exports = router;
