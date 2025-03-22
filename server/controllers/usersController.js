
// In-memory database for users
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastActive: "Today, 2:30 PM", password: "hashed_password_1" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Active", lastActive: "Today, 10:15 AM", password: "hashed_password_2" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "Cashier", status: "Active", lastActive: "Yesterday, 5:42 PM", password: "hashed_password_3" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Cashier", status: "Inactive", lastActive: "Aug 15, 2023", password: "hashed_password_4" },
  { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "Inventory", status: "Active", lastActive: "Today, 12:05 PM", password: "hashed_password_5" },
];

// Get all users (without passwords)
exports.getAllUsers = (req, res) => {
  const safeUsers = users.map(({ password, ...user }) => user);
  res.status(200).json(safeUsers);
};

// Get user by ID (without password)
exports.getUserById = (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const { password, ...safeUser } = user;
  res.status(200).json(safeUser);
};

// Create a new user
exports.createUser = (req, res) => {
  const { name, email, role, password } = req.body;
  
  if (!name || !email || !role || !password) {
    return res.status(400).json({ message: "Required fields missing" });
  }
  
  // Check if email already exists
  if (users.some(user => user.email === email)) {
    return res.status(400).json({ message: "Email already in use" });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
    name,
    email,
    role,
    status: "Active",
    lastActive: new Date().toLocaleString(),
    password: `hashed_${password}` // In a real app, you would hash the password
  };
  
  users.push(newUser);
  
  const { password: _, ...safeUser } = newUser;
  res.status(201).json(safeUser);
};

// Update a user
exports.updateUser = (req, res) => {
  const { name, email, role } = req.body;
  const userId = parseInt(req.params.id);
  
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  
  // Check if new email already exists (if email is being changed)
  if (email && email !== users[userIndex].email && users.some(user => user.email === email)) {
    return res.status(400).json({ message: "Email already in use" });
  }
  
  // Update only the fields that are provided
  users[userIndex] = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    role: role || users[userIndex].role,
    lastActive: new Date().toLocaleString()
  };
  
  const { password, ...safeUser } = users[userIndex];
  res.status(200).json(safeUser);
};

// Delete a user
exports.deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const initialLength = users.length;
  
  users = users.filter(user => user.id !== userId);
  
  if (users.length === initialLength) {
    return res.status(404).json({ message: "User not found" });
  }
  
  res.status(200).json({ message: "User successfully deleted" });
};

// Update user status
exports.updateUserStatus = (req, res) => {
  const { status } = req.body;
  const userId = parseInt(req.params.id);
  
  if (!status || (status !== "Active" && status !== "Inactive")) {
    return res.status(400).json({ message: "Invalid status" });
  }
  
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  
  users[userIndex].status = status;
  
  const { password, ...safeUser } = users[userIndex];
  res.status(200).json(safeUser);
};

// Reset user password
exports.resetPassword = (req, res) => {
  const { newPassword } = req.body;
  const userId = parseInt(req.params.id);
  
  if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }
  
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  
  // In a real app, you would hash the password
  users[userIndex].password = `hashed_${newPassword}`;
  
  res.status(200).json({ message: "Password reset successfully" });
};
