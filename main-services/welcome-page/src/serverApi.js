import apiUrls from "./config/backendApiUrlConfig";

const registration = async (domain, email) => {
  try {
    const registrationObject = { domain, email };
    const response = await fetch(apiUrls.customerRegistrationUrl, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registrationObject),
    });
    let jsonReponce;

    if (response.status === 200) {
      jsonReponce = await response.json();
    } else {
      jsonReponce = { status: response.status, message: response.statusText };
    }
    return jsonReponce;
  } catch (e) {
    console.log("Error", e);
    return { error: "Internal Error" };
  }
};

const confirm = async (email, registrationCode) => {
  const registrationObject = { registrationCode, email };
  const response = await fetch(apiUrls.customerConfirmUrl, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registrationObject),
  });
  let jsonReponce;

  if (response.status === 200) {
    jsonReponce = await response.json();
  } else {
    jsonReponce = { status: response.status, message: response.statusText };
  }

  return jsonReponce;
};

const getCustomerInfo = async (email) => {
  const infoObject = { email };
  const response = await fetch(apiUrls.customerGetOneUrl, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infoObject),
  });
  let jsonReponce;

  if (response.status === 200) {
    jsonReponce = await response.json();
  } else {
    jsonReponce = { status: response.status, message: response.statusText };
  }

  return jsonReponce;
};

const serverApi = { registration, confirm, getCustomerInfo };
export default serverApi;
