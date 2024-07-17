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
        </div>
      </div>
      <NutritionChatBot />
    </div>
  );
}

export default AccountSettings;