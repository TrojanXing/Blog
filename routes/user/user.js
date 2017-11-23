const User = require('../../models/user');
const mongoose = require('mongoose');
const router = require('express').Router();
const verifyToken = require('../routesMiddleware').verifyToken;

/**
 * Middleware
 * Grab token, all operation need auth blow this
 */
router.use((req, res, next) => verifyToken(req, res, next));

/**
 * Get user profile
 */

router.get('/profile', (req, res) => {
  User.findOne({ _id: req.decoded.userId}).select('username email').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err});
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found' });
      } else {
        res.json({ success: true, user: user});
      }
    }
  })
});

router.get('/allUsers', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json({ success: false, message: err })
    } else {
      if (!users) {
        res.json({ success: false, message: 'Users Not Found'});
      } else {
        res.json({  success: true, users: users });
      }
    }
  });
});



module.exports = router;