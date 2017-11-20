const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');

mongoose.Promise = global.Promise;

/**
 * Middleware
 * Grab token, all operation need auth blow this
 */
router.use(function (req, res, next) {
  const token = req.headers['auth'];
  if (!token) {
    res.json({ success: false, message: 'No token provided' })
  } else {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        res.json({ success: false, message: 'Token invalid: ' + err })
      } else {
        req.decoded = decoded;
        next();
      }
    })
  }
});

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
  console.log(req.decoded);
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

/**
 * Get one single blog
 */
router.get('/singleBlog/:id', function (req, res) {
  if (!req.params.id) {
    res.json({ success: false, message: 'No blog id provided' })
  } else {
    Blog.findOne({ _id: req.params.id}, function (err, blog) {
      if (err) {
        res.json({ success: false, message: 'Cannot find any blog with given id' + req.params.id });
      } else {
        if (!blog) {
          res.json({ success: false, message: 'Blog Not Found'});
        } else {
          User.findOne({ _id: req.decoded.userId }, function(err, user) {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              if (!user) {
                res.json({ success: false, message: 'Cannot authenticate user' });
              } else {
                if (user.username !== blog.createdBy) {
                  res.json({ success: false, message: 'Have no access to this blog' })
                } else {
                    res.json({ success: true, blog: blog });
                }
              }
            }
          });
        }
      }
    });
  }
});

/**
 * Update a blog
 */
router.put('/updateBlog', function (req, res) {
  if (!req.body._id) {
    res.json({ success: false, message: 'No blog id provided' })
  } else {
    Blog.findOne({ _id: req.body._id }, function (err, blog) {
      if (err) {
        res.json({ success: false, message: 'Not a valid id' });
      } else {
        if (!blog) {
          res.json({ success: false, message: 'Cannot find any blog with given id' + req.body._id});
        } else {
          User.findOne({ _id: req.decoded.userId }, function(err, user) {
            if (err) {
              res.json({ success: false, message: err });
            } else {
              if (!user) {
                res.json({ success: false, message: 'Cannot authenticate user' });
              } else {
                if (user.username !== blog.createdBy) {
                  res.json({ success: false, message: 'Have no access to change this blog' })
                } else {
                  blog.title = req.body.title;
                  blog.body = req.body.body;
                  blog.save(function (err) {
                    if (err) {
                      res.json({ success: false, message: err.message });
                    } else {
                      res.json({ success: true, message: 'Blog saved!' });
                    }
                  })
                }
              }
            }
          });
        }
      }
    });
  }
});

module.exports = router;