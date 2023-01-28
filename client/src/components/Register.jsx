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
  const submitHandler = async (data) => {
    data.rememberMe = rememberMe;
    reset();
    fetch('http://localhost:8080/register', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        //
        signIn({ token: res.token, expiresIn: 3600, tokenType: 'Bearer', authState: { username: res.username } });
        console.log(res);
        if (res.access) {
          console.log(res.token);
          Cookies.remove('access_token');
          Cookies.set('access_token', res.token, {
            expires: 7,
            secure: true,
            // httpOnly: true,
          });
          setAuthentication(true);
          // console.log(authenticated);

          // navigate('/');
          // location.pathname === '/';
          // return <Navigate to="/" />;

          console.log('Register SET, Token: ', Cookies.get('access_token'));
        } else {
          console.log('(Loggin.jsx) ERROR: ', res.message);
        }
      })
      .catch((error) => console.error('Failed to fetch, check if server is up and running: ', error));
  };

  const paperStyle = {
    padding: '20px 20px 25px 20px',
    // height: '40vh',
    width: 335,
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
  const btnStyle = { margin: '5px 0 15px 0' };
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
  const avatarStyle = { backgroundColor: '#a6c660' };
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Register;
