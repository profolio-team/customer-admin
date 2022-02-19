const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const apiUrls = {
  baseUrl,
  customerRegistrationUrl: `${baseUrl}/customer-registration`,
  customerGetAllUrl: `${baseUrl}/customer-get-all`,
  customerDeleteOneUrl: `${baseUrl}/customer-delete-one`,
  customerGetOneUrl: `${baseUrl}/customer-get-one`,
  customerConfirmUrl: `${baseUrl}/customer-confirm`,
  initTestDataUrl: `${baseUrl}/init-test-data`,
};

export default apiUrls;
