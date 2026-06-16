import { useEffect, useMemo, useState } from 'react'
import { inquiryService } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'

const emptyForm = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  productInterested: '',
  quantity: '',
  message: '',
  status: 'new',
}

const statusOptions = ['new', 'contacted', 'closed']

export default function AdminInquiries() {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => items.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase())), [items, query])

  useEffect(() => {
    loadInquiries()
  }, [])

  async function loadInquiries() {
    setLoading(true)
    setError('')
    try {
      const { data } = await inquiryService.list()
      setItems(data)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not load inquiries.'))
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const startEdit = (item) => {
    setEditingId(item._id)
    setForm({
      fullName: item.fullName || '',
      companyName: item.companyName || '',
      email: item.email || '',
      phone: item.phone || '',
      productInterested: item.productInterested || '',
      quantity: item.quantity || '',
      message: item.message || '',
      status: item.status || 'new',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!editingId) return
    setSaving(true)
    try {
      const { data } = await inquiryService.update(editingId, form)
      setItems((current) => current.map((item) => item._id === editingId ? data : item))
      setToast('Inquiry updated successfully.')
      resetForm()
      setTimeout(() => setToast(''), 2500)
    } catch (err) {
      setToast(getApiErrorMessage(err, 'Inquiry update failed.'))
      setTimeout(() => setToast(''), 3500)
    } finally {
      setSaving(false)
    }
  }

  const deleteItem = async (id) => {
    try {
      await inquiryService.remove(id)
      setItems((current) => current.filter((item) => item._id !== id))
      if (editingId === id) resetForm()
      setToast('Inquiry deleted.')
      setTimeout(() => setToast(''), 2500)
    } catch {
      setToast('Inquiry delete failed.')
      setTimeout(() => setToast(''), 2500)
    }
  }

  return (
    <>
      <h1 className="font-display text-4xl font-bold text-navy">Manage Inquiries</h1>
      {toast && <p className="mt-4 rounded-2xl bg-green-50 p-4 font-bold text-green-700">{toast}</p>}
      {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-bold text-red-600">{error}</p>}

      {editingId && (
        <form onSubmit={submit} className="card mt-8 grid gap-4">
          <p className="font-bold text-logo-blue">Editing inquiry — save your changes or cancel.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <input required className="field" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <input className="field" placeholder="Company Name" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
            <input required type="email" className="field" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input required className="field" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="field" placeholder="Product Interested" value={form.productInterested} onChange={(e) => setForm({ ...form, productInterested: e.target.value })} />
            <input className="field" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <select className="field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
          <textarea className="field resize-none" rows="4" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <div className="flex flex-wrap gap-3">
            <button disabled={saving} className="rounded-full bg-logo-gradient px-6 py-3 font-bold text-white disabled:opacity-60">
              {saving ? 'Saving...' : 'Update Inquiry'}
            </button>
            <button type="button" onClick={resetForm} className="rounded-full border border-slate-200 px-6 py-3 font-bold text-slate-600">Cancel</button>
          </div>
        </form>
      )}

      <input className="field mt-8 max-w-lg" placeholder="Search inquiries" value={query} onChange={(event) => setQuery(event.target.value)} />

      <div className="mt-8 grid gap-4">
        {loading && <div className="card">Loading inquiries...</div>}
        {!loading && !filtered.length && <div className="card">No inquiries found yet.</div>}
        {filtered.map((item) => (
          <div key={item._id} className="card">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div>
                <h2>{item.fullName}</h2>
                <p className="text-slate-500">{item.companyName} • {item.email} • {item.phone}</p>
                <p className="mt-2 font-semibold text-purple">{item.productInterested} / {item.quantity}</p>
                {item.message && <p className="mt-2 text-sm text-slate-600">{item.message}</p>}
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-logo-blue">Status: {item.status || 'new'}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => startEdit(item)} className="rounded-full bg-logo-blue/10 px-4 py-2 font-bold text-logo-blue">Edit</button>
                <button onClick={() => deleteItem(item._id)} className="rounded-full bg-red-50 px-4 py-2 font-bold text-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
