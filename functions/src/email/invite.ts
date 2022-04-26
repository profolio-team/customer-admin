import { toBase64 } from "../utils/converter";
import { sendEmail } from "./sendEmail";
import { config } from "../firebase";

interface UrlParamsForClientApp {
  emailBase64?: string;
  confirmCompanyHash?: string;
  inviteUserHash?: string;
  resetPasswordUserHash?: string;
}
type queryParams = keyof UrlParamsForClientApp;

const generateUrlParams = (params: UrlParamsForClientApp): string => {
  const keys = Object.keys(params) as queryParams[];
  const urlParams = keys.map((key: queryParams) => `${key}=${params[key]}`).join("&");
  return urlParams;
};
const getBaseUrl = (domain?: string): string => {
  const protocol = config.host.base.includes("localhost") ? "http" : "https";
  const domainPart = domain ? `${domain}.` : "";
  const baseUrl = `${protocol}://${domainPart}${config.host.base}`;
  return baseUrl;
};

interface ConfirmCompanyLink {
  domain: string;
  email: string;
  confirmCompanyHash: string;
  inviteUserHash: string;
  resetPasswordUserHash: string;
}

export const sendConfirmCompanyLink = async ({
  domain,
  email,
  confirmCompanyHash,
  inviteUserHash,
  resetPasswordUserHash,
}: ConfirmCompanyLink): Promise<string> => {
  const emailBase64 = toBase64(email);
  const baseUrl = getBaseUrl(domain);

  const urlParts: UrlParamsForClientApp = {
    emailBase64,
    confirmCompanyHash,
    inviteUserHash,
    resetPasswordUserHash,
  };
  const urlParams = generateUrlParams(urlParts);
  const link = `${baseUrl}/confirm-company?${urlParams}`;

  const messageText = `Link for confirm company -> ${link}`;
  const messageHtml = `
    Link for confirm company ${domain} -> 
    <a href="${link}">Link for confirm company</a>
  `;

  await sendEmail({
    email,
    messageText,
    messageHtml,
    title: "Confirm company",
  });
  return link;
};

interface ConfirmUserLink {
  domain: string;
  email: string;
  resetPasswordUserHash: string;
  inviteUserHash: string;
}

export const sendInviteUserLink = async ({
  domain,
  email,
  resetPasswordUserHash,
  inviteUserHash,
}: ConfirmUserLink): Promise<string> => {
  const emailBase64 = toBase64(email);
  const baseUrl = getBaseUrl(domain);

  const urlParts: UrlParamsForClientApp = {
    emailBase64,
    inviteUserHash,
    resetPasswordUserHash,
  };
  const urlParams = generateUrlParams(urlParts);
  const link = `${baseUrl}/accept-invite?${urlParams}`;

  const messageText = `Link for invite user -> ${link}`;
  const messageHtml = `
    Link for invite user ${domain} -> 
    <a href="${link}">Link for confirm company</a>
  `;

  await sendEmail({
    email,
    messageText,
    messageHtml,
    title: `Invite user to company ${domain}`,
  });
  return link;
};

interface ResetPasswordProps {
  email: string;
  resetPasswordUserHash: string;
}

export const sendResetPasswordUserLink = async ({
  email,
  resetPasswordUserHash,
}: ResetPasswordProps): Promise<string> => {
  const emailBase64 = toBase64(email);
  const baseUrl = getBaseUrl();

  const urlParts: UrlParamsForClientApp = {
    emailBase64,
    resetPasswordUserHash,
  };
  const urlParams = generateUrlParams(urlParts);
  const link = `${baseUrl}/reset-password?${urlParams}`;

  const messageText = `Link for reset password -> ${link}`;
  const messageHtml = `
    Link for reset password -> 
    <a href="${link}">Link for confirm company</a>
  `;

  await sendEmail({
    email,
    messageText,
    messageHtml,
    title: `Reset password Profolio`,
  });
  return link;
};
