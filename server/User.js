const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    validate: {
      validator: function (value) {
        return /^(?!.*\.{2})[a-zA-Z0-9._%+-]{1,38}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
    },
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
      },
    },
  },
});
userSchema.pre('save', function (next) {
  let self = this;
  bcrypt.hash(self.password, 10, function (error, hashedPassword) {
    if (error) {
      console.log('hashed fail');
      return next(error);
    }
    console.log('hash sucesfuli set');
    self.password = hashedPassword;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);
