const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: String, required: true },
  authorID: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: false },
  likes: { type: Array, default: [] },
  posted: { type: Date, default: Date.now }
}, {
  collection: 'posts'
});

PostSchema.method("toJSON", function () {
  const { _id, likes, ...object } = this.toObject();
  object.id = _id;
  object.numLikes = likes.length;
  object.likes = likes;
  return object;
});

module.exports = Post = mongoose.model('Post', PostSchema);