
// In-memory database for this demo
// In a real application, you would use a proper database like MongoDB or PostgreSQL
let loans = [
  { 
    id: 1, 
    customerName: "Jane Smith", 
    amount: 500, 
    issuedDate: "2023-05-15", 
    dueDate: "2023-06-15", 
    status: "Active",
    paymentsMade: 0,
    totalPayments: 2,
    interestRate: 5,
    phone: "555-1234",
    notes: "Regular customer, first loan"
  },
  { 
    id: 2, 
    customerName: "John Doe", 
    amount: 1200, 
    issuedDate: "2023-04-10", 
    dueDate: "2023-07-10", 
    status: "Active",
    paymentsMade: 1,
    totalPayments: 3,
    interestRate: 5,
    phone: "555-5678",
    notes: "Grocery supplier"
  },
  { 
    id: 3, 
    customerName: "Alice Johnson", 
    amount: 300, 
    issuedDate: "2023-03-20", 
    dueDate: "2023-04-20", 
    status: "Overdue",
    paymentsMade: 0,
    totalPayments: 1,
    interestRate: 5,
    phone: "555-9012",
    notes: "First-time customer"
  },
  { 
    id: 4, 
    customerName: "Robert Chen", 
    amount: 850, 
    issuedDate: "2023-05-01", 
    dueDate: "2023-08-01", 
    status: "Active",
    paymentsMade: 1,
    totalPayments: 3,
    interestRate: 5,
    phone: "555-3456",
    notes: "Regular customer"
  },
  { 
    id: 5, 
    customerName: "Maria Garcia", 
    amount: 600, 
    issuedDate: "2023-02-15", 
    dueDate: "2023-05-15", 
    status: "Completed",
    paymentsMade: 3,
    totalPayments: 3,
    interestRate: 5,
    phone: "555-7890",
    notes: "Prompt payments"
  }
];

// Get all loans
exports.getAllLoans = (req, res) => {
  res.status(200).json(loans);
};

// Get loan stats
exports.getLoanStats = (req, res) => {
  const activeLoans = loans.filter(loan => loan.status === "Active").length;
  const overdueLoans = loans.filter(loan => loan.status === "Overdue").length;
  const completedLoans = loans.filter(loan => loan.status === "Completed").length;
  
  const totalOutstanding = loans
    .filter(loan => loan.status !== "Completed")
    .reduce((sum, loan) => sum + loan.amount * (loan.totalPayments - loan.paymentsMade) / loan.totalPayments, 0);

  res.status(200).json({
    activeLoans,
    overdueLoans,
    completedLoans,
    totalOutstanding
  });
};

// Get loan by ID
exports.getLoanById = (req, res) => {
  const loan = loans.find(loan => loan.id === parseInt(req.params.id));
  
  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }
  
  res.status(200).json(loan);
};

// Create a new loan
exports.createLoan = (req, res) => {
  const { customerName, amount, issuedDate, dueDate, totalPayments, interestRate, phone, notes } = req.body;
  
  if (!customerName || !amount || !issuedDate || !dueDate || !totalPayments || !interestRate) {
    return res.status(400).json({ message: "Required fields missing" });
  }
  
  const newLoan = {
    id: loans.length > 0 ? Math.max(...loans.map(loan => loan.id)) + 1 : 1,
    customerName,
    amount: parseFloat(amount),
    issuedDate,
    dueDate,
    status: "Active",
    paymentsMade: 0,
    totalPayments: parseInt(totalPayments),
    interestRate: parseFloat(interestRate),
    phone: phone || "",
    notes: notes || ""
  };
  
  loans.push(newLoan);
  res.status(201).json(newLoan);
};

// Update a loan
exports.updateLoan = (req, res) => {
  const { customerName, amount, issuedDate, dueDate, status, paymentsMade, totalPayments, interestRate, phone, notes } = req.body;
  const loanId = parseInt(req.params.id);
  
  const loanIndex = loans.findIndex(loan => loan.id === loanId);
  
  if (loanIndex === -1) {
    return res.status(404).json({ message: "Loan not found" });
  }
  
  // Update only the fields that are provided
  loans[loanIndex] = {
    ...loans[loanIndex],
    customerName: customerName || loans[loanIndex].customerName,
    amount: amount ? parseFloat(amount) : loans[loanIndex].amount,
    issuedDate: issuedDate || loans[loanIndex].issuedDate,
    dueDate: dueDate || loans[loanIndex].dueDate,
    status: status || loans[loanIndex].status,
    paymentsMade: paymentsMade !== undefined ? parseInt(paymentsMade) : loans[loanIndex].paymentsMade,
    totalPayments: totalPayments ? parseInt(totalPayments) : loans[loanIndex].totalPayments,
    interestRate: interestRate ? parseFloat(interestRate) : loans[loanIndex].interestRate,
    phone: phone !== undefined ? phone : loans[loanIndex].phone,
    notes: notes !== undefined ? notes : loans[loanIndex].notes
  };
  
  res.status(200).json(loans[loanIndex]);
};

// Delete a loan
exports.deleteLoan = (req, res) => {
  const loanId = parseInt(req.params.id);
  const initialLength = loans.length;
  
  loans = loans.filter(loan => loan.id !== loanId);
  
  if (loans.length === initialLength) {
    return res.status(404).json({ message: "Loan not found" });
  }
  
  res.status(200).json({ message: "Loan successfully deleted" });
};

// Record a payment for a loan
exports.recordPayment = (req, res) => {
  const loanId = parseInt(req.params.id);
  const { amount } = req.body;
  
  const loanIndex = loans.findIndex(loan => loan.id === loanId);
  
  if (loanIndex === -1) {
    return res.status(404).json({ message: "Loan not found" });
  }
  
  const loan = loans[loanIndex];
  
  if (loan.paymentsMade >= loan.totalPayments) {
    return res.status(400).json({ message: "All payments for this loan have already been made" });
  }
  
  loan.paymentsMade += 1;
  
  // Update loan status if all payments have been made
  if (loan.paymentsMade === loan.totalPayments) {
    loan.status = "Completed";
  }
  
  res.status(200).json({
    message: "Payment recorded successfully",
    loan
  });
};
