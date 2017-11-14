const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, function(err) {
  if(err) {
    console.log('CANNOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

//Provide access to client
app.use(express.static(__dirname + '/client/dist/'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(3000, function() {
  console.log('Listening to port 3000');
});