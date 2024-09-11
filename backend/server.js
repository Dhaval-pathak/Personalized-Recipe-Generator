const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Register Route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ token });
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Save Recipe Route
app.post('/save-recipe', authenticateToken, async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  try {
    const recipe = await prisma.recipe.create({
      data: {
        title,
        ingredients,
        instructions,
        userId: req.user.id,
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Error saving recipe' });
  }
});

// Get User's Recipes Route
app.get('/recipes', authenticateToken, async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { userId: req.user.id },
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});



// Dashboard Route
app.get('/dashboard', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: `Welcome to the dashboard, ${user.email}` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
