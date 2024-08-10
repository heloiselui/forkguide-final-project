import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/MainApp";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ShoppingList from './components/Main/pages/ShoppingList/ShoppingList';
import RecipesLibrary from './components/Main/pages/RecipesLibrary/RecipesLibrary';
import AccountSettings from './components/Main/pages/AccountSettings/AccountSettings';

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			{user && <Route path="/shopping-list" exact element={<ShoppingList />} />}
			{user && <Route path="/recipes-library" exact element={<RecipesLibrary />} />}
			{user && <Route path="/account-settings" exact element={<AccountSettings />} />}
		</Routes>
	);
}

export default App;