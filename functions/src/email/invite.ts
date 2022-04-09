import { admin } from "../firebase";
import { toBase64 } from "../utils/converter";
import { sendEmail } from "./sendEmail";

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
  const messageText = `Your link -> ${setPasswordUrl} (Plain text)`;
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
