import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import Container from '@mui/material/Container';

import '../index.css'; //fonts
import { Form, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './../useAuth.jsx';
import LoadingScreen from './LoadingScreen';
import usePasswordToggle from './usePasswordToggle';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://github.com/m1ckeyyy">
        m1ckeyyy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Register = ({ setAuthentication }) => {
  const [passwordInputType, toggleIcon] = usePasswordToggle();

  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const submitHandler = async (data) => {
    console.log(data);
    fetch('http://localhost:8080/register', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          reset();
          navigate('/login');
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error('Failed to fetch, check if server is up and running: ', error));
  };

  const paperStyle = {
    padding: '20px 20px 25px 20px',
    // height: '40vh',
    width: 380,
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
  const btnStyle = { margin: '5px 0 15px 0', backgroundColor: 'rgba(0, 0, 0, 0.8)' };
  const inputStyle = {
    // padding: '16.5px 14px',
    margin: '10px 0 0 0',
  };
  const rememberMeStyle = {
    marginTop: '5px',
    fontSize: '12px',
    padding: '0px',
  };
  const avatarStyle = { backgroundColor: 'rgba(0, 0, 0, 0.8)' };
  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" alignItems="center" style={{ height: '100vh' }}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h1" style={signInStyle}>
              Sign Up
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register('firstName', {
                    required: 'First name is required.',
                    minLength: {
                      value: 2,
                      message: 'First name needs to be at least 2 characters',
                    },
                  })}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoFocus
                  {...register('lastName', {
                    required: 'Last name is required.',
                    minLength: {
                      value: 2,
                      message: 'Last name needs to be at least 2 characters',
                    },
                  })}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  placeholder="Enter Email"
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={passwordInputType}
                  id="password"
                  autoComplete="new-password"
                  placeholder="Enter Password"
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
                    endAdornment: <Button sx={{ color: 'black', maxWidth: 30, maxHeight: 30, minWidth: 30, minHeight: 30 }}>{toggleIcon}</Button>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive emails." />
              </Grid>
            </Grid>
            {/* 
            <TextField
              label="Password"
              id="password"
              placeholder="Enter Password"
              style={inputStyle}
              type="password"
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
            /> */}
            <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
              Sign In
            </Button>
          </form>
          <Typography variant="h2">
            Already a user? <Link href="/login">Sign Up</Link>
          </Typography>
        </Paper>
        <Copyright sx={{ mt: 3, position: 'absolute' }} />
      </Grid>
    </ThemeProvider>
  );
};
export default Register;
