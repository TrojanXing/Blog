const Blog = require('../models/blog');
const mongoose = require('mongoose');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');

mongoose.Promise = global.Promise;

router.post('/newBlog', function(req, res) {
  res.send('test');
});

module.exports = router;