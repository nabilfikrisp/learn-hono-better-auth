import { env } from "@/common/utils/env.config.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: undefined,
});

type SendMailOptions = Pick<
  nodemailer.SendMailOptions,
  "to" | "subject" | "text"
>;

export async function sendEmail(options: SendMailOptions) {
  try {
    const info = await transporter.sendMail({
      from: "Hono Better Auth <no-reply@example.com>",
      to: options.to,
      subject: options.subject,
      text: options.text,
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
