const { getKeycloak } = require('../../config/keycloak');

exports.protect = (role) => (req, res, next) => {
  const keyloack = getKeycloak();
  keyloack.protect(role)(req, res, next);
};
