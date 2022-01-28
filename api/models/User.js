const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, required: false }
}, {
  collection: 'users'
});

UserSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = User = mongoose.model('User', UserSchema);