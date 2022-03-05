const baseUrl = "http:/localhost";

const apiUrls = {
  baseUrl,
  getKeyCloakSettingByUserName: `${baseUrl}/keycloak-by-username`,
  getKeyCloakSettingByDomain: `${baseUrl}/keycloak-by-domain`,
  customerRegistrationUrl: `${baseUrl}/customer-registration`,
  customerGetAllUrl: `${baseUrl}/customer-get-all`,
  customerDeleteOneUrl: `${baseUrl}/customer-delete-one`,
  customerGetOneUrl: `${baseUrl}/customer-get-one`,
  customerConfirmUrl: `${baseUrl}/customer-confirm`,
};

export default apiUrls;
