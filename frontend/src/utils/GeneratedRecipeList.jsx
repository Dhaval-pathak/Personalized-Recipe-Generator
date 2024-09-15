import React, { useState, useEffect } from 'react';
import { getUserRecipes, toggleFavouriteRecipe, deleteUserRecipe } from '../services/api';
import RecipeCard from './RecipeCard';

const motivationalLines = [
    "Unlock your next delicious meal with our Recipe Generator!",
    "Choose from your favorite ingredients and dietary preferences!",
    "No more food waste—generate recipes with ingredients you have!",
    "Explore new flavors and surprise your taste buds!"
];

const GeneratedRecipeList = () => {
    const [recipes, setRecipes] = useState([]);
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
    }, [token]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prevLine) => (prevLine + 1) % motivationalLines.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

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
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                toggleFavourite={toggleFavourite}
                                deleteRecipe={deleteRecipe}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default GeneratedRecipeList;
