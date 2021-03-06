const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// Title validator
function validTitleChacker(title) {
  let reg = new RegExp(/^[a-zA-Z0-9 ]+$/, 'g');
  return reg.test(title);
}

function titleLengthCheCker(title) {
  if (!title) {
    return false;
  } else {
    return title.length >= 5 && title.length <= 50;
  }
}

let titleValidators = [
  {
    validator: validTitleChacker,
    message: 'Title should be alphanumeric'
  },
  {
    validator: titleLengthCheCker,
    message: 'Title length should be 5~50'
  }
];

// Post body validator
function bodyChecker(body) {
  if (!body) {
    return false;
  } else {
    return body.length >= 5 && body.length <= 500;
  }
}
let bodyValidators = [
  {
    validator: bodyChecker,
    message: 'Blog body length should between 5 ~ 500'
  }
];

// Comment validator
function commentLengthChecker(comment) {
  if (!comment) {
    return false;
  } else {
    return comment.length > 1 && comment.length < 200;
  }
}


let commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comment may not exceed 200 characters'
  }
];

// Blog Schema
const blogSchema = new Schema({
  title: { type: String, require: true, validate: titleValidators },
  body: { type: String, require: true, validate: bodyValidators },
  createdBy: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [{
    _id: false,
    comment: { type: String, validate: commentValidators },
    commentor: { type: String },

  }]
});


module.exports = mongoose.model('Blog', blogSchema);
