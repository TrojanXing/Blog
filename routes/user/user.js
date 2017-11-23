const User = require('../../models/user');
const mongoose = require('mongoose');
const router = require('express').Router();

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