import React, { useState } from 'react';
import { TrashIcon, HeartIcon as HeartOutlineIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const RecipeCard = ({ recipe, toggleFavourite, deleteRecipe }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition duration-500 relative">
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
                        onClick={toggleExpand}
                        className="p-2 bg-blue-100 text-blue-500 rounded-full transition duration-300"
                        aria-label={expanded ? "Collapse recipe details" : "Expand recipe details"}
                    >
                        {expanded ? (
                            <ChevronUpIcon className="h-6 w-6" />
                        ) : (
                            <ChevronDownIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {expanded && (
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
    );
};

export default RecipeCard;
