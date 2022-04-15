import { admin } from "../firebase";
import { toBase64 } from "../utils/converter";
import { sendEmail } from "./sendEmail";
import { config } from "../firebase";

interface sendEmailLinkProps {
  rootDomainUrl: string;
  email: string;
  fullDomainUrl: string;
}

const generateLinkForSetPassword = async (
  rootDomainUrl: string,
  email: string,
  fullDomainUrl: string
) => {
  const emailBase64 = toBase64(email);
  const urlForSignIn = `${fullDomainUrl}sign-in?email=${emailBase64}`;

  const urlBase64 = toBase64(urlForSignIn);
  const actionCodeSettingsForConfirmCompany = {
    url: `${rootDomainUrl}redirect?to=${urlBase64}`,
  };

  const setPasswordUrl = await admin
    .auth()
    .generatePasswordResetLink(email, actionCodeSettingsForConfirmCompany);

  const actionCodeSettingsForRestPassword = {
    url: `${setPasswordUrl}&newPassword=123123`,
  };

  const verificationLink = await admin
    .auth()
    .generateEmailVerificationLink(email, actionCodeSettingsForRestPassword);

  return verificationLink;
};

export const sendInviteLink = async ({
  rootDomainUrl,
  email,
  fullDomainUrl,
}: sendEmailLinkProps): Promise<string> => {
  const setPasswordUrl = await generateLinkForSetPassword(rootDomainUrl, email, fullDomainUrl);
  const messageText = `Invite lint -> ${setPasswordUrl} (Plain text)`;
  const messageHtml = `
        Your link -> 
        <a href="${setPasswordUrl}">Link for confirm and set password</a>
      `;
  await sendEmail({
    email,
    messageText,
    messageHtml,
    title: "Confirm company",
  });
  return setPasswordUrl;
};

const generateLinkForConfirmCompany = async (
  domain: string,
  confirmCompanyHash: string,
  email: string,
  confirmUserHash: string
) => {
  const emailBase64 = toBase64(email);
  const protocol = config.host.base.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${domain}.${config.host.base}`;
  const confirmUserHashPart = `&confirmUserHash=${confirmUserHash}`;
  const emailPart = `&email=${emailBase64}`;
  const confirmCompanyHashPart = `confirmCompanyHash=${confirmCompanyHash}`;
  const url = `${baseUrl}/confirm-company?${confirmCompanyHashPart}${emailPart}${confirmUserHashPart}`;
  return url;
};

const generateLinkForInviteUser = async (
  domain: string,
  email: string,
  confirmUserHash: string
) => {
  const emailBase64 = toBase64(email);
  const protocol = config.host.base.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${domain}.${config.host.base}`;
  const confirmUserHashPart = `&confirmUserHash=${confirmUserHash}`;
  const emailPart = `email=${emailBase64}`;
  const url = `${baseUrl}/invite-user?${emailPart}${confirmUserHashPart}`;
  return url;
};

interface ConfirmCompanyLink {
  domain: string;
  email: string;
  confirmCompanyHash: string;
  confirmUserHash: string;
}

export const sendConfirmCompanyLink = async ({
  domain,
  email,
  confirmCompanyHash,
  confirmUserHash,
}: ConfirmCompanyLink): Promise<string> => {
  const link = await generateLinkForConfirmCompany(
    domain,
    confirmCompanyHash,
    email,
    confirmUserHash
  );
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
  confirmUserHash: string;
}

export const sendInviteUserLink = async ({
  domain,
  email,
  confirmUserHash,
}: ConfirmUserLink): Promise<string> => {
  const link = await generateLinkForInviteUser(domain, email, confirmUserHash);
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
