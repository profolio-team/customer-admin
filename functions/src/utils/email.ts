import { createTransport } from "nodemailer";
import { config } from "../firebase";

interface SendEmailProps {
  email: string;
  messageText: string;
  messageHtml: string;
  title: string;
}
export const sendEmail = async ({ email, messageText, messageHtml, title }: SendEmailProps) => {
  try {
    let transporter = createTransport({
      host: config.env.emailSender.host,
      port: 465,
      secure: true,
      auth: {
        user: config.env.emailSender.user,
        pass: config.env.emailSender.password,
      },
    });
    console.log("start sending email", email);
    let result = await transporter.sendMail({
      from: '"Profolio Verification" <noreply@profolio.email>',
      to: email,
      subject: title,
      text: messageText,
      html: messageHtml,
    });

    console.log("sendMail result", result);
  } catch (e) {
    console.log(e);
    console.log("Error");
  }
};
