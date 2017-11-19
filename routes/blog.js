const Blog = require('../models/blog');
const mongoose = require('mongoose');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');

mongoose.Promise = global.Promise;

/**
 * Middleware
 * Grab token, all operation need auth blow this
 */
// router.use(function (req, res, next) {
//   const token = req.headers['auth'];
//   if (!token) {
//     res.json({ success: false, message: 'No token provided' })
//   } else {
//     jwt.verify(token, config.secret, function (err, decoded) {
//       if (err) {
//         res.json({ success: false, message: 'Token invalid: ' + err })
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     })
//   }
// });

/**
 * Post a new blog
 */
router.post('/newBlog', function(req, res) {
  if (!req.body.title) {
    res.json({ success: false, message: 'Blog title is required'});
  } else if (!req.body.body) {
    res.json({ success: false, message: 'Blog body is required'});
  } else if (!req.body.createdBy){
    res.json({ success: false, message: 'Blog author is required' });
  } else {
    const blog = new Blog({
      title: req.body.title,
      body: req.body.body,
      createdBy: req.body.createdBy
    });
    blog.save(function (err) {
      if(err) {
        if(err.errors) {
          if(err.errors.title) {
            res.json({ success: false, message: err.errors.title.message });
          }
          if(err.errors.body) {
            res.json({ success: false, message: err.errors.body.message });
          }
          if(err.errors.createdBy) {
            res.json({ success: false, message: err.errors.createdBy.message });
          } else {
            res.json({ success: false, message: 'Cannot save blog.', err });
          }
        } else {
          res.json({ success: false, message: 'Cannot save blog.', err });
        }
      } else {
        res.json({ success: true, message: 'Blog saved'});
      }
    })
  }
});



router.get('/allBlogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      res.json({ success: false, message: err })
    } else {
      if (!blogs) {
        res.json({ success: false, message: 'Blogs Not Found'});
      } else {
        res.json({  success: true, blogs: blogs });
      }
    }
  }).sort({'_id': -1})
});

module.exports = router;