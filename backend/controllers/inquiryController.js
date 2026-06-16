import Inquiry from '../models/Inquiry.js'
import { sendMail } from '../utils/sendMail.js'

export async function createInquiry(req, res, next) {
  try {
    const inquiry = await Inquiry.create(req.body)
    await sendMail({ subject: 'New V Colors Product Inquiry', html: `<pre>${JSON.stringify(req.body, null, 2)}</pre>` })
    res.status(201).json(inquiry)
  } catch (error) { next(error) }
}

export async function getInquiries(req, res, next) {
  try {
    const q = String(req.query.q || '').trim()
    let filter = {}
    if (q) {
      const pattern = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      filter = {
        $or: [
          { fullName: pattern },
          { companyName: pattern },
          { email: pattern },
          { phone: pattern },
          { productInterested: pattern },
          { message: pattern },
        ],
      }
    }
    res.json(await Inquiry.find(filter).sort('-createdAt'))
  } catch (error) { next(error) }
}

export async function updateInquiry(req, res, next) {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' })
    res.json(inquiry)
  } catch (error) { next(error) }
}

export async function deleteInquiry(req, res, next) {
  try {
    await Inquiry.findByIdAndDelete(req.params.id)
    res.json({ message: 'Inquiry deleted' })
  } catch (error) { next(error) }
}
