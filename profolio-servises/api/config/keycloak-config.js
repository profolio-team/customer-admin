var Keycloak = require("keycloak-connect");

let _keycloak;

var keycloakConfig = {
  realm: "MyDemo",
  "realm-public-key":
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjYdEtqbUOqLloB2Y6ghEnme5RYUNwcDxh6tPiF3kaMA3ew+GOdHwWnK0vcbXxK87GH5K62LN2uC5B+15uknblynjvaTRApCjnKypr+3BH8clbktOrpzB46oR816hL5c7uBIITT4z8TEkUmdEL4/QojZqAsemcn8VnXmQ1uZBBdfhVy+KvCJgN6FR+nPstkLjYZGfB9AdAY4Jy8p2Cb6pnboOAqeAdSkfcVIj6oOwELF67pTOw66ubFOg9izMhkhC2XUPZTVnfSJd/AqncoY6sJcZmf2d4Ofr/2XqNePaZEao3F2awApO19KyNtQSIU0gQAOHo3w5+GYEFzJw/UA62QIDAQAB",
  "auth-server-url": "http://localhost:8080/auth",
  "ssl-required": "external",
  resource: "my-react-client",
  "public-client": true,
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
