var Keycloak = require("keycloak-connect");

let _keycloak;

var keycloakConfig = {
  realm: process.env.KEY_CLOAK_REALM_NAME,
  "realm-public-key": process.env.KEY_CLOAK_REALM_PUBLIC_KEY,
  "auth-server-url": process.env.KEY_CLOAK_AUTH_SERVER_URL,
  "ssl-required": process.env.KEY_CLOAK_SSL_REQUIRED,
  resource: process.env.KEY_CLOAK_CLIENT_ID,
  "public-client": process.env.KEY_CLOAK_PUBLIC_CLIENT,
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
