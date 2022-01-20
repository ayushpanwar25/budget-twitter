const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: String, required: true },
  authorID: { type: String, required: true },
  text: { type: String, required: true },
  hearts: { type: Number, min: 0, default: 0 },
  posted: { type: Date, default: Date.now }
}, {
  collection: 'posts'
});

PostSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  //object.posted = posted.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  return object;
});

module.exports = Post = mongoose.model('Post', PostSchema);