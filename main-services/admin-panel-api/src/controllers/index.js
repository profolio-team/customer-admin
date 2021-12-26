const customerController = require("./customerController.js");

const initRouts = (app) => {
  app.use(customerController);
  app.get("/", function (req, res) {
    res.status(200).json({ message: "Server is up" });
  });
};
module.exports = initRouts;
