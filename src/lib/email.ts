import { Resend } from "resend"

// Resend's constructor throws on a missing key, so it must not run at module
// scope: that turned every `import "@/lib/email"` into a 500 at import time
// whenever RESEND_API_KEY was absent, and made the guard in sendEmail below
// unreachable. Built on first send instead, and cached.
let client: Resend | null = null

function getResend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY)
  return client
}

export type EmailNotification = {
  to: string
  subject: string
  html: string
  text?: string
  /** Overrides the default no-reply sender. Use for mail a human should answer. */
  from?: string
  /** Where replies land. Set this on investor mail so answers reach the founder
   *  instead of the unmonitored no-reply mailbox. */
  replyTo?: string
  /** Extra SMTP headers. Used for List-Unsubscribe / List-Unsubscribe-Post,
   *  which Gmail and Yahoo have required from bulk senders since Feb 2024 and
   *  which render the native "Unsubscribe" control next to the sender name. */
  headers?: Record<string, string>
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

    const result = await getResend().emails.send({
      from: notification.from || process.env.SYSTEM_FROM_EMAIL || process.env.EMAIL_FROM || "Notiva <noreply@notifications.notiva.de>",
      to: notification.to,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
      replyTo: notification.replyTo,
      headers: notification.headers
    })

    /* The SDK resolves with { data, error } for API-level failures (unverified
       domain, invalid recipient, quota) instead of throwing, so without this
       check a rejected send is reported as success. */
    if (result.error) {
      console.error("Resend rejected the send:", result.error)
      return { success: false, error: result.error.message ?? "Email send rejected" }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

