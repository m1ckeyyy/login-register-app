import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { blue, deepPurple } from "@mui/material/colors";
import LoginIcon from "@mui/icons-material/Login";
// import CardMedia from "@mui/material/CardMedia";
// import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

import "../index.css"; //fonts
import { Form } from "react-router-dom";
import { render, getByLabelText } from "react";
import { Select } from "@mui/material";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Copyright © "}
			<Link color="inherit" target="_blank" href="https://github.com/m1ckeyyy">
				m1ckeyyy
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const Login = () => {
	const [rememberMe, setRememberMe] = useState(false);
	const handleCheckbox = (e) => {
		setRememberMe(e.target.checked);
	};
	const {
		reset,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	// const onSubmit = (data) => console.log(data);
	// console.log(errors);
	const submitHandler = (data) => {
		data.rememberMe = rememberMe;
		reset();
		fetch("https://fnvzol-8080.preview.csb.app/login", {
			mode: "cors",
			credentials: "include",
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.access) {
					console.log(res.token);
					Cookies.remove("access_token");
					Cookies.set("access_token", res.token, {
						expires: 7,
						secure: true,
						httpOnly: true,
					});
					console.log(Cookies.get("access_token"));
				} else {
					console.log("(Loggin.jsx) ERROR: ", res.message);
				}
			})
			.catch((error) =>
				console.error(
					"Failed to fetch, check if server is up and running: ",
					error
				)
			);
	};

	const paperStyle = {
		padding: "20px 20px 25px 20px",
		// height: '40vh',
		width: 335,
		margin: "18vh auto",
	};
	const theme = createTheme({
		typography: {
			fontFamily: "Roboto Mono",
			h1: {
				fontSize: 32,
				fontWeightLight: 200,
			},
			h2: {
				fontSize: 13,
			},
		},
	});
	const signInStyle = { margin: "20px 0 " };
	const btnStyle = { margin: "5px 0 15px 0" };
	const inputStyle = {
		// padding: '16.5px 14px',
		margin: "10px 0 0 0",
	};
	const rememberMeStyle = {
		marginTop: "5px",
		fontSize: "12px",
		padding: "0px",
	};
	const forgotPassStyle = { margin: "0 0 5px 0" };
	const avatarStyle = { backgroundColor: "#a6c660" };
	return (
		<ThemeProvider theme={theme}>
			<Grid
				container
				direction="column"
				alignItems="center"
				style={{ height: "100vh" }}
			>
				<Paper elevation={10} style={paperStyle}>
					<Grid align="center">
						<Avatar style={avatarStyle}>
							<LoginIcon />
						</Avatar>
						<Typography variant="h1" style={signInStyle}>
							Sign In
						</Typography>
					</Grid>
					<form onSubmit={handleSubmit(submitHandler)}>
						<TextField
							label="Username"
							id="username"
							placeholder="Enter Username"
							style={inputStyle}
							fullWidth
							{...register("username", {
								required: "Username is required.",
								minLength: {
									value: 5,
									message: "Username needs to be at least 5 characters",
								},
							})}
							error={Boolean(errors.username)}
							helperText={errors.username?.message}
						/>
						<TextField
							label="Password"
							id="password"
							placeholder="Enter Password"
							style={inputStyle}
							type="password"
							fullWidth
							{...register("password", {
								required: "Password is required.",
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
									message:
										"Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number",
								},
							})}
							error={Boolean(errors.password)}
							helperText={errors.password?.message}
						/>
						<FormControlLabel
							control={<Checkbox name="checkedB" color="primary" />}
							label="Remember me"
							onClick={handleCheckbox}
						></FormControlLabel>
						<Button
							type="submit"
							color="primary"
							variant="contained"
							style={btnStyle}
							fullWidth
						>
							Sign In
						</Button>
					</form>
					<Typography variant="h2" style={forgotPassStyle}>
						<Link href="#" target="_blank">
							Forgot password?
						</Link>
					</Typography>
					<Typography variant="h2">
						Don't have an account?{" "}
						<Link href="#" target="_blank">
							Sign Up
						</Link>
					</Typography>
				</Paper>
				<Copyright sx={{ mt: 3, position: "absolute" }} />
			</Grid>
		</ThemeProvider>
	);
};
export default Login;
