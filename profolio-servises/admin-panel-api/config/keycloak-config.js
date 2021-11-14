var Keycloak = require("keycloak-connect");

let _keycloak;

var keycloakConfig = {
  realm: "MyDemo",
  "realm-public-key":
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoagMMS0YxVFjl0h6KEWNr/AxAN670jbNEuvbhh8jM9KsRzMxOb3irbtnaXyn0L4SsKE1E/sVQ+T2cChRUQG107bWjJLl80QU4hUtchsiOsZinWasJTgMRBB/fqRI9cRgjZlxlUuG2GPY0N+ULU7oK/XO2BkmJtosnGDTIppeGx0ALipRTux3ae7wEMF2FpI39vxKd6SYNO0Q8kNyNcCPa0UdhnjKSkbV/FDLUKv7916SEMZRfnKJQGzBQEL0BIp0iW9wvpl5I5WbN4/VhnmvO17m3yZy7cSHRf3oE5150pOaw1kIaYusHG9L8pYV+Cc4A6k+a5PrFgVoQe2ereRqGQIDAQAB",
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
