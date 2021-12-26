var express = require("express");
var session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const initRouts = require("./controllers/index");
const initDataBase = require("./models/index");
const { initKeycloak } = require("./tools/keycloak");

var memoryStore = new session.MemoryStore();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(cors());
initKeycloak(app, memoryStore);

initDataBase(app);
initRouts(app);

const port = 9000;
const host = "0.0.0.0";
app.listen(port, host);
console.log(`running on http://${host}:${port}`);
