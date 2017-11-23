const User = require('../../models/user');
const router = require('express').Router();
const verifyToken = require('../routesMiddleware').verifyToken;

router.get('/publicProfile/:username', (req, res) => {
  if(!req.params.username) {
    res.json({ success: false, message: 'username is not provided'});
  } else {
    User.find({ username: req.params.username })
      .select('username email')
      .exec((err, user) => {
        if (err) {
          res.json({ success: false, message: 'Something wrong with the database'});
        } else {
          if (!user) {
            res.json({ success: false, message: 'Cannot get user with given name'});
          } else {
            res.json({ success: true, user: user});
          }
        }
      });
  }
});

router.get('/allUsers', (req, res) => {
  User.find({})
    .select('username email')
    .exec((err, users) => {
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
/**
 * Middleware
 * Grab token, all operation need auth blow this
 */
// router.use((req, res, next) => verifyToken(req, res, next));

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

module.exports = router;