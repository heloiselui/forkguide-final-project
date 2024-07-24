import React, { useState } from "react";
import MealList from "./MealList";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NutritionChatBot from "./ChatBot";
import styles from "./MainApp.module.css";
import { SPOONACULAR_API_KEY } from "../../config";

function MainApp() {
	const [mealData, setMealData] = useState(null);
	const [calories, setCalories] = useState(2000);

	const getMealData = () => {
		fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${SPOONACULAR_API_KEY}&timeFrame=day&targetCalories=${calories}`)
			.then((response) => response.json())
			.then((data) => {
				setMealData(data);
			})
			.catch(() => {
				console.error("Error fetching meal data");
			});
	};

	const handleChange = (e) => {
		setCalories(e.target.value);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div>
			<Header onLogout={handleLogout} />

			<div className={styles.wrapper}>
				<aside>
					<Sidebar />
				</aside>
				<main>
					<h1>Planner</h1>
					<section className={styles.controls}>
						<input
							type="number"
							placeholder="Calories (e.g. 2000)"
							onChange={handleChange}
						/>
						<button onClick={getMealData}>Get Daily Meal Plan</button>
					</section>
					{mealData && <MealList mealData={mealData} />}
				</main>
			</div>

			<NutritionChatBot />
		</div>
	);
}

export default MainApp;