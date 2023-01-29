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
    origin: 'https://qhc5nx-5173.preview.csb.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://qhc5nx-5173.preview.csb.app');
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
  // DENY DUPLICATE USERNAMES
  const { email, firstName, lastName, password } = req.body;
  const newUser = new User({ firstName, lastName, email, password });

  console.log('server.js,/register,newUser: ', newUser);
  const validationError = newUser.validateSync({ email, password });
  if (validationError) {
    const { message } = validationError.errors.password || validationError.errors.email;
    console.log(message);
    return res.status(400).send({ error: message });
  }
  newUser.save((error) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error saving user to database');
    } else {
      console.log('user yes');
      //   req.flash("success", "You are now registered and can log in");
      res.status(200).json({ redirect: '/login' });
    }
  });
});

app.post('/login', (req, res) => {
  try {
    let { email, firstName, lastName, password } = req.body;
    console.log('logging in: ', email, firstName, lastName, '...');

    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).send({
          access: false,
          message: `user ${email} not found, authorization failed`,
        });
      }

      bcrypt.compare(password, user.password).then((isMatching) => {
        if (isMatching) {
          password = user.password;
          req.session.authenticated = true;
          req.session.user = {
            email,
            password,
          };
          console.log(email, password, firstName, lastName);
          const payload = { email, firstName, lastName, password };
          const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
          console.log(payload);
          // res.json({ accessToken: accessToken });
          res.status(200).send({
            access: true,
            token: accessToken,
            email: email,
          });
        } else {
          console.log('notMAtching');
          res.status(401).send({ access: false, message: 'Incorrect password' });
        }
      });
    });
  } catch (err) {
    res.status(500).send({ access: false, message: 'An error occured' });
    console.log(err);
  }
});

app.get('/auth', (req, res, next) => {
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
    // const firstNamed = user.firstName;
    // console.log(firstNamed);
    return res.status(200).send({
      message: `${user} was verified with JWT, grant access to homepage`,
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
