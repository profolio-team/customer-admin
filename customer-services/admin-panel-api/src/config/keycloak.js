const Keycloak = require('keycloak-connect');
const { keycloack } = require('./vars');
const logs = require('./logger');

let _keycloak;

const keycloakConfig = {
  realm: keycloack.realm,
  'realm-public-key': keycloack['realm-public-key'],
  'auth-server-url': keycloack['auth-server-url'],
  'ssl-required': keycloack['ssl-required'],
  resource: keycloack.resource,
  'public-client': keycloack['public-client'],
};

function initKeycloak(memoryStore) {
  if (_keycloak) {
    logs.error('Trying to init Keycloak again!');
    return _keycloak;
  }
  _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
  logs.info('Keycloak Initialized');
  return _keycloak;
}

function getKeycloak() {
  if (!_keycloak) {
    logs.error('Keycloak has not been initialized. Please called init first.');
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
