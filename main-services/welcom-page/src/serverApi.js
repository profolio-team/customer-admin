import apiUrls from "./config/backendApiUrlConfig";

const registration = async (domain, email) => {
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
};

const confirm = async (email, registrationHash) => {
  const registrationObject = { registrationHash, email };
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

const serverApi = { registration, confirm };
export default serverApi;
