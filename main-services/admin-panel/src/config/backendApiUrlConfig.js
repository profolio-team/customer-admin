const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

const apiUrls = {
  baseUrl,
  getUsersUrl: `${baseUrl}/users`,
};

export default apiUrls;
