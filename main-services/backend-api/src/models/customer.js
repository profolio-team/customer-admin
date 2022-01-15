let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  email: String,
  domain: String,
  keyCloakRealm: String,
  registrationCode: String,
  confirmedEmail: Boolean,
  deployedService: Boolean,
  deployedStatus: String,
});

module.exports = mongoose.model("Customer", schema);
