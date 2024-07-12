import React, { useEffect } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import NutritionChatBot from "../../ChatBot";
import './ShoppingList.module.css'; // 

const ShoppingList = () => {
  useEffect(() => {
    console.log('ShoppingList component loaded');
  }, []);


  return (
    <div className="shopping-list">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          {/* Conteúdo */}
          <h1>Shopping List</h1>
          <p>Bem-vindo se seu perfil</p>
          {/* Conteúdo */}
        </div>
      </div>
      <NutritionChatBot />
    </div>
  );
}

export default ShoppingList;