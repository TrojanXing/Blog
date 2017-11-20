const crypto = require('crypto').randomBytes(256).toString('hex');
module.exports = {
    // uri: 'mongodb://localhost:27017/myblog',
  uri:'mongodb://Xing:806020@ds115396.mlab.com:15396/blog',
  secret: crypto,
  db: 'blog'
};