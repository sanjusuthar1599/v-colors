import { useState } from 'react'
import { inquiryService, contactService } from '../services/api'

const initialValues = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  productInterested: '',
  quantity: '',
  productRequirement: '',
  message: '',
}

export default function InquiryForm({ type = 'inquiry', selectedProduct = '' }) {
  const [form, setForm] = useState({ ...initialValues, productInterested: selectedProduct })
  const [status, setStatus] = useState('')

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setStatus('Sending...')
    try {
      if (type === 'contact') await contactService.create(form)
      else await inquiryService.create(form)
      setStatus('Thank you. Our team will contact you shortly.')
      setForm({ ...initialValues, productInterested: selectedProduct })
    } catch {
      setStatus('Request could not be submitted right now. Please check server connection or contact V.Colors directly.')
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="fullName" value={form.fullName} onChange={update} required placeholder="Full Name" className="field" />
        <input name="companyName" value={form.companyName} onChange={update} placeholder="Company Name" className="field" />
        <input name="email" value={form.email} onChange={update} required type="email" placeholder="Email" className="field" />
        <input name="phone" value={form.phone} onChange={update} required placeholder="Phone" className="field" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="productInterested" value={form.productInterested} onChange={update} placeholder="Product Interested" className="field" />
        {type === 'contact' ? (
          <input name="productRequirement" value={form.productRequirement} onChange={update} placeholder="Product Requirement" className="field" />
        ) : (
          <input name="quantity" value={form.quantity} onChange={update} placeholder="Quantity" className="field" />
        )}
      </div>
      <textarea name="message" value={form.message} onChange={update} rows="5" placeholder="Message" className="field resize-none" />
      <button className="rounded-full bg-logo-gradient px-7 py-4 font-bold text-white transition hover:shadow-lg">Submit Request</button>
      {status && <p className="text-sm font-semibold text-logo-blue">{status}</p>}
    </form>
  )
}
