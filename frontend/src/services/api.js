import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const login = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
};

const register = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
    return response.data;
};

const getDashboardData = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const getUserRecipes = (token) => {
    return axios.get(`${API_BASE_URL}/recipes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const deleteUserRecipe = async (recipeId, token) => {
    await axios.delete(`${API_BASE_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const getFavoriteRecipes = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/recipes`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const toggleFavouriteRecipe = (recipeId, token) => {
    return axios.post(`${API_BASE_URL}/recipes/${recipeId}/toggle-favourite`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const removeFavoriteRecipe = async (recipeId, token) => {
    await axios.delete(`${API_BASE_URL}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

const generateRecipe = async (user, dietaryPreference, ingredients, token) => {
    const response = await axios.post(
        `${API_BASE_URL}/generate-recipe`,
        { user, dietaryPreference, ingredients },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response;
};



export { login, register, getDashboardData, getUserRecipes, deleteUserRecipe, getFavoriteRecipes, toggleFavouriteRecipe, removeFavoriteRecipe, generateRecipe }