import Testimonial from '../models/Testimonial.js'

export async function getTestimonials(_req, res, next) {
  try {
    res.json(await Testimonial.find({ isActive: true }).sort('-createdAt'))
  } catch (error) { next(error) }
}

export async function getAllTestimonials(_req, res, next) {
  try {
    res.json(await Testimonial.find().sort('-createdAt'))
  } catch (error) { next(error) }
}

export async function createTestimonial(req, res, next) {
  try {
    res.status(201).json(await Testimonial.create(req.body))
  } catch (error) { next(error) }
}

export async function updateTestimonial(req, res, next) {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' })
    res.json(testimonial)
  } catch (error) { next(error) }
}

export async function deleteTestimonial(req, res, next) {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ message: 'Testimonial deleted' })
  } catch (error) { next(error) }
}
