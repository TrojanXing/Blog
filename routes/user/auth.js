const User = require('../../models/user');
const mongoose = require('mongoose');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

mongoose.Promise = global.Promise;

router.post('/register', (req, res) => {
  console.log(req.body.email);
  if (!req.body.email) {
    res.json({ success: false, message: 'You must provide an e-mail'});
  } else if (!req.body.username) {
    res.json({ success: false, message: 'You must provide an username'});
  } else if (!req.body.password) {
    res.json({ success: false, message: 'You must provide an password'});
  } else {
    let user = new User({
      email: req.body.email.toLowerCase(),
      username: req.body.username.toLowerCase(),
      password: req.body.password
    });
    user.save((err) => {
      if(err) {
        if (err.code === 11000) {
          res.json({ success: false, message: 'User or email already exist'});
        } else {
          if(err.errors) {
            if(err.errors.email) {
              res.json({ success: false, message: err.errors.email.message});
            }
            if(err.errors.username) {
              res.json({ success: false, message: err.errors.username.message});
            }
            if(err.errors.password) {
              res.json({ success: false, message: err.errors.password.message, err});
            } else {
              res.json({ success: false, message: 'Cannot save user.', err});
            }
          } else {
            res.json({ success: false, message: 'Cannot save user.', err});
          }
        }

      } else {
        res.json({ success: true, message: 'User saved'});
      }
    });
  }
});

router.get('/checkemail/:email', (req, res) => {
  if(!req.params.email) {
    res.json({ success: false, message: 'Email was not provided' });
  } else {
    User.findOne({email: req.params.email}, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });

      } else {
        if (user) {
          res.json({ success: false, message: 'Email is alread exist' });
        } else {
          res.json({ success: true, message: 'Email is available' });
        }
      }
    });
  }
});

router.get('/checkusername/:username', (req, res) => {
  // console.log('get request');
  if(!req.params.username) {
    res.json({ success: false, message: 'Username was not provided' });
  } else {
    User.findOne({username: req.params.username}, (err, user) => {
      if (err) {
        res.json({ success: false, message: err });

      } else {
        if (user) {
          res.json({ success: false, message: 'Username is alread exist' });
        } else {
          res.json({ success: true, message: 'Username is available' });
        }
      }
    });
  }
});

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    console.log(req.body.username);
    console.log(req.body.password);
    res.json({ success: false, message: 'No username or password is provided'})
  } else {
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) {
        res.json({ success: false, message:err });
      } else {
        if (user) {
          const isMatch = user.authenticate(req.body.password);
          if (isMatch) {
            const token = jwt.sign({ userId: user._id }, config. secret, {expiresIn: '1h'});
            res.json({ success: true, message: 'Login Success', token: token, user: {username: user.username}});
          } else {
            res.json({ success: false, message: 'Wrong password' });
          }
        } else {
          res.json({ success: false, message: 'Username not found' });
        }
      }
    });
  }
});

module.exports = router;