import { Resend } from "resend"

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

export type EmailNotification = {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send an email notification
 */
export async function sendEmail(notification: EmailNotification) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, skipping email send")
      return { success: false, error: "Email service not configured" }
    }

    const result = await resend.emails.send({
      from: process.env.SYSTEM_FROM_EMAIL || process.env.EMAIL_FROM || "Notiva <noreply@notifications.notiva.de>",
      to: notification.to,
      subject: notification.subject,
      html: notification.html,
      text: notification.text
    })

    return { success: true, data: result }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

