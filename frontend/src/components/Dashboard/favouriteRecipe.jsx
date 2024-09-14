import React, { useState, useEffect } from 'react';
import { fetchFavoriteRecipes, removeFavoriteRecipe } from '../../services/api';

const FavouriteRecipe = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            try {
                const favoriteData = await fetchFavoriteRecipes(token);
                setFavorites(favoriteData);
            } catch (error) {
                console.error('Error fetching favorite recipes:', error);
            }
        };
        fetchFavorites();
    }, []);

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
        <section className="mt-16 w-full max-w-4xl">
            <h2 className="text-3xl font-bold dark:text-gray-200 mb-6">Your Favorite Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {favorites.length > 0 ? (
                    favorites.map((recipe) => (
                        <div key={recipe.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <img src={recipe.image || "recipe.jpg"} alt={recipe.title} className="w-full h-40 object-cover" />
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
    );
};

export { FavouriteRecipe };
