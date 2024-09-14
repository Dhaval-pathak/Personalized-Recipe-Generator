import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../utils/themeToggle';
import {
  fetchDashboardData,
  generateRecipe
} from '../../services/api';
import RecipeDisplay from './DisplayRecipe';
import Loader from './Loader';
import { FavouriteRecipe } from './favouriteRecipe';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [dietaryPreference, setDietaryPreference] = useState('All');
  const [ingredients, setIngredients] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const images = [
    '/assets/images/1.png',
    '/assets/images/2.png',
    '/assets/images/3.png',
    '/assets/images/4.png',
    '/assets/images/5.png',
    '/assets/images/6.png',
    '/assets/images/7.png',
    '/assets/images/8.png',
    '/assets/images/9.png',
    '/assets/images/10.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);
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
        setUserEmail(data.email);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate]);

  const handleGenerateRecipe = async () => {
    setLoading(true); // Show loader
    const token = localStorage.getItem('token');
    const user = { email: userEmail };

    try {
      const response = await generateRecipe(user, dietaryPreference, ingredients, token);
      setRecipe(response.data.recipe);
      console.log(response.data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">
      <div className="flex flex-col">
        {/* Sticky Navbar */}
        <header className="bg-gradient-to-r from-lightGradientStart to-lightGradientEnd dark:from-darkGradientStart dark:to-darkGradientEnd shadow-sm sticky top-0 z-50">
          <div className="container mx-auto py-3 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-10">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">MealMaker</h1>
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
              className="h-25 w-64 transition-opacity duration-300 object-contain"
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

          {/* Form to Input Preferences */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
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

            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full sm:w-72 px-4 py-2 border dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 rounded-md"
              placeholder="Enter available ingredients..."
            />

            <button
              onClick={handleGenerateRecipe}
              className="bg-green-600 dark:bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-500 dark:hover:bg-green-700"
            >
              Generate Recipe
            </button>
          </div>

          {/* Show Loader */}
          {loading && (
            <div className="text-center mt-6">
              <Loader />
            </div>
          )}

          {/* Recipe Display */}
          {recipe && (<RecipeDisplay recipe={recipe} />)}

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


          <FavouriteRecipe />
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 MealMaker. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
