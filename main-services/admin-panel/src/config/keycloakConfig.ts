const keycloakConfig = {
  realm: process.env.REACT_APP_KEY_CLOAK_REALM_NAME || "",
  url: process.env.REACT_APP_KEY_CLOAK_AUTH_SERVER_URL || "",
  clientId: process.env.REACT_APP_KEY_CLOAK_CLIENT_ID || "",
  "ssl-required": process.env.REACT_APP_KEY_CLOAK_SSL_REQUIRED || "",
  "public-client": process.env.REACT_APP_KEY_CLOAK_PUBLIC_CLIENT || "",
  "confidential-port": process.env.REACT_APP_KEY_CLOAK_CONFIDENTIAL_PORT || "",
};

export default keycloakConfig;
