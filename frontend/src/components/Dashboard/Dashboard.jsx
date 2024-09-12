import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../utils/themeToggle';
import {
  fetchDashboardData,
  fetchFavoriteRecipes,
  removeFavoriteRecipe
} from '../../services/api';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('All');
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    '/assets/images/1.png',
    '/assets/images/2.png',
    '/assets/images/3.png',
    '/assets/images/4.png',
    '/assets/images/5.png',
    '/assets/images/6.png',
    '/assets/images/7.png',
    '/assets/images/8.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const data = await fetchDashboardData(token);
        setMessage(data.message);
        const favoriteData = await fetchFavoriteRecipes(token);
        setFavorites(favoriteData);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  const handleGenerate = async () => {
    // You can add the logic here to generate recipes based on dietary preference and ingredients.
    console.log('Dietary Preference:', dietaryPreference);
    console.log('Ingredients:', ingredients);
    
    // const user = { email: 'dhavalpathak2003@gmail.com' }; // Replace with actual user data if needed
//     const recipe = { title: 'Test Recipe' }; // Replace with actual recipe data if needed
//     const token = localStorage.getItem('token');
//     // Sending user and recipe data to the /generate-recipe route
//     const mailsend = await axios.post(
//       'http://localhost:5000/generate-recipe',
//       { user, recipe }, // Pass user and recipe data in the request body
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     console.log(mailsend);
  };

  const handleRemoveFavorite = async (recipeId) => {
    const token = localStorage.getItem('token');
    try {
      await removeFavoriteRecipe(recipeId, token);
      setFavorites(favorites.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">
      <div className="flex flex-col">
        {/* Sticky Navbar */}
        <header className="bg-gradient-to-r from-lightGradientStart to-lightGradientEnd dark:from-darkGradientStart dark:to-darkGradientEnd shadow-sm sticky top-0 z-50">
          <div className="container mx-auto py-3 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">RecipeApp</h1>
              <nav className="space-x-8">
                <a href="#about" className="navBackgroundLight hover:text-white dark:text-gray-300 ">About</a>
                <a href="https://github.com/yourrepo" target="_blank" className="navBackgroundLight hover:text-white dark:text-gray-300">GitHub</a>
                <a href="#profile" className="navBackgroundLight hover:text-white dark:text-gray-300">Profile</a>
              </nav>
            </div>
            <div className="flex gap-4">
              <ThemeToggle />
              <button
                className="text-white font-semibold px-4 py-2 rounded-md transition duration-300 hover:bg-red-500 hover:text-white dark:border-red-400  dark:text-red-400 dark:hover:text-white"
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1 container mx-auto px-6 py-10 flex flex-col items-center text-center">

          {/* Image Carousel */}
          <div className="mb-6 flex justify-center">
            <img
              src={images[currentImageIndex]}
              alt={`Carousel Image ${currentImageIndex}`}
              className="h-20 w-50 transition-opacity duration-300"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>

          {/* Tagline */}
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-4 mt-6">
            Your Personalized Recipe Generator
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Generate custom recipes based on what you have in your kitchen. <br />Save your favorites, explore new ideas, and enjoy cooking!
          </p>

          {/* Input Section: Dietary Preferences and Ingredients */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Dietary Preferences Dropdown */}
            <select
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
              className="w-full sm:w-56 px-4 py-2 border dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 rounded-md"
            >
              <option value="All">All</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Keto">Keto</option>
            </select>

            {/* Ingredients Input */}
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full sm:w-72 px-4 py-2 border dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Enter available ingredients..."
            />

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="bg-green-600 dark:bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-500 dark:hover:bg-green-700"
            >
              Generate Recipe
            </button>
          </div>

          {/* Stats Section */}
          <section className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">1000+</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Recipes Generated</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">500+</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Satisfied Users</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">200+</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Vegan Recipes</p>
            </div>
          </section>

          {/* Favorite Recipes Section */}
          <section className="mt-16 w-full max-w-4xl">
            <h2 className="text-3xl font-bold dark:text-gray-200 mb-6">Your Favorite Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Render the user's favorite recipes */}
              {favorites.length > 0 ? (
                favorites.map((recipe) => (
                  <div key={recipe.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    <img src="recipe.jpg" alt={recipe.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-xl dark:text-gray-200">{recipe.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{recipe.ingredients}</p>
                      <button
                        className="text-green-600 dark:text-green-400 mt-4"
                        onClick={() => handleRemoveFavorite(recipe.id)}
                      >
                        Remove from Favorites
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="dark:text-gray-400">No favorite recipes saved yet.</p>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 RecipeApp. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
