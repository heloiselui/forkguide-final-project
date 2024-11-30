import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { Eye, EyeSlash } from "phosphor-react";
import logo from "../../assets/logo.svg";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<img className={styles.logo} src={logo} alt="Logo" />
						<h1>Login</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
							autoComplete="email"
						/>
						<div className={styles.password_container}>
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required
								className={styles.input}
								autoComplete="current-password"
							/>
							{showPassword ? (
								<EyeSlash onClick={togglePasswordVisibility} className={styles.togglePassword} />
							) : (
								<Eye onClick={togglePasswordVisibility} className={styles.togglePassword} />
							)}
						</div>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.login_btn}>
							Login
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New to ForkGuide?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
