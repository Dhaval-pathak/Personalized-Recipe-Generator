# Frontend for MealMaker - Personalized Recipe Generator

## Overview

This frontend is built using **React.js** and **Tailwind CSS**. It allows users to register, log in, generate personalized recipes, and manage their saved recipes through a protected dashboard. The app also includes dark mode support and notifications for newly generated recipes.

### Key Features:
- User registration and login with **JWT token storage** in `localStorage`
- **Protected dashboard** displaying saved recipes for authenticated users
- **Personalized recipe generation** using dietary preferences
- **Dark mode** functionality for a customized user experience
- **Notifications** when new recipes are generated

## Setup and Installation

### Prerequisites
- **Node.js** installed
- **React.js** for building the UI
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router DOM** for routing

### Steps

1. **Clone the repository** and navigate to the frontend directory:
    ```bash
    git clone https://github.com/yourusername/Personalized-Recipe-Generator

    cd Personalized-Recipe-Generator/frontend
    ```

2. **Install required dependencies**:
    ```bash
    npm install
    ```

3. **Configure environment variables** in `.env`:
    ```bash
    REACT_APP_API_URL=http://localhost:5000
    ```

    - **REACT_APP_API_URL**: This is the base URL for the backend API. Ensure it points to where the backend is running, either locally or on a server.

4. **Start the frontend development server**:
    ```bash
    npm start
    ```

The frontend will run at `http://localhost:3000`.

## Docker Setup

You can run the frontend inside a Docker container for easier deployment.

### Docker Installation Instructions

1. **Install Docker** on your machine: You can follow the instructions for your operating system [here](https://docs.docker.com/get-docker/).

2. **Build the Docker image** for the frontend:
    ```bash
    docker build -t mealmaker-frontend .
    ```

3. **Run the container**:
    ```bash
    docker run -p 3000:3000 mealmaker-frontend
    ```

4. **Check the logs** to ensure the frontend is running:
    ```bash
    docker logs <container_id>
    ```

5. **Access the frontend** at `http://localhost:3000`.