import React, { useState } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import axios from 'axios';
import styles from './RecipesLibrary.module.css';
import NutritionChatBot from "../../ChatBot";

const RecipesLibrary = () => {
  const [query, setQuery] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleSearchByQuery = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          query,
          apiKey: '1b248edb58144f0f9911e72fcec66ce7'
        }
      });
      setRecipes(response.data.results);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching recipes.');
      console.error(err);
    }
  };

  const handleSearchByIngredient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {
        params: {
          ingredients: ingredient,
          apiKey: '1b248edb58144f0f9911e72fcec66ce7'
        }
      });
      setRecipes(response.data);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching recipes.');
      console.error(err);
    }
  };

  return (
    <div className={styles.recipes_library}>
      <Header />
      <div className={styles.main_content}>
        <Sidebar />
        <div className={styles.content}>
          <h1>Recipes Library</h1>

          <div className={styles.search_forms}>
            <form onSubmit={handleSearchByQuery} className={styles.search_form}>
              <input
                type="text"
                placeholder="Search for recipes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.search_input}
              />
              <button type="submit" className={styles.search_button}>Search by Recipe</button>
            </form>

            <form onSubmit={handleSearchByIngredient} className={styles.search_form}>
              <input
                type="text"
                placeholder="Search by ingredients..."
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className={styles.search_input}
              />
              <button type="submit" className={styles.search_button}>Search by Ingredient</button>
            </form>
          </div>

          {error && <p className={styles.error_msg}>{error}</p>}
          <div className={styles.recipes_container}>
            {recipes.map((recipe) => (
              <div key={recipe.id} className={styles.recipe_card}>
                <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer">
                  <h2>{recipe.title}</h2>
                  <img src={recipe.image} alt={recipe.title} className={styles.recipe_image} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NutritionChatBot />
    </div>
  );
}

export default RecipesLibrary;

