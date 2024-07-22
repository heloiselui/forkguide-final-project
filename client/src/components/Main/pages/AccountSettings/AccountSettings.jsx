import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import NutritionChatBot from "../../ChatBot";
import styles from './AccountSettings.module.css';


const AccountSettings = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Aqui você pode buscar os dados do usuário e preencher o estado
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };

    fetchData();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/api/users/me', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccess('Account updated successfully');
    } catch (error) {
      setError('Failed to update account');
    }
  };

  return (
    <div className={styles.account_settings}>
      <Header />
      <div className={styles.main_content}>
        <Sidebar />
        <div className={styles.content}>
          <h1>Account Settings</h1>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            {success && <div className={styles.success_msg}>{success}</div>}
            <button type="submit" className={styles.save_btn}>Save</button>
          </form>
          <NutritionChatBot />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;