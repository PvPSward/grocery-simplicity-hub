
// In-memory database for payments
let payments = [
  {
    id: 1,
    amount: 150,
    method: "Cash",
    relatedTo: { type: "Loan", id: 1 },
    date: "2023-09-05T14:30:00Z",
    receivedBy: 2, // User ID
    notes: "First payment for loan #1"
  },
  {
    id: 2,
    amount: 400,
    method: "Bank Transfer",
    relatedTo: { type: "Loan", id: 2 },
    date: "2023-09-07T11:15:00Z",
    receivedBy: 1, // User ID
    notes: "First payment for loan #2"
  },
  {
    id: 3,
    amount: 75.50,
    method: "Cash",
    relatedTo: { type: "Sale", id: 1 },
    date: "2023-09-10T10:30:00Z",
    receivedBy: 3, // User ID
    notes: "Payment for sale #1"
  }
];

// Get all payments
exports.getAllPayments = (req, res) => {
  res.status(200).json(payments);
};

// Get payments by date range
exports.getPaymentsByDateRange = (req, res) => {
  const { startDate, endDate } = req.query;
  
  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Start date and end date are required" });
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const filteredPayments = payments.filter(payment => {
    const paymentDate = new Date(payment.date);
    return paymentDate >= start && paymentDate <= end;
  });
  
  res.status(200).json(filteredPayments);
};

// Get payment by ID
exports.getPaymentById = (req, res) => {
  const payment = payments.find(payment => payment.id === parseInt(req.params.id));
  
  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }
  
  res.status(200).json(payment);
};

// Create a new payment
exports.createPayment = (req, res) => {
  const { amount, method, relatedTo, receivedBy, notes } = req.body;
  
  if (!amount || !method || !relatedTo || !receivedBy) {
    return res.status(400).json({ message: "Required fields missing" });
  }
  
  const newPayment = {
    id: payments.length > 0 ? Math.max(...payments.map(payment => payment.id)) + 1 : 1,
    amount: parseFloat(amount),
    method,
    relatedTo,
    date: new Date().toISOString(),
    receivedBy,
    notes: notes || ""
  };
  
  payments.push(newPayment);
  res.status(201).json(newPayment);
};

// Update a payment
exports.updatePayment = (req, res) => {
  const { amount, method, relatedTo, receivedBy, notes } = req.body;
  const paymentId = parseInt(req.params.id);
  
  const paymentIndex = payments.findIndex(payment => payment.id === paymentId);
  
  if (paymentIndex === -1) {
    return res.status(404).json({ message: "Payment not found" });
  }
  
  // Update only the fields that are provided
  payments[paymentIndex] = {
    ...payments[paymentIndex],
    amount: amount ? parseFloat(amount) : payments[paymentIndex].amount,
    method: method || payments[paymentIndex].method,
    relatedTo: relatedTo || payments[paymentIndex].relatedTo,
    receivedBy: receivedBy || payments[paymentIndex].receivedBy,
    notes: notes !== undefined ? notes : payments[paymentIndex].notes
  };
  
  res.status(200).json(payments[paymentIndex]);
};

// Delete a payment
exports.deletePayment = (req, res) => {
  const paymentId = parseInt(req.params.id);
  const initialLength = payments.length;
  
  payments = payments.filter(payment => payment.id !== paymentId);
  
  if (payments.length === initialLength) {
    return res.status(404).json({ message: "Payment not found" });
  }
  
  res.status(200).json({ message: "Payment successfully deleted" });
};
