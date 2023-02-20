import React, { useState, useEffect, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
// import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { blue, deepPurple } from "@mui/material/colors";
import LoginIcon from '@mui/icons-material/Login';
// import CardMedia from "@mui/material/CardMedia";
// import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import '../index.css'; //fonts
import { Form, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './../useAuth.jsx';
import usePasswordToggle from './usePasswordToggle';
import UserContext from './../UserContext.js';
import { loginNotify, incorrectCredentialsNotify } from './../Notifications.js';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" to="https://github.com/m1ckeyyy">
        m1ckeyyy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login = () => {
  // use Context
  // const { noti, setNoti } = useContext(NotificationContext);
  // console.log(noti, setNoti);
  const { setAuthentication, authenticated } = useContext(UserContext);
  // console.log('AU: ', authenticated);

  const [passwordInputType, toggleIcon] = usePasswordToggle();
  const navigate = useNavigate();
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
  const submitHandler = async (data) => {
    data.rememberMe = rememberMe;
    console.log(data);

    fetch('https://qhc5nx-8080.preview.csb.app/login', {
      //https://qhc5nx-8080.preview.csb.app/login
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          loginNotify();
          reset();
          return res.json();
        } else if (res.status === 401 || res.status === 404) {
          incorrectCredentialsNotify();
        }
      })
      .then((res) => setAuthentication(res))
      .catch((error) => console.error(error));
  };

  const paperStyle = {
    padding: '20px 20px 25px 20px',
    // height: '40vh',
    width: 360,
    margin: '18vh auto',
  };
  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto Mono',
      h1: {
        fontSize: 32,
        fontWeightLight: 200,
      },
      h2: {
        fontSize: 13,
      },
    },
  });

  const signInStyle = { margin: '20px 0 ' };
  const btnStyle = { margin: '5px 0 15px 0', backgroundColor: 'rgba(166, 198, 96, 0.8)' };
  const inputStyle = {
    // padding: '16.5px 14px',
    margin: '10px 0 0 0',
  };
  const rememberMeStyle = {
    marginTop: '5px',
    fontSize: '12px',
    padding: '0px',
  };
  const forgotPassStyle = { margin: '0 0 5px 0' };
  const avatarStyle = { backgroundColor: 'rgba(166, 198, 96, 0.8)' };
  const registerRouteStyle = {
    color: 'black',
    fontSize: '13px',
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" alignItems="center" style={{ height: '100vh' }}>
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
              label="Email"
              id="email"
              placeholder="Enter Email"
              style={inputStyle}
              fullWidth
              autoFocus
              {...register('email', {
                required: 'Email is required.',
                maxLength: {
                  value: 50,
                  message: 'Exceeded maximum length',
                },
                pattern: {
                  value: /^(?!.*\.{2})[a-zA-Z0-9._%+-]{1,38}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email',
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              id="password"
              placeholder="Enter Password"
              style={inputStyle}
              type={passwordInputType}
              fullWidth
              {...register('password', {
                required: 'Password is required.',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                  message: 'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number',
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: <Button sx={{ color: 'rgba(166, 198, 96, 1)', maxWidth: 30, maxHeight: 30, minWidth: 30, minHeight: 30 }}>{toggleIcon}</Button>,
              }}
            />

            {/* </TextField> */}
            <FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="Remember me" onClick={handleCheckbox}></FormControlLabel>
            <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
              Sign In
            </Button>
          </form>
          <Typography variant="h2" style={forgotPassStyle}>
            <Link to="#" target="_blank">
              Forgot password?
            </Link>
          </Typography>
          <Typography variant="h2">
            Don't have an account?{' '}
            <Link to="/register">
              <Button style={registerRouteStyle}>Sign Up</Button>
            </Link>
          </Typography>
        </Paper>
        <Copyright sx={{ mt: 3, position: 'absolute' }} />
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
