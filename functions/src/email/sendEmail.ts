import { createTransport } from "nodemailer";
import { config } from "../firebase";

interface SendEmailProps {
  email: string;
  messageText: string;
  messageHtml: string;
  title: string;
}

export const sendEmail = async ({
  email,
  messageText,
  messageHtml,
  title,
}: SendEmailProps): Promise<void> => {
  try {
    const transporter = createTransport({
      host: config.email.host,
      port: 465,
      secure: true,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
    const useEmulator = config.email.use_emulator;
    if (useEmulator) {
      console.log(`
-----------------------
Email message (EMULATOR):
To: ${email}
Message: ${messageText}
`);
    } else {
      const sendResult = await transporter.sendMail({
        from: `"Profolio Verification" <${config.email.user}>`,
        to: email,
        subject: title,
        text: messageText,
        html: messageHtml,
      });
      console.log(`Send email to: ${email}`);
      console.log(JSON.stringify(sendResult));
    }
  } catch (e) {
    console.log(e);
    console.log("Error");
  }
};
