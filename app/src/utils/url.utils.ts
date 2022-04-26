import { fromBase64, toBase64 } from "./converters";
const hardcodedDomainForPreview = "example";

const isLocalhost = location.host.includes("localhost");

const isVercelPreviewUrl = location.host.includes("vercel.app");
const isFirebasePreviewUrl = location.host.includes("web.app");

const isPreviewUrl = isVercelPreviewUrl || isFirebasePreviewUrl;
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
  const baseUrl = isPreviewUrl ? location.origin : `${protocol}://${domain}.${clearHost}`;

  const searchParams = new URLSearchParams("");
  if (email) {
    searchParams.set("emailBase64", toBase64(email));
  }
  if (password) {
    searchParams.set("password", toBase64(password));
  }
  const searchString = searchParams.toString();

  const urlParams = new URLSearchParams(window.location.search);
  const emailFromUrl = urlParams.get("emailBase64");

  const urlForRedirect = `${baseUrl}/sign-in/?${searchString}`;
  if (options?.forceRedirect || !window.location.href.startsWith(baseUrl) || !emailFromUrl) {
    window.location.href = urlForRedirect;
    return true;
  }
  return false;
};

export const redirectToMainPage = (): boolean => {
  if (isExtendedUrl) {
    const urlWithoutSubdomain = location.toString().replace(location.host.split(".")[0] + ".", "");
    window.location.href = urlWithoutSubdomain;
  }
  return isExtendedUrl;
};

export const getRootFullUrl = () => {
  return `${protocol}://${clearHost}/`;
};

export const getFullUrlWithDomain = (domain: string) => {
  return `${protocol}://${domain}.${clearHost}/`;
};

const subdomain = isExtendedUrl ? location.host.split(".")[0] : null;

export const companyName = isPreviewUrl ? hardcodedDomainForPreview : subdomain;

export const getPasswordParamFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("passwordBase64");
  return param ? fromBase64(param) : "";
};

export const getEmailParamFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get("emailBase64");
  return param ? fromBase64(param) : "";
};

export const getDomainParamFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("domain") || "";
};

export const getConfirmCompanyHashParamFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("confirmCompanyHash") || "";
};

export const getInviteUserHashParamFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("inviteUserHash") || "";
};

export const getResetPasswordUserHashParamFromUrl = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("resetPasswordUserHash") || "";
};
