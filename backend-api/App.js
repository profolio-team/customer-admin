var express = require("express");
var session = require("express-session");
const cors = require("cors");
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

const testController = require("./controller/test-controller.js");
app.use(testController);

app.get("/", function (req, res) {
  res.send("Server is up!");
});

const port = 9000;
app.listen(port, () => {
  console.log(`
-------------------------------
Server on: ${port}
http://localhost:${port}/
-------------------------------
`);
});
