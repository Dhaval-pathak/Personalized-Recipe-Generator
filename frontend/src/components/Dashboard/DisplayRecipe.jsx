import React from 'react';

const RecipeDisplay = ({ recipe }) => {
    if (!recipe) return null;

    return (
        <div className="mt-10 w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition duration-500">
            {/* Header with title */}
            <div className=" bg-customGreen text-white p-6 rounded-t-lg">
                <h2 className="text-3xl font-bold">{recipe.title}</h2>
            </div>

            {/* Recipe Content */}
            <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Ingredients (Left Side) */}
                    <div className="md:w-1/3">
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-left">{recipe.summary}</p>
                        <div className="border-b border-gray-300 dark:border-gray-700 mb-5"></div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Ingredients</h3>
                        <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                                    <span className="mr-2 text-green-500 dark:text-green-400 font-bold">•</span>
                                    {ingredient}
                                </li>
                            ))}
                        </ul>

                    </div>

                    {/* Divider Line */}
                    <div className="border-l border-gray-300 dark:border-gray-700"></div>

                    {/* Instructions (Right Side) */}
                    <div className="md:w-2/3">
                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Prep Time: {recipe.prepTime}</span>
                                <span>Cook Time: {recipe.cookTime}</span>
                            </div>
                        </div>
                        <div className="border-b border-gray-300 dark:border-gray-700 mb-5"></div>

                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Instructions</h3>

                        <ol className="space-y-4 text-left">
                            {recipe.steps.map((step, index) => (
                                <li key={index} className="flex">
                                    <span className="font-bold text-green-500 dark:text-green-400 mr-4">{index + 1}.</span>
                                    <p className="text-gray-600 dark:text-gray-300">{step}</p>
                                </li>
                            ))}
                        </ol>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDisplay;
