import nodemailer from 'nodemailer'

let transporter

function extractEmail(value) {
  const match = String(value || '').match(/<([^>]+)>/)
  return (match ? match[1] : value).trim()
}

/** Gmail requires the From address to match SMTP_USER unless "Send mail as" is verified. */
export function resolveFromAddress() {
  const smtpUser = process.env.SMTP_USER?.trim()
  const mailFrom = process.env.MAIL_FROM?.trim()

  if (!smtpUser) return mailFrom || 'noreply@localhost'

  const smtpEmail = extractEmail(smtpUser)
  const fromEmail = extractEmail(mailFrom || smtpUser)

  if (fromEmail.toLowerCase() !== smtpEmail.toLowerCase()) {
    const displayMatch = mailFrom?.match(/^(.+?)\s*</)
    const quotedMatch = mailFrom?.match(/^["'](.+?)["']/)
    const displayName = displayMatch?.[1]?.trim().replace(/^["']|["']$/g, '')
      || quotedMatch?.[1]?.trim()
      || 'V.Colors'
    return `"${displayName}" <${smtpEmail}>`
  }

  return mailFrom || smtpUser
}

export function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

function getTransporter() {
  if (!isSmtpConfigured()) return null
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587)
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      requireTLS: port === 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }
  return transporter
}

export async function sendMail({ to, subject, html, text }) {
  const mailer = getTransporter()
  if (!mailer) {
    console.warn('[email] SMTP not configured — skipped:', subject)
    return { success: false, skipped: true, error: 'SMTP not configured' }
  }

  const recipient = String(to || process.env.MAIL_TO || process.env.SMTP_USER || '').trim()
  if (!recipient) {
    console.warn('[email] No recipient — skipped:', subject)
    return { success: false, skipped: true, error: 'No recipient' }
  }

  const from = resolveFromAddress()

  try {
    const info = await mailer.sendMail({
      from,
      to: recipient,
      subject,
      html,
      text,
    })
    console.log('[email] Sent:', subject, '→', recipient, info.messageId || '')
    return { success: true, messageId: info.messageId, to: recipient }
  } catch (error) {
    console.error('[email] Failed:', subject, '→', recipient, error.message)
    return { success: false, error: error.message, to: recipient }
  }
}
