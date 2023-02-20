const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const Cookies = require('js-cookie');
require('dotenv').config();
const uri = process.env.MONGO_URI;
app.use(
  cors({
    origin: 'http://localhost:5173', //https://qhc5nx-5173.preview.csb.app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:5173'); //https://qhc5nx-5173.preview.csb.app
  // res.set('Access-Control-Allow-Origin', 'http://localhost:5173'); //https://qhc5nx-5173.preview.csb.app

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: 'my-sgfrdesgfr6grdterdgrtegerggre432ecret', // a secret key to sign the session ID cookie
    cookie: { maxAge: Infinity },
    resave: false, // don't save the session if it wasn't modified
    saveUninitialized: true, // don't create a session until something is stored
  })
);
mongoose.set('strictQuery', false); //supress warning
mongoose
  .connect(uri)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.error(error));

const User = require('./User');

app.post('/', (req, res) => {
  const userCookie = req.cookies.user;
  console.log(userCookie);
  res.status(200).send({ message: `${userCookie}` });
});

app.post('/register', (req, res) => {
  let { email, firstName, lastName, password } = req.body;
  email = email.toLowerCase();
  const newUser = new User({ firstName, lastName, email, password });

  console.log('server.js,/register,newUser: ', newUser);
  const validationError = newUser.validateSync({ email, password });
  if (validationError) {
    const { message } = validationError.errors.password || validationError.errors.email;
    console.log(message);
    return res.status(400).send({ error: message });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      console.log('There is already a user with that email');
      return res.status(409).send({ error: 'There is already a user with that email' });
    }
    newUser.save((error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error saving user to database');
      } else {
        console.log('user yes');
        res.status(200).json({ redirect: '/login' });
      }
    });
  });
});

app.post('/login', (req, res) => {
  try {
    let { email, password, rememberMe } = req.body;
    email = email.toLowerCase();
    console.log('logging in: ', email, 'remember: ', rememberMe);
    //wyszukaj firstName na podstawie emaila i zapisz go uzywajac payload w jwt.sign()
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).send(`Invalid email or password`);
      }

      bcrypt.compare(password, user.password).then((isMatching) => {
        if (isMatching) {
          password = user.password;
          console.log(email, password);
          const firstName = user.firstName;
          const lastName = user.lastName;
          const payload = { email, firstName, lastName };
          const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
          const maxAge = rememberMe ? 21600000 : 21600000;
          res.cookie('access_token', accessToken, { httpOnly: false, secure: false });
          res.status(200).send({
            email: email,
            firstName: firstName,
            lastName: lastName,
          });
        } else {
          console.log('notMAtching');
          res.status(401).send({ message: 'Incorrect password' });
        }
      });
    });
  } catch (err) {
    res.status(500).send({ access: false, message: 'An error occured' });
    console.log(err);
  }
});

app.get('/auth', (req, res, next) => {
  console.log('RRR:', req.cookies.access_token);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == 'undefined') {
    return res.status(401).send({ message: 'token is not defined' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('token; ', token, 'jwt verifcation ERROR: ');
      return res.status(403);
    }
    console.log('user verified with JWT');
    console.log('user::,', user);
    req.user = user;
    return res.status(200).send({
      message: `${user.firstName} was verified with JWT, grant access to homepage`,
      user: user,
    });
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log('logout error', err);
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    }
  });
});

app.post('/test', (req, res) => {
  res.cookie('access_tokend', 'accessTokend', { httpOnly: false, secure: false });
  res.status(200).send({
    message: 'test token sent',
  });
});

function authenticateToken(req, res, next) {
  const token = req.headers && req.headers.cookie.split(' ')[1];
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    console.log('user verified with JWT');
    req.user = user;
    next();
  });
}
app.listen(port, () => {
  console.log('Running on http://localhost:8080/');
});
