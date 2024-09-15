const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendRecipeEmail, sendWelcomeEmail } = require('./utils/mailer');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('./middleware/middlewareAuth');
const { fetchOpenAICompletions } = require('./utils/openAi');

const prisma = new PrismaClient();
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

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

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });

  try {
    await sendWelcomeEmail(user);  
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }

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

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });

  res.json({ token });
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

// Delete a recipe from favorites
app.delete('/recipes/:recipeId', authenticateToken, async (req, res) => {
  const recipeId = parseInt(req.params.recipeId);

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.userId !== req.user.id) {
      return res.status(403).json({ error: 'You are not allowed to delete this recipe' });
    }

    await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    res.status(200).json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing the recipe' });
  }
});

// Adding/removing a recipe from favorites
app.post('/recipes/:recipeId/toggle-favourite', authenticateToken, async (req, res) => {
  const recipeId = parseInt(req.params.recipeId);

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe || recipe.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: { isFavourite: !recipe.isFavourite },
    });

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Error toggling favourite' });
  }
});

// get favourite recipe
app.get('/get-favourite-recipes', authenticateToken, async (req, res) => {  
  try {
      const favoriteRecipes = await prisma.recipe.findMany({
          where: {
              userId: req.user.id,
              isFavourite: true,
          },
      });
      res.json(favoriteRecipes);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching favorite recipes' });
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

  res.json({
    message: `Welcome to the dashboard, ${user.email}`,
    email: user.email
  });
});

// Generate Recipe Route
app.post('/generate-recipe', authenticateToken, async (req, res) => {
  try {
    const { user, dietaryPreference, ingredients } = req.body;

    if (!dietaryPreference || !ingredients) {
      return res.status(400).json({ error: 'Missing dietary preferences or ingredients' });
    }

    const prompt = [
      "Generate a recipe based on the following details:",
      `[Dietary Preference: ${dietaryPreference}]`,
      `[Ingredients: ${ingredients}]`,
      "Provide a detailed recipe in JSON format with the following structure:",
      "{",
      "  \"title\": \"Recipe Title\",",
      "  \"summary\": \"Short summary of the recipe\",", 
      "  \"summary\": \"Short summary of the recipe\",",
      "  \"ingredients\": [\"ingredient 1\", \"ingredient 2\", ...],",
      "  \"steps\": [\"Instruction 1\", \"Instruction 2\", ...],", // Avoids "Step X" prefix
      "  \"prepTime\": \"X minutes\",",
      "  \"cookTime\": \"Y minutes\"",
      "}",
      "Ensure that the steps do not include 'Step X' numbering, but are simple, clear instructions."
    ];
    
    
    const messages = [
      {
        role: "system",
        content: prompt.join(" "),
      },
    ];

    // Fetch the recipe from OpenAI
    const recipe = await fetchOpenAICompletions(messages);
    console.log("server---------------------------------------------")
    console.log(recipe)
    
    // Call the function to send an email and saving the recipe
    try {
      await prisma.recipe.create({
        data: {
          title: recipe.title,
          ingredients: JSON.stringify(recipe.ingredients),
          instructions: JSON.stringify(recipe.steps),
          userId: req.user.id,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          dietaryPreference: dietaryPreference,
          summary:recipe.summary,
          isFavourite: false
        },
      });
      await sendRecipeEmail(user, recipe);
    } catch (emailError) {
      console.error('Error sending recipe email:', emailError);
    }

    // Send the final response
    res.status(200).json({ recipe });
    
  } catch (error) {
    console.error('Error in /generate-recipe route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
