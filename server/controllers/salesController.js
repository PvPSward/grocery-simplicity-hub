
// In-memory database for sales and products
let products = [
  { id: 1, name: "Milk 1L", category: "Dairy", price: 3.99, barcode: "5901234123457" },
  { id: 2, name: "Bread", category: "Bakery", price: 2.49, barcode: "4901234123458" },
  { id: 3, name: "Eggs (12pk)", category: "Dairy", price: 4.99, barcode: "3901234123459" },
  { id: 4, name: "Bananas 1kg", category: "Produce", price: 1.99, barcode: "2901234123450" },
  { id: 5, name: "Chicken Breast", category: "Meat", price: 7.99, barcode: "1901234123451" },
  { id: 6, name: "Rice 2kg", category: "Grains", price: 6.99, barcode: "6901234123452" },
  { id: 7, name: "Pasta 500g", category: "Grains", price: 1.49, barcode: "7901234123453" },
  { id: 8, name: "Tomatoes 1kg", category: "Produce", price: 3.49, barcode: "8901234123454" },
  { id: 9, name: "Cheese 200g", category: "Dairy", price: 4.49, barcode: "9901234123455" },
  { id: 10, name: "Yogurt 500g", category: "Dairy", price: 2.99, barcode: "0901234123456" },
];

let sales = [
  {
    id: 1,
    items: [
      { id: 1, name: "Milk 1L", price: 3.99, quantity: 2 },
      { id: 2, name: "Bread", price: 2.49, quantity: 1 }
    ],
    subtotal: 10.47,
    tax: 0.73,
    total: 11.20,
    paymentMethod: "Cash",
    paymentDetails: { method: "Cash", amountPaid: 15, change: 3.80 },
    timestamp: "2023-09-10T10:30:00Z"
  },
  {
    id: 2,
    items: [
      { id: 3, name: "Eggs (12pk)", price: 4.99, quantity: 1 },
      { id: 4, name: "Bananas 1kg", price: 1.99, quantity: 2 }
    ],
    subtotal: 8.97,
    tax: 0.63,
    total: 9.60,
    paymentMethod: "Card",
    paymentDetails: { method: "Card", cardType: "Visa", lastFour: "1234" },
    timestamp: "2023-09-11T14:45:00Z"
  }
];

// Get all sales
exports.getAllSales = (req, res) => {
  res.status(200).json(sales);
};

// Get sales stats
exports.getSalesStats = (req, res) => {
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageSaleValue = totalSales > 0 ? totalRevenue / totalSales : 0;
  
  const cashSales = sales.filter(sale => sale.paymentMethod === "Cash").length;
  const cardSales = sales.filter(sale => sale.paymentMethod === "Card").length;
  
  res.status(200).json({
    totalSales,
    totalRevenue,
    averageSaleValue,
    paymentMethods: {
      cash: cashSales,
      card: cardSales
    }
  });
};

// Get sale by ID
exports.getSaleById = (req, res) => {
  const sale = sales.find(sale => sale.id === parseInt(req.params.id));
  
  if (!sale) {
    return res.status(404).json({ message: "Sale not found" });
  }
  
  res.status(200).json(sale);
};

// Create a new sale
exports.createSale = (req, res) => {
  const { items, paymentMethod, paymentDetails } = req.body;
  
  if (!items || !items.length || !paymentMethod || !paymentDetails) {
    return res.status(400).json({ message: "Required fields missing" });
  }
  
  // Calculate sale totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;
  
  const newSale = {
    id: sales.length > 0 ? Math.max(...sales.map(sale => sale.id)) + 1 : 1,
    items,
    subtotal,
    tax,
    total,
    paymentMethod,
    paymentDetails,
    timestamp: new Date().toISOString()
  };
  
  sales.push(newSale);
  res.status(201).json(newSale);
};

// Update a sale
exports.updateSale = (req, res) => {
  const { items, paymentMethod, paymentDetails } = req.body;
  const saleId = parseInt(req.params.id);
  
  const saleIndex = sales.findIndex(sale => sale.id === saleId);
  
  if (saleIndex === -1) {
    return res.status(404).json({ message: "Sale not found" });
  }
  
  let updatedSale = { ...sales[saleIndex] };
  
  if (items && items.length) {
    updatedSale.items = items;
    // Recalculate totals
    updatedSale.subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updatedSale.tax = updatedSale.subtotal * 0.07;
    updatedSale.total = updatedSale.subtotal + updatedSale.tax;
  }
  
  if (paymentMethod) {
    updatedSale.paymentMethod = paymentMethod;
  }
  
  if (paymentDetails) {
    updatedSale.paymentDetails = paymentDetails;
  }
  
  sales[saleIndex] = updatedSale;
  res.status(200).json(updatedSale);
};

// Delete a sale
exports.deleteSale = (req, res) => {
  const saleId = parseInt(req.params.id);
  const initialLength = sales.length;
  
  sales = sales.filter(sale => sale.id !== saleId);
  
  if (sales.length === initialLength) {
    return res.status(404).json({ message: "Sale not found" });
  }
  
  res.status(200).json({ message: "Sale successfully deleted" });
};

// Get all products
exports.getAllProducts = (req, res) => {
  res.status(200).json(products);
};

// Get product by ID
exports.getProductById = (req, res) => {
  const product = products.find(product => product.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  res.status(200).json(product);
};

// Create a new product
exports.createProduct = (req, res) => {
  const { name, category, price, barcode } = req.body;
  
  if (!name || !category || !price) {
    return res.status(400).json({ message: "Required fields missing" });
  }
  
  // Check if barcode is unique
  if (barcode && products.some(product => product.barcode === barcode)) {
    return res.status(400).json({ message: "Barcode already exists" });
  }
  
  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1,
    name,
    category,
    price: parseFloat(price),
    barcode: barcode || `${Date.now()}` // Generate a unique barcode if not provided
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Update a product
exports.updateProduct = (req, res) => {
  const { name, category, price, barcode } = req.body;
  const productId = parseInt(req.params.id);
  
  const productIndex = products.findIndex(product => product.id === productId);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  // Check if new barcode is unique (if barcode is being changed)
  if (barcode && barcode !== products[productIndex].barcode && 
      products.some(product => product.barcode === barcode)) {
    return res.status(400).json({ message: "Barcode already exists" });
  }
  
  // Update only the fields that are provided
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    category: category || products[productIndex].category,
    price: price ? parseFloat(price) : products[productIndex].price,
    barcode: barcode || products[productIndex].barcode
  };
  
  res.status(200).json(products[productIndex]);
};

// Delete a product
exports.deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const initialLength = products.length;
  
  products = products.filter(product => product.id !== productId);
  
  if (products.length === initialLength) {
    return res.status(404).json({ message: "Product not found" });
  }
  
  res.status(200).json({ message: "Product successfully deleted" });
};
