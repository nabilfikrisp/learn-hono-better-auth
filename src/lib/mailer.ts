import { env } from "@/common/utils/env.config.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: undefined,
});

type SendEmailParams = {
  to: string;
  subject: string;
  text: string;
};
export async function sendEmail({ to, subject, text }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: "Hono Better Auth <no-reply@example.com>",
      to,
      subject,
      text,
    });

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
