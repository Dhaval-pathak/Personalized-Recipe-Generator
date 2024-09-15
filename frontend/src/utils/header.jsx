import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import ThemeToggle from './themeToggle';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewFavourites = () => {
    navigate('/favourites');
  };

  return (
    <header className="bg-gradient-to-r from-lightGradientStart to-lightGradientEnd dark:from-darkGradientStart dark:to-darkGradientEnd shadow-sm sticky top-0 z-50">
      <div className="container mx-auto py-3 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <Link to="/dashboard">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer">MealMaker</h1>
          </Link>
          <nav className="space-x-8">
            <a href="#about" className="navBackgroundLight hover:text-white dark:text-gray-300">
              About
            </a>
            <a
              href="https://github.com/Dhaval-pathak/Personalized-Recipe-Generator"
              target="_blank"
              rel="noopener noreferrer"
              className="navBackgroundLight hover:text-white dark:text-gray-300"
            >
              GitHub
            </a>
            <a href="#profile" className="navBackgroundLight hover:text-white dark:text-gray-300">
              Profile
            </a>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />

          {/* Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="flex items-center text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
            >
              <FaUserCircle size={24} className="mr-2" />
              <span>User</span>
            </button>

            {dropdownVisible && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
                <button
                  onClick={handleViewFavourites}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View Favorite Recipes
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
