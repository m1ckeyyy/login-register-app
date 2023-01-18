import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, deepPurple } from '@mui/material/colors';
import LoginIcon from '@mui/icons-material/Login';
import CardMedia from '@mui/material/CardMedia';

import '../index.css'; //fonts

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

const Login = () => {
  const paperStyle = {
    padding: '20px 20px 25px 20px',
    // height: '40vh',
    width: 280,
    margin: 'auto auto',
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
    margin: '5px 0 0 0',
  };
  const rememberMeStyle = { marginTop: '5px', fontSize: '12px', padding: '0px' };
  const forgotPassStyle = { margin: '0 0 5px 0' };
  const avatarStyle = { backgroundColor: '#a6c660' };
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
          <TextField label="Username" placeholder="Enter Username" style={inputStyle} fullWidth required />
          <TextField label="Password" placeholder="Enter Password" style={inputStyle} type="password" fullWidth required />
          <FormControlLabel control={<Checkbox name="checkedB" color="primary" />} label="Remember me" style={rememberMeStyle}></FormControlLabel>
          <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
            Sign In
          </Button>
          <Typography variant="h2" style={forgotPassStyle}>
            <Link href="#">Forgot password?</Link>
          </Typography>
          <Typography variant="h2">
            Don't have an account? <Link href="#">Sign Up</Link>
          </Typography>
        </Paper>
        <Copyright sx={{ mt: 3, position: 'absolute' }} />
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
