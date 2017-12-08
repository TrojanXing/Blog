const User = require('../../models/user');
const router = require('express').Router();
const verifyToken = require('../routesMiddleware').verifyToken;

/**
 * Middleware
 * Grab token, all operation need auth blow this
 */
router.use((req, res, next) => verifyToken(req, res, next));

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
          if (user.length === 0) {
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

/**
 * Add friend
 */
router.post('/addFriend/:friendname', (req, res) => {
  if(!req.params.friendname) {
    res.json({ success: false, message: 'No friend provided'});
  } else {
    User.findOne({ _id: req.decoded.userId }, (err, user) => {
      if(err) {
        res.json({ success: false, message: 'Cannot find user'});
      } else {
        if(!user) {
          res.json({ success: false, message: 'User no not exist'});
        } else {
          User.findOne({ username: req.params.friendname }, (err, friend) => {
            if(err) {
              res.json({ success: false, message: 'Cannot find your friend'});
            } else {
              if(!friend) {
                res.json({ success: false, message: 'Friend do not exist'});
              } else {
                let friends = user.friends;
                friends.push(friend.username);
                user.update({friends: friends}, (err) => {
                  if (err) {
                    res.json({ success: false, message: err.message});
                  } else {
                    res.json({ success: true, message: 'Friend added to your contact' ,user: user})
                  }
                });
              }
            }
          })
        }
      }
    });
  }
});

module.exports = router;