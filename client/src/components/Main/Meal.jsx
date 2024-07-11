import React, { useState, useEffect } from "react";

function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=1b248edb58144f0f9911e72fcec66ce7&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("Error");
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
