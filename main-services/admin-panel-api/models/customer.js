let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  email: String,
  domain: String,
  confirmedEmail: Boolean,
  deployedService: Boolean,
  registrationHash: String,
});

module.exports = mongoose.model("Customer", schema);
