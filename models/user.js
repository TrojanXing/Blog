const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
const Scheme = mongoose.Schema;

// Define validator
function validEmailChacker(email) {
  let reg = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$', 'g');
  return reg.test(email);
}
function emailLengthChedker(email) {
  if (!email) {
    return false;
  } else {
    return email.length > 5 && email.length < 20;
  }
}

let emailValidators = [
  {
    validator: validEmailChacker,
    message: 'Must be a valid email'
  },
  {
    validator: emailLengthChedker,
    message: 'Email length should be 5~20'
  }
];

function usernameChecker(username) {
  let reg = new RegExp('^[a-zA-Z0-9_-]{3,15}$');
  return reg.test(username);
}
let usernameValidators = [
  {
    validator: usernameChecker,
    message: 'User name can only contain letter, number, - and _, and length should between 3-15'
  }
];

function passwordLengthChecker(password) {
  if (!password) {
    return false;
  } else {
    return  password.length > 8 && password.length < 20;
  }
}

function validPasswordChecker(password) {
  if (!password) {
    return false;
  } else {
    let reg = new RegExp(/^(?=.*\d)(?=.*?[A-Z])(?=.*?[a-z]).{8,20}$/);
    return reg.test(password);
  }
}

let passwordValidators = [
  {
    validator: passwordLengthChecker,
    message: 'Password Length must be 8 ~ 20'
  },
  {
    validator: validPasswordChecker,
    message: 'Password include at least one upper case letter, one lower case letter, and one numeric digit.'
  }
];

// User Schema
const userSchema = new Scheme({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: emailValidators
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: usernameValidators
  },
  password: {
    type: String,
    require: true,
    validate: passwordValidators
  }
});

/**
 * encrypt password before store it in database
 */
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = this.encryptPassword(this.password);
    next();
  } else {
    return next();
  }
});

userSchema.methods = {
  authenticate: function (plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
  },

  encryptPassword: function (plainPassword) {
    if (!plainPassword) {
      return '';
    } else {
      // let salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainPassword);
    }
  }

};

module.exports = mongoose.model('User', userSchema);
