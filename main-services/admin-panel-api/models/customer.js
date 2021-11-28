let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  email: String,
  domain: String,
  registrationCode: String,
  confirmedEmail: Boolean,
  deployedService: Boolean,
});

module.exports = mongoose.model("Customer", schema);
