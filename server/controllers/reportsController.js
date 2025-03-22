
// Import mock data from other controllers
// In a real app, this would use a database or shared data layer
const loansData = require('./loansController').loans;
const salesData = require('./salesController').sales;
const productsData = require('./salesController').products;
const paymentsData = require('./paymentsController').payments;
const usersData = require('./usersController').users;

// Get sales report
exports.getSalesReport = (req, res) => {
  const { period } = req.query; // daily, weekly, monthly, yearly
  
  // Get current date to calculate periods
  const currentDate = new Date();
  
  // Process sales data based on period
  let salesByPeriod = [];
  let totalRevenue = 0;
  let totalItems = 0;
  let popularProducts = {};
  
  // Calculate sales statistics
  salesData.forEach(sale => {
    totalRevenue += sale.total;
    
    sale.items.forEach(item => {
      totalItems += item.quantity;
      
      // Track popular products
      if (popularProducts[item.name]) {
        popularProducts[item.name] += item.quantity;
      } else {
        popularProducts[item.name] = item.quantity;
      }
    });
    
    // Group by period for chart data
    const saleDate = new Date(sale.timestamp);
    let periodKey;
    
    if (period === 'daily') {
      periodKey = saleDate.toISOString().split('T')[0]; // YYYY-MM-DD
    } else if (period === 'weekly') {
      // Get week number
      const startOfYear = new Date(saleDate.getFullYear(), 0, 1);
      const days = Math.floor((saleDate - startOfYear) / (24 * 60 * 60 * 1000));
      const weekNumber = Math.ceil(days / 7);
      periodKey = `Week ${weekNumber}, ${saleDate.getFullYear()}`;
    } else if (period === 'monthly') {
      periodKey = `${saleDate.getFullYear()}-${saleDate.getMonth() + 1}`;
    } else {
      // Default to yearly
      periodKey = saleDate.getFullYear().toString();
    }
    
    // Add to sales by period
    const existingPeriod = salesByPeriod.find(p => p.period === periodKey);
    if (existingPeriod) {
      existingPeriod.amount += sale.total;
      existingPeriod.count += 1;
    } else {
      salesByPeriod.push({
        period: periodKey,
        amount: sale.total,
        count: 1
      });
    }
  });
  
  // Convert popular products object to array and sort
  const popularProductsArray = Object.entries(popularProducts).map(([name, quantity]) => ({
    name,
    quantity
  })).sort((a, b) => b.quantity - a.quantity).slice(0, 5); // Top 5
  
  // Get payment method distribution
  const paymentMethods = {
    cash: salesData.filter(sale => sale.paymentMethod === 'Cash').length,
    card: salesData.filter(sale => sale.paymentMethod === 'Card').length,
    other: salesData.filter(sale => sale.paymentMethod !== 'Cash' && sale.paymentMethod !== 'Card').length
  };
  
  res.status(200).json({
    summary: {
      totalSales: salesData.length,
      totalRevenue,
      totalItems,
      averageSaleValue: salesData.length > 0 ? totalRevenue / salesData.length : 0
    },
    salesByPeriod,
    popularProducts: popularProductsArray,
    paymentMethods
  });
};

// Get loans report
exports.getLoansReport = (req, res) => {
  // Calculate loan statistics
  const totalLoans = loansData.length;
  const activeLoans = loansData.filter(loan => loan.status === "Active").length;
  const overdueLoans = loansData.filter(loan => loan.status === "Overdue").length;
  const completedLoans = loansData.filter(loan => loan.status === "Completed").length;
  
  const totalLoanAmount = loansData.reduce((sum, loan) => sum + loan.amount, 0);
  const outstandingAmount = loansData
    .filter(loan => loan.status !== "Completed")
    .reduce((sum, loan) => sum + loan.amount * (loan.totalPayments - loan.paymentsMade) / loan.totalPayments, 0);
  
  // Calculate repayment rate
  const expectedPayments = loansData.reduce((sum, loan) => sum + loan.totalPayments, 0);
  const actualPayments = loansData.reduce((sum, loan) => sum + loan.paymentsMade, 0);
  const repaymentRate = expectedPayments > 0 ? (actualPayments / expectedPayments) * 100 : 0;
  
  // Get loan distribution by status
  const loansByStatus = [
    { status: "Active", count: activeLoans },
    { status: "Overdue", count: overdueLoans },
    { status: "Completed", count: completedLoans }
  ];
  
  res.status(200).json({
    summary: {
      totalLoans,
      totalLoanAmount,
      outstandingAmount,
      repaymentRate: repaymentRate.toFixed(2) + '%'
    },
    loansByStatus,
    activeLoans: {
      count: activeLoans,
      percentage: totalLoans > 0 ? (activeLoans / totalLoans) * 100 : 0
    },
    overdueLoans: {
      count: overdueLoans,
      percentage: totalLoans > 0 ? (overdueLoans / totalLoans) * 100 : 0
    },
    completedLoans: {
      count: completedLoans,
      percentage: totalLoans > 0 ? (completedLoans / totalLoans) * 100 : 0
    }
  });
};

// Get payments report
exports.getPaymentsReport = (req, res) => {
  const { startDate, endDate } = req.query;
  
  let filteredPayments = [...paymentsData];
  
  // Filter by date range if provided
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    filteredPayments = paymentsData.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate >= start && paymentDate <= end;
    });
  }
  
  // Calculate payment statistics
  const totalPayments = filteredPayments.length;
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Group payments by method
  const paymentsByMethod = {};
  filteredPayments.forEach(payment => {
    if (paymentsByMethod[payment.method]) {
      paymentsByMethod[payment.method].count++;
      paymentsByMethod[payment.method].amount += payment.amount;
    } else {
      paymentsByMethod[payment.method] = {
        count: 1,
        amount: payment.amount
      };
    }
  });
  
  // Convert to array
  const paymentMethodsArray = Object.entries(paymentsByMethod).map(([method, data]) => ({
    method,
    count: data.count,
    amount: data.amount,
    percentage: totalPayments > 0 ? (data.count / totalPayments) * 100 : 0
  }));
  
  // Group payments by type (loan or sale)
  const loanPayments = filteredPayments.filter(payment => payment.relatedTo.type === "Loan");
  const salePayments = filteredPayments.filter(payment => payment.relatedTo.type === "Sale");
  
  res.status(200).json({
    summary: {
      totalPayments,
      totalAmount,
      averagePayment: totalPayments > 0 ? totalAmount / totalPayments : 0
    },
    paymentsByMethod: paymentMethodsArray,
    paymentsByType: [
      {
        type: "Loan",
        count: loanPayments.length,
        amount: loanPayments.reduce((sum, payment) => sum + payment.amount, 0)
      },
      {
        type: "Sale",
        count: salePayments.length,
        amount: salePayments.reduce((sum, payment) => sum + payment.amount, 0)
      }
    ]
  });
};

// Get users activity report
exports.getUsersReport = (req, res) => {
  // Get user statistics
  const totalUsers = usersData.length;
  const activeUsers = usersData.filter(user => user.status === "Active").length;
  const inactiveUsers = usersData.filter(user => user.status === "Inactive").length;
  
  // Group users by role
  const usersByRole = {};
  usersData.forEach(user => {
    if (usersByRole[user.role]) {
      usersByRole[user.role]++;
    } else {
      usersByRole[user.role] = 1;
    }
  });
  
  // Convert to array
  const roleDistribution = Object.entries(usersByRole).map(([role, count]) => ({
    role,
    count,
    percentage: totalUsers > 0 ? (count / totalUsers) * 100 : 0
  }));
  
  // Get payments processed by each user (from payments data)
  const userActivity = usersData.map(user => {
    const userPayments = paymentsData.filter(payment => payment.receivedBy === user.id);
    
    return {
      id: user.id,
      name: user.name,
      role: user.role,
      status: user.status,
      lastActive: user.lastActive,
      paymentsProcessed: userPayments.length,
      amountProcessed: userPayments.reduce((sum, payment) => sum + payment.amount, 0)
    };
  }).sort((a, b) => b.paymentsProcessed - a.paymentsProcessed);
  
  res.status(200).json({
    summary: {
      totalUsers,
      activeUsers,
      inactiveUsers
    },
    roleDistribution,
    userActivity
  });
};
