import { toBase64 } from "./converters";

export const isLocalhost = location.host.includes("localhost");

const isVercelPreviewUrl = location.host.includes("vercel.app");
const isFirebasePreviewUrl = location.host.includes("web.app");

export const isPreviewUrl = isVercelPreviewUrl || isFirebasePreviewUrl;
export const isDevEnvironment = isPreviewUrl || isLocalhost;

const protocol = isLocalhost ? "http" : "https";
const countOfDomain = location.host.split(".").length;

// domain.localhost
const isExtendedLocalhostUrl = isLocalhost && countOfDomain == 2;

// domain.profolio.dev
const isExtendedProductionUrl = !isLocalhost && countOfDomain == 3;

export const isExtendedUrl = isExtendedLocalhostUrl || isExtendedProductionUrl;

let clearHost = location.host;
if (isExtendedUrl) {
  clearHost = clearHost.replace(location.host.split(".")[0] + ".", "");
}

interface RedirectWithCredentials {
  email: string;
  domain: string;
  password?: string;
}

export const redirectToSignInPage = (
  { domain, email, password }: RedirectWithCredentials,
  options?: { forceRedirect: boolean }
) => {
  const baseUrl = `${protocol}://${domain}.${clearHost}`;

  const searchParams = new URLSearchParams("");
  if (email) {
    searchParams.set("email", toBase64(email));
  }
  if (password) {
    searchParams.set("password", toBase64(password));
  }
  const searchString = searchParams.toString();

  const urlForRedirect = `${baseUrl}/sign-in/?${searchString}`;
  if (options?.forceRedirect || !window.location.href.startsWith(baseUrl)) {
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
