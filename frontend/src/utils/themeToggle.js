import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';  // Import icons from Heroicons v2

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference in localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded ${
        darkMode
          ? 'bg-black' // Dark mode: background black
          : 'bg-slate-100'  // Light mode: background white
      }`}
    >
      {darkMode ? (
        <MoonIcon className="w-6 h-6 stroke-2 text-white border-white" />  // Moon: hollow with white border in dark mode
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-400" />  // Sun: yellow in light mode
      )}
    </button>
  );
};

export default ThemeToggle;
