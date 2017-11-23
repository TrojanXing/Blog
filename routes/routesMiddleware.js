const jwt = require('jsonwebtoken');
const config = require('../config/config');


exports.verifyToken = (req, res, next) => {
  const token = req.headers['auth'];
  if (!token) {
    res.json({ success: false, message: 'No token provided' })
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Token invalid: ' + err })
      } else {
        req.decoded = decoded;
        next();
      }
    })
  }
};