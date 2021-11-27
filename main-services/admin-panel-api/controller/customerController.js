var express = require("express");
var router = express.Router();
const Customer = require("../models/customer");
var crypto = require("crypto");

const startDeploy = async (domain, adminEmail) => {
  console.log(`
	-------------
	startDeploy
	-------------
	domain = ${domain}
	adminEmail = ${adminEmail}
	-------------
`);
};

const confirmCustomer = async (email, registrationHash) => {
  const customer = await Customer.findOne({ email, registrationHash });
  if (!customer) {
    throw new Error("Customer does not exist");
  }

  if (customer.confirmedEmail) {
    throw new Error("Already confirmed");
  }

  await Customer.updateOne({ email }, { $set: { confirmedEmail: true } });
  await startDeploy(customer.domain, customer.email);
};

const sendEmail = async (email, title, message, link, domain) => {
  console.log(`
	-------------
	Sending email
	-------------
	email = ${email}
	title = ${title}
	message = ${message}
	link = ${link}
	domain = ${domain}
	-------------
`);
};

const customerRegistration = async (domain, email) => {
  const customerByEmail = await Customer.findOne({ email });
  if (customerByEmail) {
    throw new Error("Customer already exist");
  }

  const customerByDomain = await Customer.findOne({ domain });
  if (customerByDomain) {
    throw new Error("Domain already exist");
  }

  const registrationHash = crypto
    .createHash("md5")
    .update(`${domain}${email}${Date.now()}`)
    .digest("hex");

  let newCustomer = new Customer({
    domain,
    email,
    confirmedEmail: false,
    deployedService: false,
    registrationHash: registrationHash,
  });

  newCustomer = await newCustomer.save();
  await sendEmail(
    email,
    "Registartion",
    "Pls confirm your email by link",
    `http://portfolio.com/?registrationHash=${registrationHash}`,
    domain
  );
  return newCustomer;
};

const getCustomerInfo = async (domain, email) => {
  const customerByEmail = await Customer.findOne({ email });
  const customerByDomain = await Customer.findOne({ domain });
  return customerByEmail || customerByDomain;
};

const getAllCustomerInfo = async () => {
  const customers = await Customer.find({});
  return customers;
};

router.get("/customer-registration", async function (req, res) {
  try {
    await customerRegistration(
      "domain" + Date.now(),
      "email@yandex" + Date.now()
    );
    res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);

    res.status(200).json({ erorr: e.toString() });
  }
});

router.get("/customer-get-all", async function (req, res) {
  const allCustomers = await getAllCustomerInfo();
  res.status(200).json(allCustomers);
});

router.get("/customer-delete-one", async function (req, res) {
  const customer = await Customer.findOne();
  if (!customer) {
    res.status(200).json([]);
  }
  await customer.delete();
  const allCustomers = await getAllCustomerInfo();
  res.status(200).json(allCustomers);
});

router.get("/customer-get-one", async function (req, res) {
  let customer = await Customer.findOne();
  if (!customer) {
    res.status(200).json([]);
  }
  customer = await getCustomerInfo(customer.domain);
  res.status(200).json(customer);
});

router.get("/customer-confirm", async function (req, res) {
  try {
    const customer = await Customer.findOne();
    if (!customer) {
      res.status(200).json([]);
    }

    await confirmCustomer(customer.email, customer.registrationHash);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);
    res.status(200).json({ erorr: e.toString() });
  }
});

module.exports = router;
