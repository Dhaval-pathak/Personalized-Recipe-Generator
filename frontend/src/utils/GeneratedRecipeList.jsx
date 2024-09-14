import React, { useState, useEffect } from 'react';
import { getUserRecipes, toggleFavouriteRecipe, deleteUserRecipe } from '../services/api';
import { TrashIcon, HeartIcon as HeartOutlineIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const motivationalLines = [
    "Unlock your next delicious meal with our Recipe Generator!",
    "Choose from your favorite ingredients and dietary preferences!",
    "No more food waste—generate recipes with ingredients you have!",
    "Explore new flavors and surprise your taste buds!"
];

const GeneratedRecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [expandedRecipeId, setExpandedRecipeId] = useState(null);
    const [currentLine, setCurrentLine] = useState(0);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getUserRecipes(token);
                setRecipes(response.data);
                console.log(response.data);

            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prevLine) => (prevLine + 1) % motivationalLines.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const toggleExpand = (id) => {
        setExpandedRecipeId(expandedRecipeId === id ? null : id);
    };

    const toggleFavourite = async (recipeId) => {
        try {
            await toggleFavouriteRecipe(recipeId, token);
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe.id === recipeId ? { ...recipe, isFavourite: !recipe.isFavourite } : recipe
                )
            );
        } catch (error) {
            console.error('Error toggling favourite:', error);
        }
    };

    const deleteRecipe = async (recipeId) => {
        await deleteUserRecipe(recipeId, token);
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== recipeId));
    };

    return (
        <div className="mt-10 bg-white dark:bg-gray-900 p-6 text-gray-800 dark:text-white flex flex-col justify-center items-center transition duration-500">
            {recipes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-10 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
                    <h1 className="text-5xl font-extrabold mb-6 text-center tracking-wide">
                        Start Your Recipe Adventure!
                    </h1>
                    <div className="relative overflow-hidden h-20 w-full">
                        <div
                            key={currentLine}
                            className="animate-bounce text-2xl font-semibold text-gray-500 dark:text-gray-300 animate-slide-in-out text-center transition-all ease-in-out duration-1000"
                        >
                            {motivationalLines[currentLine]}
                        </div>
                    </div>
                    <p className="text-lg text-center text-gray-500">
                        Choose ingredients, dietary preferences, and generate something amazing!
                    </p>
                    <a href="#" className="mt-10 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                        Generate a Recipe
                    </a>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Your Generated Recipes</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition duration-500 relative">
                                <button
                                    onClick={() => deleteRecipe(recipe.id)}
                                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition duration-300"
                                    aria-label="Delete recipe"
                                >
                                    <TrashIcon className="h-6 w-6" />
                                </button>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 pr-8">{recipe.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">{recipe.summary}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold">Prep:</span> {recipe.prepTime}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold">Cook:</span> {recipe.cookTime}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => toggleFavourite(recipe.id)}
                                            className={`p-2 rounded-full transition duration-300 ${recipe.isFavourite ? 'text-red-500 bg-red-100' : 'text-gray-500 bg-gray-100'
                                                }`}
                                            aria-label={recipe.isFavourite ? "Remove from favorites" : "Add to favorites"}
                                        >
                                            {recipe.isFavourite ? (
                                                <HeartSolidIcon className="h-6 w-6" />
                                            ) : (
                                                <HeartOutlineIcon className="h-6 w-6" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => toggleExpand(recipe.id)}
                                            className="p-2 bg-blue-100 text-blue-500 rounded-full transition duration-300"
                                            aria-label={expandedRecipeId === recipe.id ? "Collapse recipe details" : "Expand recipe details"}
                                        >
                                            {expandedRecipeId === recipe.id ? (
                                                <ChevronUpIcon className="h-6 w-6" />
                                            ) : (
                                                <ChevronDownIcon className="h-6 w-6" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {expandedRecipeId === recipe.id && (
                                    <div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded transition duration-500">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Ingredients:</h3>
                                        <ul className="text-left list-disc ml-5 text-gray-600 dark:text-gray-300">
                                            {JSON.parse(recipe.ingredients).map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>

                                        <h3 className="font-bold mt-4 text-gray-800 dark:text-gray-200">Instructions:</h3>
                                        <ol className="text-left list-decimal ml-5 text-gray-600 dark:text-gray-300">
                                            {JSON.parse(recipe.instructions).map((step, index) => (
                                                <li key={index}>{step}</li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default GeneratedRecipeList;