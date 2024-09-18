# Backend for MealMaker - Personalized AI Recipe Generator

## Overview

This backend is built using **Node.js**, **Express**, and **PostgreSQL** with **Prisma** as the ORM. It handles user authentication via **JWT**, recipe generation using **OpenAI**, email notifications with **Nodemailer**, and personalized settings such as dark mode.
Recipes are generated using OpenAI based on the user's dietary preferences and available ingredients. The backend sends a prompt to OpenAI's API with user preferences, and the response includes a personalized recipe. This functionality is protected by JWT, meaning only logged-in users can request personalized recipes.
### Key Features:
- **JWT-based user authentication**
- **Protected routes** for authenticated users
- **AI-powered recipe generation** based on user preferences (dietary requirements and available ingredients)
- **Recipe saving functionality**
- **Email notifications** for recipe suggestions

## Setup and Installation

### Prerequisites
- **Node.js** installed
- **PostgreSQL** running
- **Docker** (if using containerized setup)

### Steps

1. **Clone the repository** and navigate to the backend directory:
    ```bash
    git clone https://github.com/yourusername/Personalized-Recipe-Generator
    cd Personalized-Recipe-Generator/backend
    ```

2. **Install required packages**:
    ```bash
    npm install
    ```

3. **Configure environment variables** in `.env`:
    ```bash
    DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/dbname
    JWT_SECRET=your-secret-key
    
    // Nodemailer configuration
    EMAIL_USER=your-email
    APP_PASSWORD=your-email-app-password
    
    // OpenAI API for recipe generation
    OPENAI_API_KEY=your-openai-api-key
    ```

    - **DATABASE_URL**: Connection string for PostgreSQL.
    - **JWT_SECRET**: Secret key used for JWT authentication.
    - **EMAIL_USER** & **APP_PASSWORD**: Used for sending email notifications via Nodemailer. Generate an App Password if using services like Gmail.
    - **OPENAI_API_KEY**: API key for generating recipes using OpenAI. Obtain it from the [OpenAI website](https://platform.openai.com/signup).

4. **Initialize the database**:
    ```bash
    npx prisma migrate dev --name init
    ```

5. **Start the backend server**:
    ```bash
    npm start
    ```

The backend will run at `http://localhost:5000`.


## Docker Setup

You can also run the backend in a Docker container.

### Docker Installation Instructions

1. **Install Docker** on your machine: Follow the instructions for your operating system [here](https://docs.docker.com/get-docker/).

2. **Build the Docker image**:
    ```bash
    docker build -t mealmaker-backend .
    ```

3. **Run the container**:
    ```bash
    docker run -p 5000:3000 mealmaker-backend
    ```

4. **Check the logs** to ensure the server is running:
    ```bash
    docker logs <container_id>
    ```

5. **Access the backend** at `http://localhost:5000`.
