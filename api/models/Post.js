const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  posted: { type: Date, default: Date.now }
}, {
  collection: 'posts'
});

PostSchema.method("toJSON", function () {
  const { posted, ...object } = this.toObject();
  object.posted = added.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  return object;
});

module.exports = Post = mongoose.model('Post', PostSchema);