import React, { useState } from "react";
import MealList from "./MealList";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./MainApp.module.css";

function MainApp() {
	const [mealData, setMealData] = useState(null);
	const [calories, setCalories] = useState(2000);


	const getMealData = () => {
		fetch(
			`https://api.spoonacular.com/mealplanner/generate?apiKey=1b248edb58144f0f9911e72fcec66ce7&timeFrame=day&targetCalories=${calories}`
		)
			.then((response) => response.json())
			.then((data) => {
				setMealData(data);
			})
			.catch(() => {
				console.log("error");
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
		</div>
	);
}

export default MainApp;