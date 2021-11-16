var express = require("express");
var session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
var memoryStore = new session.MemoryStore();

const keycloak = require("./config/keycloak-config.js").initKeycloak(
  memoryStore
);

var app = express();
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(cors());
app.use(keycloak.middleware());

const MONGODB_PORT = process.env.MONGODB_PORT;
const mongoUrl = `mongodb://mongodb:${MONGODB_PORT}/profolio`;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (...args) => {
  console.log("Conection Mongo error", ...args);
});
db.once("open", (...args) => {
  console.log("Conection Mongo opened", ...args);
});

const testController = require("./controller/test-controller.js");
app.use(testController);

app.get("/", function (req, res) {
  res.send("Server is up!");
});

const port = 9000;
const host = "0.0.0.0";
app.listen(port, host);
console.log(`running on http://${host}:${port}`);
