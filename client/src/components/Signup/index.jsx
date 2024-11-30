import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { Eye, EyeSlash } from "phosphor-react";
import logo from "../../assets/logo.svg";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		height: "",
		weight: "",
		age: "",
		gender: "",
		weightGoal: "",
	});
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (error.response && error.response.status >= 400 && error.response.status <= 500) {
				setError(error.response.data.message);
			}
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back! </h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<img className={styles.logo} src={logo} alt="Logo" />
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
							autoComplete="given-name"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
							autoComplete="family-name"
						/>
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
								autoComplete="new-password"
							/>
							{showPassword ? (
								<EyeSlash onClick={togglePasswordVisibility} className={styles.togglePassword} />
							) : (
								<Eye onClick={togglePasswordVisibility} className={styles.togglePassword} />
							)}
						</div>
						<input
							type="number"
							placeholder="Height (cm)"
							name="height"
							onChange={handleChange}
							value={data.height}
							required
							className={styles.input}
							autoComplete="height"
						/>
						<input
							type="number"
							placeholder="Weight (kg)"
							name="weight"
							onChange={handleChange}
							value={data.weight}
							required
							className={styles.input}
							autoComplete="weight"
						/>
						<input
							type="number"
							placeholder="Weight Goal (kg)"
							name="weightGoal"
							onChange={handleChange}
							value={data.weightGoal}
							required
							className={styles.input}
							autoComplete="weight-goal"
						/>
						<input
							type="number"
							placeholder="Age"
							name="age"
							onChange={handleChange}
							value={data.age}
							required
							className={styles.input}
							autoComplete="age"
						/>
						<select
							name="gender"
							onChange={handleChange}
							value={data.gender}
							required
							className={styles.input}
							autoComplete="sex"
						>
							<option value="" disabled>
								Select Gender
							</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.singup_btn}>
							Sign up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;