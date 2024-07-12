import React, { useEffect } from 'react';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import NutritionChatBot from "../../ChatBot";
import './AccountSettings.module.css'; // 

const AccountSettings = () => {
  useEffect(() => {
    console.log('AccountSettings component loaded');
  }, []);


  return (
    <div className="account-settings">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          {/* Conteúdo */}
          <h1>Account Settings</h1>
          <p>Bem-vindo se seu perfil</p>
          {/* Conteúdo */}
        </div>
      </div>
      <NutritionChatBot />
    </div>
  );
}

export default AccountSettings;