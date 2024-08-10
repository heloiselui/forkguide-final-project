import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import styles from "./AccountSettings.module.css";
import { Eye, EyeSlash } from "phosphor-react";
import NutritionChatBot from "../../ChatBot";
import { API_BASE_URL } from "../../../../config";

const AccountSettings = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    weightGoal: "",
    password: "",
    newPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState({ password: false, newPassword: false });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData({ ...data, password: "", newPassword: "" });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data: res } = await axios.put(`${API_BASE_URL}/api/users/me`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(res.message);
      setError("");
      window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setSuccess("");
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = '/login';
  };

  return (
    <div className={styles.account_settings}>
      <Header onLogout={handleLogout} />
      <div className={styles.main_content}>
        <Sidebar />
        <div className={styles.content}>
          <h1>Account Settings</h1>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <label htmlFor="firstName" className={styles.label}>First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
              autoComplete="given-name"
            />
            <label htmlFor="lastName" className={styles.label}>Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
              autoComplete="family-name"
            />
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              disabled
              className={styles.input}
              autoComplete="username"
            />
            <label htmlFor="height" className={styles.label}>Height (cm)</label>
            <input
              id="height"
              type="number"
              placeholder="Height (cm)"
              name="height"
              onChange={handleChange}
              value={data.height}
              className={styles.input}
              autoComplete="height"
            />
            <label htmlFor="weight" className={styles.label}>Weight (kg)</label>
            <input
              id="weight"
              type="number"
              placeholder="Weight (kg)"
              name="weight"
              onChange={handleChange}
              value={data.weight}
              className={styles.input}
              autoComplete="weight"
            />
            <label htmlFor="weightGoal" className={styles.label}>Weight Goal (kg)</label>
            <input
              id="weightGoal"
              type="number"
              placeholder="Weight Goal (kg)"
              name="weightGoal"
              onChange={handleChange}
              value={data.weightGoal}
              className={styles.input}
              autoComplete="weight-goal"
            />
            <label htmlFor="age" className={styles.label}>Age</label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              name="age"
              onChange={handleChange}
              value={data.age}
              className={styles.input}
              autoComplete="age"
            />
            <label htmlFor="gender" className={styles.label}>Gender</label>
            <select
              id="gender"
              name="gender"
              onChange={handleChange}
              value={data.gender}
              className={styles.input}
              autoComplete="sex"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label htmlFor="password" className={styles.label}>Current Password</label>
            <div className={styles.password_container}>
              <input
                id="password"
                autoComplete="current-password"
                type={showPassword.password ? "text" : "password"}
                placeholder="Current Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                className={styles.password_input}
              />
              {showPassword.password ? (
                <EyeSlash onClick={() => togglePasswordVisibility('password')} className={styles.togglePassword} />
              ) : (
                <Eye onClick={() => togglePasswordVisibility('password')} className={styles.togglePassword} />
              )}
            </div>
            <label htmlFor="newPassword" className={styles.label}>New Password</label>
            <div className={styles.password_container}>
              <input
                id="newPassword"
                autoComplete="new-password"
                type={showPassword.newPassword ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                onChange={handleChange}
                value={data.newPassword}
                className={styles.password_input}
              />
              {showPassword.newPassword ? (
                <EyeSlash onClick={() => togglePasswordVisibility('newPassword')} className={styles.togglePassword} />
              ) : (
                <Eye onClick={() => togglePasswordVisibility('newPassword')} className={styles.togglePassword} />
              )}
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            {success && <div className={styles.success_msg}>{success}</div>}
            <button type="submit" className={styles.save_btn}>
              Save
            </button>
          </form>
        </div>
      </div>
      <NutritionChatBot />
    </div>
  );
};

export default AccountSettings;