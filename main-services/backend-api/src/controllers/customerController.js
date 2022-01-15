var express = require("express");
var router = express.Router();
const Customer = require("../models/customer");
const keycloakConfig = require("../tools/keycloak");
const { TEST_CUSTOMER_URL } = process.env;
const startDeploy = async (domain, email) => {
  await Customer.updateOne(
    { email },
    { $set: { deployedStatus: "Start deploy process" } }
  );
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Unzip libraries" } }
    );
  }, 1000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Setup database" } }
    );
  }, 2000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Init database" } }
    );
  }, 3000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Init admin credentials" } }
    );
  }, 4000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: "Setup profolio config" } }
    );
  }, 5000);
  setTimeout(async () => {
    await Customer.updateOne(
      { email },
      { $set: { deployedStatus: `Init ${domain} domain` } }
    );
  }, 6000);
  setTimeout(async () => {
    await Customer.updateOne({ email }, { $set: { deployedStatus: `Done` } });
  }, 7000);
  setTimeout(async () => {
    await Customer.updateOne({ email }, { $set: { deployedService: true } });
  }, 8000);
};
router.post("/keycloak-by-domain", async function (req, res) {
  try {
    const testCustomerUrl = `${TEST_CUSTOMER_URL}/`;
    const { domain } = req.body;
    const { access_token: token } = await keycloakConfig.getAdminToken();
    const customers = await Customer.find({});

    let resultData = {};

    const customer = customers[0];
    const userData = await keycloakConfig.getUser({
      email: customer.email,
      token,
      realmName: customer.keyCloakRealm,
    });
    if (userData) {
      resultData = {
        url: keycloakConfig["auth-server-url"],
        clientId: keycloakConfig.customerClientId,
        redirectUrl: testCustomerUrl,
        realm: customer.keyCloakRealm,
        redirectUrl: `${testCustomerUrl}?data=${customer.domain}`,
      };
    }

    res.status(200).json(resultData);
  } catch (e) {
    console.log("e", e);
    res.status(200).json({
      error: e.toString(),
    });
  }
});
router.post("/keycloak-by-username", async function (req, res) {
  try {
    const testCustomerUrl = `${TEST_CUSTOMER_URL}/`;
    const { email } = req.body;
    const { access_token: token } = await keycloakConfig.getAdminToken();
    const customers = await Customer.find({});

    let resultData = {};

    const waitingPromise = customers.map(async (customer) => {
      const userData = await keycloakConfig.getUser({
        email,
        token,
        realmName: customer.keyCloakRealm,
      });
      if (userData) {
        resultData = {
          url: keycloakConfig["auth-server-url"],
          clientId: keycloakConfig.customerClientId,
          redirectUrl: testCustomerUrl,
          realm: customer.keyCloakRealm,
          redirectUrl: `${testCustomerUrl}?data=${customer.domain}`,
        };
      }
    });

    await Promise.all(waitingPromise);
    res.status(200).json(resultData);
  } catch (e) {
    console.log("e", e);
    res.status(200).json({
      error: e.toString(),
    });
  }
});

router.post("/customer-registration", async function (req, res) {
  try {
    const { domain, email } = req.body;

    const customerByEmail = await Customer.findOne({ email });
    if (customerByEmail) {
      throw new Error("Customer already exist");
    }

    const customerByDomain = await Customer.findOne({ domain });
    if (customerByDomain) {
      throw new Error("Domain already exist");
    }
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const registrationCode = `${getRndInteger(100000, 999999)}`;
    const realmName = `CUSTOMER_${domain}`;
    let newCustomer = new Customer({
      keyCloakRealm: realmName,
      domain,
      email,
      registrationCode,
      confirmedEmail: false,
      deployedService: false,
    });

    const { access_token } = await keycloakConfig.getAdminToken();

    const realmJson = keycloakConfig.getCustomerRealmJson();
    realmJson.realm = realmName;
    await keycloakConfig.createRealm(realmJson, access_token);

    const userData = await keycloakConfig.createNewUser({
      email,
      token: access_token,
      realmName: realmJson.realm,
    });

    const userId = userData.id;

    await keycloakConfig.confirmUserEmail({
      email,
      token: access_token,
      domain,
      userId,
      realmName: realmName,
      registrationCode,
    });

    newCustomer = await newCustomer.save();

    res.status(200).json({ ok: true, domain, email, newCustomer });
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.toString() });
  }
});

router.get("/customer-get-all", async function (req, res) {
  const allCustomers = await Customer.find({});
  res.status(200).json(allCustomers);
});

router.get("/customer-delete-one", async function (req, res) {
  const customer = await Customer.findOne();
  if (!customer) {
    return res.status(200).json([]);
  }
  await customer.delete();
  const allCustomers = await Customer.find({});
  res.status(200).json(allCustomers);
});

router.post("/customer-get-one", async function (req, res) {
  try {
    const { email } = req.body;
    let customer = await Customer.findOne({ email });
    if (!customer || !customer.domain) {
      res.status(200).json([]);
    }
    const getCustomerInfo = async (domain, email) => {
      const customerByEmail = await Customer.findOne({ email });
      const customerByDomain = await Customer.findOne({ domain });
      return customerByEmail || customerByDomain;
    };
    customer = await getCustomerInfo(customer.domain);
    res.status(200).json(customer);
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.toString() });
  }
});

router.post("/customer-confirm", async function (req, res) {
  try {
    const { email, registrationCode } = req.body;

    const customer = await Customer.findOne({ email, registrationCode });
    if (!customer) {
      throw new Error("Customer does not exist");
    }

    if (customer.confirmedEmail) {
      throw new Error("Already confirmed");
    }

    if (customer.deployedService) {
      return;
    }

    await Customer.updateOne({ email }, { $set: { confirmedEmail: true } });
    await startDeploy(customer.domain, customer.email);

    res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.toString() });
  }
});

module.exports = router;
