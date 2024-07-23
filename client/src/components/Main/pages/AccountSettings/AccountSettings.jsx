import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import styles from "./AccountSettings.module.css";
import { Eye, EyeSlash } from "phosphor-react";
import NutritionChatBot from "../../ChatBot";

const AccountSettings = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
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
        const { data } = await axios.get("http://localhost:8080/api/users/me", {
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
      const { data: res } = await axios.put("http://localhost:8080/api/users/me", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(res.message);
      setError("");
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
              disabled
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Height (cm)"
              name="height"
              onChange={handleChange}
              value={data.height}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              name="weight"
              onChange={handleChange}
              value={data.weight}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              onChange={handleChange}
              value={data.age}
              className={styles.input}
            />
            <select
              name="gender"
              onChange={handleChange}
              value={data.gender}
              className={styles.input}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className={styles.password_container}>
              <input
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
            <div className={styles.password_container}>
              <input
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