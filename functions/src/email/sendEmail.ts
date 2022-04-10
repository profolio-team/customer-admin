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
    console.log("start sending email", email);
    const result = await transporter.sendMail({
      from: `"Profolio Verification" <noreply@profolio.email>`,
      to: email,
      subject: title,
      text: messageText,
      html: messageHtml,
    });

    console.log("sendMail result", JSON.stringify(result));
  } catch (e) {
    console.log(e);
    console.log("Error");
  }
};
