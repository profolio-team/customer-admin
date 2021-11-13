var Keycloak = require("keycloak-connect");

let _keycloak;

var keycloakConfig = {
  clientId: "nodejs-microservice",
  bearerOnly: true,
  serverUrl: "http://localhost:8080/auth",
  realm: "Demo-Realm",
  credentials: {
    secret: "00b85164-e51e-4ac7-a483-d25ce48bdc6a",
  },
};

function initKeycloak(memoryStore) {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    console.log("Keycloak Initialized");
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
