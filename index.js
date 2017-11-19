const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const auth = require('./routes/authentication');
const blog = require('./routes/blog');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, function(err) {
  if(err) {
    console.log('CANNOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:4200' //dev server
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Provide access to client
app.use(express.static(__dirname + '/client/dist/'));
app.use('/auth', auth);
app.use('/blog', blog);



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(3000, function() {
  console.log('Listening to port 3000');
});