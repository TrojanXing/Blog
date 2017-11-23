const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const config = require('./config/database');
const path = require('path');
const auth = require('./routes/user/authentication');
const blog = require('./routes/blog/blog');

const config = require(('./config/config'));

/**
 * Set up database
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, function(err) {
  if(err) {
    console.log('CANNOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.uri);
  }
});

/**
 * Set up global middleware
 */
require('./middleware/middleware')(app);

/**
 * Set up server
 */
app.use(express.static(__dirname + '/public'));
app.use('/auth', auth);
app.use('/blog', blog);
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

/**
 * Set up port
 */
app.listen(config.port, function() {
  console.log('Listening to port ' + config.port);
});