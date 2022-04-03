const isLocalhost = location.host.includes("localhost");
const protocol = isLocalhost ? "http" : "https";
const countOfDomain = location.host.split(".").length;

// domain.localhost
const isExtendedLocalhostUrl = isLocalhost && countOfDomain == 2;

// domain.profolio.dev
const isExtendedProductionUrl = !isLocalhost && countOfDomain == 3;

const isExtendedUrl = isExtendedLocalhostUrl || isExtendedProductionUrl;

let clearHost = location.host;
if (isExtendedUrl) {
  clearHost = clearHost.replace(location.host.split(".")[0] + ".", "");
}

export const redirectToEnterEmailPage = (domain: string, email: string) => {
  const urlForRedirect = `${protocol}://${domain}.${clearHost}/sign-in?email=${email}`;
  if (window.location.href !== urlForRedirect) {
    window.location.href = urlForRedirect;
    return true;
  }
  return false;
};

export const redirectToMainPage = () => {
  if (isExtendedUrl) {
    const urlWithoutSubdomain = location.toString().replace(location.host.split(".")[0] + ".", "");
    window.location.href = urlWithoutSubdomain;
  }
};

export const getRootFullUrl = () => {
  return `${protocol}://${clearHost}/`;
};

export const getFullUrlWithDomain = (domain: string) => {
  return `${protocol}://${domain}.${clearHost}/`;
};

export const companyName = isExtendedUrl ? location.host.split(".")[0] : null;
