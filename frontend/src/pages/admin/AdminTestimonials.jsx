import { useEffect, useState } from 'react'
import { testimonialService } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'

const emptyForm = { name: '', role: '', quote: '', isActive: true }

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function loadTestimonials() {
    setLoading(true)
    setError('')
    try {
      const { data } = await testimonialService.listAll()
      setItems(data)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not load testimonials.'))
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
      name: item.name || '',
      role: item.role || '',
      quote: item.quote || '',
      isActive: Boolean(item.isActive),
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        const { data } = await testimonialService.update(editingId, form)
        setItems((current) => current.map((item) => item._id === editingId ? data : item))
        setToast('Testimonial updated successfully.')
      } else {
        const { data } = await testimonialService.create(form)
        setItems((current) => [data, ...current])
        setToast('Testimonial added successfully.')
      }
      resetForm()
      setTimeout(() => setToast(''), 2500)
    } catch (err) {
      setToast(getApiErrorMessage(err, 'Testimonial save failed.'))
      setTimeout(() => setToast(''), 3500)
    } finally {
      setSaving(false)
    }
  }

  const deleteItem = async (id) => {
    try {
      await testimonialService.remove(id)
      setItems((current) => current.filter((item) => item._id !== id))
      if (editingId === id) resetForm()
      setToast('Testimonial deleted.')
      setTimeout(() => setToast(''), 2500)
    } catch {
      setToast('Testimonial delete failed.')
      setTimeout(() => setToast(''), 2500)
    }
  }

  return (
    <>
      <h1 className="font-display text-4xl font-bold text-navy">Manage Testimonials</h1>
      {toast && <p className="mt-4 rounded-2xl bg-green-50 p-4 font-bold text-green-700">{toast}</p>}
      {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-bold text-red-600">{error}</p>}

      <form onSubmit={submit} className="card mt-8 grid gap-4">
        {editingId && <p className="font-bold text-logo-blue">Editing testimonial — update or cancel your changes.</p>}
        <div className="grid gap-4 md:grid-cols-2">
          <input required className="field" placeholder="Client Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="field" placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </div>
        <textarea required className="field resize-none" rows="4" placeholder="Quote" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
        <label className="flex items-center gap-3 text-sm font-bold text-slate-600">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Show on website (active)
        </label>
        <div className="flex flex-wrap gap-3">
          <button disabled={saving} className="rounded-full bg-purple px-6 py-3 font-bold text-white disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-full border border-slate-200 px-6 py-3 font-bold text-slate-600">Cancel</button>
          )}
        </div>
      </form>

      <div className="mt-8 grid gap-4">
        {loading && <div className="card">Loading testimonials...</div>}
        {!loading && !items.length && <div className="card">No testimonials yet. Add one above.</div>}
        {items.map((item) => (
          <div key={item._id} className="card">
            <p>&ldquo;{item.quote}&rdquo;</p>
            <h2 className="mt-4">{item.name}</h2>
            <p className="text-sm text-slate-500">{item.role}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-widest text-logo-blue">
              {item.isActive ? 'Active on website' : 'Hidden'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => startEdit(item)} className="rounded-full bg-logo-blue/10 px-4 py-2 font-bold text-logo-blue">Edit</button>
              <button onClick={() => deleteItem(item._id)} className="rounded-full bg-red-50 px-4 py-2 font-bold text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
