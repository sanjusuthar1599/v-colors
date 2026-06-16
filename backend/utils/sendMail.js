import nodemailer from 'nodemailer'

let transporter

function getTransporter() {
  if (!process.env.SMTP_HOST) return null
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
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
    return { skipped: true }
  }

  const recipient = to || process.env.MAIL_TO || process.env.SMTP_USER
  if (!recipient) {
    console.warn('[email] No recipient — skipped:', subject)
    return { skipped: true }
  }

  const info = await mailer.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: recipient,
    subject,
    html,
    text,
  })

  return info
}
