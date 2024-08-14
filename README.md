```markdown
# ForkGuide - Intelligent Food and Nutrition Planning Application 

Welcome to **ForkGuide**, a modern web application designed to help users manage their daily meals, shopping lists, and health goals effortlessly. This project was developed as the final assignment for the completion of my Higher Diploma in Computer Science, specialising in Software Development, at the National College of Ireland. It showcases a full-stack application built with React on the frontend and Node.js with Express and MongoDB Atlas on the backend. This README will guide you through the project's features and structure.

## Features

- **User Authentication**: Secure login and registration system with JWT-based authentication.
- **Meal Planner**: Generate daily meal plans based on your calorie intake.
- **Recipes Library**: Search for recipes by ingredients or recipe names.
- **Shopping List**: Create, update, and manage your shopping list with PDF export capability.
- **Account Settings**: Update your personal information, including height, weight, and weight goals.
- **Nutrition ChatBot**: An interactive chatbot that helps calculate daily caloric needs and water intake recommendations.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Phosphor-React**: For icons and UI components.
- **Axios**: For making HTTP requests to the back end.
- **CSS Modules**: For component-specific styles.

### Backend
- **Node.js**: For server-side scripting.
- **Express.js**: For building the RESTful API.
- **MongoDB Atlas**: cloud-hosted was used to store users data.
- **JWT**: For secure user authentication.
- **Bcrypt**: For hashing passwords.

## Project Structure

### Client Side
- **components**: Contains all React components, organised by pages and functionalities.
- **styles**: CSS modules for each component to ensure scoped styling.
- **config.js**: Configuration file for API keys and base URLs.

### Server Side
- **middleware**: Contains authentication and error handling middleware.
- **models**: Defines MongoDB schemas and models.
- **routes**: Handles API routing for user authentication and profile management.
- **db.js**: Handles MongoDB connection.

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed.
- **MongoDB** setup.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/heloiselui/forkguide-final-project.git
    ```

2. Install client-side dependencies:
    ```bash
    cd client
    npm install
    ```

3. Install server-side dependencies:
    ```bash
    cd server
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the `server` directory with the following:
      ```
      DB=your_mongodb_connection_string
      JWTPRIVATEKEY=your_jwt_private_key
      SALT=10
      ```
    - In the `client` directory, create a `.env` file with:
      ```
      REACT_APP_API_BASE_URL=http://localhost:8080
      REACT_APP_SPOONACULAR_API_KEY=your_spoonacular_api_key
      ```

### Running the Application

1. Start the server:
    ```bash
    cd server
    npm start
    ```

2. Start the client:
    ```bash
    cd client
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

