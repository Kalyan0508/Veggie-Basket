const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'gfgsecretkey';

mongoose.connect('mongodb://127.0.0.1:27017/GeeksVeg');

app.use(express.json());
app.use(cors());

// Mongoose Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  price: Number,
  image: String,
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// User Registration
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User registered', userId: newUser._id });
  } catch (error) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name } });
});

// Public - Get Products
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Cart Routes
app.get('/api/cart', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart');
  res.json(user.cart);
});

app.post('/api/cart/add/:productId', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart.push(req.params.productId);
  await user.save();
  res.json({ message: 'Product added to cart' });
});

app.post('/api/cart/remove/:productId', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(p => p.toString() !== req.params.productId);
  await user.save();
  res.json({ message: 'Product removed from cart' });
});

// Checkout and Clear Cart
app.post('/api/cart/checkout', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart = [];
  await user.save();
  res.json({ message: 'Checkout successful. Cart cleared.' });
});

// Optional: Seed the database
const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) return;

    const products = [
      { name: 'Apple', type: 'Fruit', description: 'Fresh and crispy', price: 150, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142542/apple.jpg' },
      { name: 'Banana', type: 'Fruit', description: 'Rich in potassium', price: 75, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142554/banana.jpg' },
      { name: 'Carrot', type: 'Vegetable', description: 'Healthy and crunchy', price: 100, image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240104142613/carrot.jpg' },
    ];

    await Product.insertMany(products);
    console.log('Database seeded');
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

seedDatabase();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
