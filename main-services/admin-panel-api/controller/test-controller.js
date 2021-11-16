var express = require("express");
var router = express.Router();
const keycloak = require("../config/keycloak-config.js").getKeycloak();
const User = require("../models/user");

router.get("/anonymous", function (req, res) {
  res.send("Hello Anonymous");
});
router.get("/user", keycloak.protect("user"), function (req, res) {
  res.send("Hello User");
});

router.get("/users", keycloak.protect(), async function (req, res) {
  try {
    const user = new User({
      name: Date.now() + "_" + Math.round(Math.random() * Math.pow(10, 5)),
    });
    await user.save();

    const users = await User.find({});
    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(200).json({ failed: true, e: e.toString() });
  }
});

router.get("/admin", keycloak.protect("admin"), function (req, res) {
  res.send("Hello Admin");
});

router.get(
  "/all-user",
  keycloak.protect(["user", "admin"]),
  function (req, res) {
    res.send("Hello All User");
  }
);

router.get("/db-clear-users", async function (req, res) {
  const users = await User.find({});
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    await User.deleteOne({ _id: user.id });
  }

  res.status(200).json({});
});

module.exports = router;
