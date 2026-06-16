import ContactMessage from '../models/ContactMessage.js'
import { sendMail } from '../utils/sendMail.js'

export async function createContactMessage(req, res, next) {
  try {
    const message = await ContactMessage.create(req.body)
    await sendMail({
      to: process.env.MAIL_TO,
      subject: 'New V Colors Contact Request',
      html: `<pre>${JSON.stringify(req.body, null, 2)}</pre>`,
    })
    res.status(201).json(message)
  } catch (error) { next(error) }
}

export async function getContactMessages(_req, res, next) {
  try {
    res.json(await ContactMessage.find().sort('-createdAt'))
  } catch (error) { next(error) }
}

export async function deleteContactMessage(req, res, next) {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id)
    if (!message) return res.status(404).json({ message: 'Contact message not found' })
    res.json({ message: 'Contact message deleted' })
  } catch (error) { next(error) }
}
