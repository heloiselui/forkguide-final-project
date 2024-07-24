import React, { useState, useEffect } from "react";
import { SPOONACULAR_API_KEY } from "../../config";

function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`)
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.error("Error fetching recipe image");
      });
  }, [meal.id]);

  return (
    <article>
      <h1>{meal.title}</h1>
      <img src={imageUrl} alt="Recipes Images" />
      <ul className="instructions">
        <li>Preparation time: {meal.readyInMinutes} mins</li>
        <li>Serves: {meal.servings}</li>
      </ul>

      <a href={meal.sourceUrl}>View Recipe</a>
    </article>
  );
}

export default Meal;