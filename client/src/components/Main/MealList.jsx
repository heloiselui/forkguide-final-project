import React from "react";
import Meal from "./Meal";
import styles from "./MealList.module.css";

export default function MealList({ mealData }) {
  const nutrients = mealData.nutrients;

  return (
    <main className={styles.meal_list}>
      <section className={styles.meal_list_nutrients}>
        <h1>Macros</h1>
        <ul>
          <li>Calories: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Fat: {nutrients.fat.toFixed(0)}</li>
          <li>Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className={styles.meal_list_meals}>
        {mealData.meals.map((meal) => {
          return (
            <div className={styles.meal_list_meal} key={meal.id}>
              <Meal meal={meal} />
            </div>
          );
        })}
      </section>
    </main>
  );
}