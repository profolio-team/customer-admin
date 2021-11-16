let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
