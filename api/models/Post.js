const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = Post = mongoose.model(
  "Post",
  new Schema({
    username: { type: String, required: true },
    text: String,
    date: { type: Date, default: Date.now }
  }, {
    collection: 'posts'
  })
);