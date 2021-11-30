const path = require('path');

// import .env variables
require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  keycloack: {
    realm: process.env.KEY_CLOAK_REALM_NAME,
    'realm-public-key': process.env.KEY_CLOAK_REALM_PUBLIC_KEY,
    'auth-server-url': process.env.KEY_CLOAK_AUTH_SERVER_URL,
    'ssl-required': process.env.KEY_CLOAK_SSL_REQUIRED,
    resource: process.env.KEY_CLOAK_CLIENT_ID,
    'public-client': process.env.KEY_CLOAK_PUBLIC_CLIENT,
  },
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
};
