import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey && !apiKey.includes("placeholder") ? new Resend(apiKey) : null;

export const FROM =
  process.env.EMAIL_FROM || "PAL's Academy <palseduacademy@gmail.com>";
export const REPLY_TO = process.env.EMAIL_REPLY_TO || "palseduacademy@gmail.com";
export const ADMIN_TO = process.env.ADMIN_NOTIFY_EMAIL || "palseduacademy@gmail.com";

/**
 * Sends an email if Resend is configured, otherwise logs the payload.
 * Lets the app run end-to-end in dev without keys.
 */
export async function sendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!resend) {
    console.log("[email:dev-noop]", params.subject, "→", params.to);
    return { id: "dev-noop" };
  }
  const res = await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: params.subject,
    html: params.html,
    replyTo: params.replyTo || REPLY_TO
  });
  if (res.error) throw new Error(res.error.message);
  return { id: res.data?.id };
}
