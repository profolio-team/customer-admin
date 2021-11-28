var express = require("express");
var router = express.Router();
const Customer = require("../models/customer");
const emailConfig = require("../config/email");
const nodemailer = require("nodemailer");

const sendEmail = async (email, title, message) => {
  const transporter = nodemailer.createTransport({
    host: emailConfig.inviteEmailHost,
    port: emailConfig.inviteEmailPort,
    secure: false,
    auth: {
      user: emailConfig.inviteEmailAdress,
      pass: emailConfig.inviteEmailPassword,
    },
  });

  let mailOptions = {
    from: emailConfig.inviteEmailAdress,
    to: email,
    subject: title,
    text: message,
  };

  console.log(
    `
	  -------------
	  Sending email
	  -------------
  `,
    mailOptions
  );

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return reject(error);
      } else {
        console.log("Email sended", info);
        resolve(info);
      }
    });
  });
};

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

const confirmCustomer = async (email, registrationCode) => {
  console.log(email, registrationCode);
  const customer = await Customer.findOne({ email, registrationCode });
  if (!customer) {
    throw new Error("Customer does not exist");
  }

  if (customer.confirmedEmail) {
    throw new Error("Already confirmed");
  }

  await Customer.updateOne({ email }, { $set: { confirmedEmail: true } });
  await startDeploy(customer.domain, customer.email);
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const customerRegistration = async (domain, email) => {
  const customerByEmail = await Customer.findOne({ email });
  if (customerByEmail) {
    throw new Error("Customer already exist");
  }

  const customerByDomain = await Customer.findOne({ domain });
  if (customerByDomain) {
    throw new Error("Domain already exist");
  }

  const registrationCode = `${getRndInteger(100000, 999999)}`;
  console.log("registrationCode", registrationCode);

  let newCustomer = new Customer({
    domain,
    email,
    registrationCode: registrationCode,
    confirmedEmail: false,
    deployedService: false,
  });

  const emailTitle = `Hi. your email for registration main (${domain}.profolio.com)`;
  const emailMessage = `For continue registration process of domain: ${domain}.profolio.com confirm your email
Using code: ${registrationCode}
or
Link: https://profolio.com/confirm?registrationCode=${registrationCode}&email=${email}
  `;
  await sendEmail(email, emailTitle, emailMessage);
  newCustomer = await newCustomer.save();
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

router.post("/customer-registration", async function (req, res) {
  try {
    const { domain, email } = req.body;
    await customerRegistration(domain, email);
    res.status(200).json({ ok: true, domain, email });
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.toString() });
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

router.post("/customer-get-one", async function (req, res) {
  try {
    const { email } = req.body;
    let customer = await Customer.findOne({ email });
    if (!customer) {
      res.status(200).json([]);
    }
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
    await confirmCustomer(email, registrationCode);
    res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);
    res.status(200).json({ error: e.toString() });
  }
});

module.exports = router;
