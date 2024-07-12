import React, { useEffect } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import NutritionChatBot from "../../ChatBot";
import './RecipesLibrary.module.css'; // 

const RecipesLibrary = () => {
  useEffect(() => {
    console.log('RecipesLibrary component loaded');
  }, []);


  return (
    <div className="recipes-library">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          {/* Conteúdo específico da página RecipesLibrary */}
          <h1>Recipes Library</h1>
          <p>Bem-vindo à biblioteca de receitas!</p>
          {/* Adicione mais conteúdo conforme necessário */}
        </div>
      </div>
      <NutritionChatBot />
    </div>
  );
}

export default RecipesLibrary;
