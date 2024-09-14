import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const Footer = () => {
    return (
        <footer className="bg-light-green-100 dark:bg-gray-900 text-black dark:text-gray-400 py-12 border-t border-gray-300 dark:border-gray-700">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">

                {/* Company Info */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center space-x-2">
                        <img src="/favicon.png" alt="Logo" className="h-10" />
                        <span className="text-xl font-bold text-black dark:text-white">MealMaker</span>
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-400">
                        Your go-to app for custom recipes and meal ideas based on available ingredients.
                    </p>
                </div>

                {/* Download Links */}
                <div>
                    <h3 className="text-black dark:text-gray-200 text-lg font-bold mb-4">Download</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-700 dark:hover:text-white">Windows app</a></li>
                        <li><a href="#" className="hover:text-gray-700 dark:hover:text-white">Mac app</a></li>
                        <li><a href="#" className="hover:text-gray-700 dark:hover:text-white">Linux app</a></li>
                        <li><a href="#" className="hover:text-gray-700 dark:hover:text-white">Desktop app</a></li>
                    </ul>
                </div>

                {/* Services Links */}
                <div>
                    <h3 className="text-black dark:text-gray-200 text-lg font-bold mb-4">Services</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-700 dark:hover:text-white">Design</a></li>
                        <li><a href="#" className="hover:text-gray-700 dark:hover:text-white">Development</a></li>
                        <li><a href="#" className="hover:text-gray-700 dark:hover:text-white">Ecommerce</a></li>
                    </ul>
                </div>

                {/* Social & Subscribe */}
                <div>
                    <h3 className="text-black dark:text-gray-200 text-lg font-bold mb-4">Get in touch</h3>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white">
                            <EnvelopeIcon className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white">
                            <PhoneIcon className="h-6 w-6" />
                        </a>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-full bg-white dark:bg-gray-700 text-black dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email address"
                        />
                        <button
                            className="absolute right-1 top-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className=" mt-8 py-6 text-center text-gray-700 dark:text-gray-500">
                <p>&copy; 2024 MealMaker. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;