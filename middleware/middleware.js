// setup global middleware here

var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function(app) {
  app.use(cors({
    origin: 'http://localhost:4200' //dev server
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};
