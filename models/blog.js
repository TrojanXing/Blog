const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;
const Scheme = mongoose.Schema;

// Title validator
function validTitleChacker(title) {
  let reg = new RegExp(/^[a-zA-Z0-9 ]+$/, 'g');
  return reg.test(title);
}

function titleLengthCheCker(title) {
  if (!title) {
    return false;
  } else {
    return title.length > 5 && title.length < 50;
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
    return body.length > 5 && body.length < 200;
  }
}
let bodyValidators = [
  {
    validator: bodyChecker,
    message: 'User name can only contain letter, number, - and _, and length should between 3-15'
  }
];

// Comment validator
function commentLengthChecker(comment) {
  if (!comment[0]) {
    return false;
  } else {
    return comment[0] > 1 && comment[0] < 100;
  }
}


let commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comment may not exceed 100 characters'
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
    comment: { type: String, validate: commentValidators },
    commentor: { type: String },

  }]
});


module.exports = mongoose.model('Blog', blogSchema);
