import React, { useState, useEffect } from 'react';

const Loader = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        'Preparing your meal...',
        'Chopping the vegetables...',
        'Mixing the ingredients...',
        'Selecting the freshest ingredients...',
        'Slicing the fruits...',
        'Cooking to perfection...',
        'Adding secret spices...',
        'Heating the pan...',
        'Tasting for quality...',
        'Garnishing the plate...',
        'Setting the table...',
        'Serving with love...',
        'Ready to enjoy!'

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="loader mb-4"></div>
            <div className="px-6 py-3 bg-customGreen2 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg shadow-lg">
                <p className="text-white dark:text-gray-200 text-lg text-center">{messages[messageIndex]}</p>
            </div>
        </div>
    );
};

export default Loader;
