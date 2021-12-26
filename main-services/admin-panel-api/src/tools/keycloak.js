var Keycloak = require("keycloak-connect");
const fetch = require("node-fetch");

let _keycloak;
const baseUrl = "http://host.docker.internal:8080/auth";
const customerClientId = "customer-keycloak-client";

const envConfig = {
  INVITE_EMAIL_PASSWORD: process.env.INVITE_EMAIL_PASSWORD,
  INVITE_EMAIL_HOST: process.env.INVITE_EMAIL_HOST,
  INVITE_EMAIL_ADRESS: process.env.INVITE_EMAIL_ADRESS,
};

var keycloakConfig = {
  realm: process.env.KEY_CLOAK_REALM_NAME,
  "realm-public-key": process.env.KEY_CLOAK_REALM_PUBLIC_KEY,
  "auth-server-url": process.env.KEY_CLOAK_AUTH_SERVER_URL,
  "ssl-required": process.env.KEY_CLOAK_SSL_REQUIRED,
  customerClientId,
  resource: process.env.KEY_CLOAK_CLIENT_ID,
  "public-client": process.env.KEY_CLOAK_PUBLIC_CLIENT,
};

function initKeycloak(app, memoryStore) {
  _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
  app.use(_keycloak.middleware());
}

function getKeycloak() {
  return _keycloak;
}

const getAdminToken = async () => {
  const getTokenUrl = `${baseUrl}/realms/master/protocol/openid-connect/token`;
  const formData = [
    `grant_type=password`,
    `client_id=admin-cli`,
    `username=admin`,
    `password=password`,
  ].join("&");

  const tokenReq = await fetch(getTokenUrl, {
    method: "POST",
    body: formData,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
  });

  return await tokenReq.json();
};

const customerRealmJson = {
  realm: "CustomerAdminRealm",
  enabled: true,
  sslRequired: "external",
  registrationAllowed: false,
  resetPasswordAllowed: true,
  rememberMe: true,
  verifyEmail: true,
  loginWithEmailAllowed: true,
  duplicateEmailsAllowed: false,
  requiredCredentials: ["password"],
  roles: {
    realm: [
      {
        name: "user",
        description: "User privileges",
      },
      {
        name: "admin",
        description: "Administrator privileges",
      },
    ],
  },
  scopeMappings: [
    {
      client: customerClientId,
      roles: ["user"],
    },
  ],
  smtpServer: {
    from: envConfig.INVITE_EMAIL_ADRESS,
    user: envConfig.INVITE_EMAIL_ADRESS,
    host: envConfig.INVITE_EMAIL_HOST,
    password: envConfig.INVITE_EMAIL_PASSWORD,
    replyToDisplayName: "",
    starttls: "true",
    auth: "true",
    replyTo: "",
    fromDisplayName: "Profolio mail service",
    ssl: "true",
  },
  clients: [
    {
      clientId: customerClientId,
      rootUrl: "http://localhost",
      adminUrl: "http://localhost",
      surrogateAuthRequired: false,
      enabled: true,
      alwaysDisplayInConsole: false,
      clientAuthenticatorType: "client-secret",
      redirectUris: ["http://localhost*"],
      webOrigins: ["*"],
      notBefore: 0,
      bearerOnly: false,
      consentRequired: false,
      standardFlowEnabled: true,
      implicitFlowEnabled: false,
      directAccessGrantsEnabled: true,
      serviceAccountsEnabled: false,
      publicClient: true,
      frontchannelLogout: false,
      protocol: "openid-connect",
      attributes: {
        "backchannel.logout.session.required": "true",
        "backchannel.logout.revoke.offline.tokens": "false",
      },
      authenticationFlowBindingOverrides: {},
      fullScopeAllowed: true,
      nodeReRegistrationTimeout: -1,
      defaultClientScopes: ["web-origins", "roles", "profile", "email"],
      optionalClientScopes: [
        "address",
        "phone",
        "offline_access",
        "microprofile-jwt",
      ],
      access: {
        view: true,
        configure: true,
        manage: true,
      },
    },
  ],
};

const getUser = async ({ realmName, email, token }) => {
  const urlCr = `${baseUrl}/admin/realms/${realmName}/users?email=${email}`;
  const req = await fetch(urlCr, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  const usrData = await req.json();
  return usrData[0];
};

const createNewUser = async ({ email, token, realmName }) => {
  const urlCr = `${baseUrl}/admin/realms/${realmName}/users`;
  await fetch(urlCr, {
    method: "POST",
    body: JSON.stringify({
      email,
      enabled: "true",
      username: email,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  return getUser({ email, token, realmName });
};

const getCustomerRealmJson = () => {
  return JSON.parse(JSON.stringify(customerRealmJson));
};

const createRealm = async (realmJson, token) => {
  const urlForRealm = `${baseUrl}/admin/realms`;
  const req = await fetch(urlForRealm, {
    method: "POST",
    body: JSON.stringify(realmJson),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  await req.text();
};

const confirmUserEmail = async ({
  email,
  token,
  userId,
  realmName,
  domain,
  registrationCode,
}) => {
  const infoJson = Buffer.from(
    JSON.stringify({
      email,
      domain,
      registrationCode,
    })
  ).toString("base64");
  const welcomPageUrl = "http://localhost:3010/setup";
  const redirectUri = `${welcomPageUrl}?info=${infoJson}&clientId=${userId}`;
  console.log("redirectUri", redirectUri);
  const urlCr = `${baseUrl}/admin/realms/${realmName}/users/${userId}/execute-actions-email?lifespan=43200&redirect_uri=${redirectUri}&client_id=${customerClientId}`;
  const req = await fetch(urlCr, {
    method: "PUT",
    body: JSON.stringify(["VERIFY_EMAIL", "UPDATE_PASSWORD"]),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  var text = await req.text();
  console.log("text", text, req.headers);

  return text;
};

module.exports = {
  getAdminToken,
  initKeycloak,
  getKeycloak,
  getCustomerRealmJson,
  getUser,
  createNewUser,
  createRealm,
  confirmUserEmail,
  ...keycloakConfig,
};
