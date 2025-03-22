
# Loan Management API

This is a Node.js backend API for the loan management system.

## Setup

1. Navigate to the server directory
2. Install dependencies: `npm install`
3. Start the server: `npm start` or `npm run dev` for development with auto-reload

## Available Endpoints

### Loans
- `GET /api/loans` - Get all loans
- `GET /api/loans/stats` - Get loan statistics
- `GET /api/loans/:id` - Get a specific loan
- `POST /api/loans` - Create a new loan
- `PUT /api/loans/:id` - Update a loan
- `DELETE /api/loans/:id` - Delete a loan
- `POST /api/loans/:id/payment` - Record a payment for a loan

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `PATCH /api/users/:id/status` - Update user status
- `POST /api/users/:id/reset-password` - Reset user password

### Sales
- `GET /api/sales` - Get all sales
- `GET /api/sales/stats` - Get sales statistics
- `GET /api/sales/:id` - Get a specific sale
- `POST /api/sales` - Create a new sale
- `PUT /api/sales/:id` - Update a sale
- `DELETE /api/sales/:id` - Delete a sale
- `GET /api/sales/products` - Get all products
- `GET /api/sales/products/:id` - Get a specific product
- `POST /api/sales/products` - Create a new product
- `PUT /api/sales/products/:id` - Update a product
- `DELETE /api/sales/products/:id` - Delete a product

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/range?startDate=X&endDate=Y` - Get payments by date range
- `GET /api/payments/:id` - Get a specific payment
- `POST /api/payments` - Create a new payment
- `PUT /api/payments/:id` - Update a payment
- `DELETE /api/payments/:id` - Delete a payment

### Reports
- `GET /api/reports/sales?period=daily|weekly|monthly|yearly` - Get sales report
- `GET /api/reports/loans` - Get loans report
- `GET /api/reports/payments?startDate=X&endDate=Y` - Get payments report
- `GET /api/reports/users` - Get users activity report
