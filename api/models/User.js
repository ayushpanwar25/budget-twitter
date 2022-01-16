const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
}, {
  collection: 'users'
});

UserSchema.method("toJSON", function () {
  const { _id, added, ...object } = this.toObject();
  object.id = _id;
  object.added = added.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  return object;
});

module.exports = User = mongoose.model('User', UserSchema);