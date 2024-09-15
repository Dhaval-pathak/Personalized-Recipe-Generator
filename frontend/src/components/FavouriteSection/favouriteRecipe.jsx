import React, { useState, useEffect } from 'react';
import { getFavoriteRecipes, toggleFavouriteRecipe } from '../../services/api';
import Header from '../../utils/header';
import RecipeCard from '../../utils/RecipeCard';

const FavouriteRecipe = () => {
    const [favorites, setFavorites] = useState([]);

    // Fetch favorite recipes when component mounts
    useEffect(() => {
        fetchFavoriteRecipes();
    }, []);

    // Function to fetch favorite recipes
    const fetchFavoriteRecipes = async () => {
        const token = localStorage.getItem('token');
        try {
            const favoriteData = await getFavoriteRecipes(token);
            setFavorites(favoriteData);
            console.log(favoriteData);
        } catch (error) {
            console.error('Error fetching favorite recipes:', error);
        }
    };

    // Toggle favorite status and update the list
    const toggleFavourite = async (recipeId) => {
        try {
            const token = localStorage.getItem('token');
            await toggleFavouriteRecipe(recipeId, token);
            
            // After toggling, refetch the favorite recipes to update the list
            fetchFavoriteRecipes();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <section className="mt-16 w-full max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold dark:text-gray-200 mb-8 text-center">Your Favorite Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {favorites.length > 0 ? (
                        favorites.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                toggleFavourite={toggleFavourite} 
                                deleteRecipe={() => {}} // Optionally handle delete here if needed
                            />
                        ))
                    ) : (
                        <p className="dark:text-gray-400 text-center w-full">No favorite recipes saved yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export { FavouriteRecipe };
