import { useEffect, useState } from 'react'
import { galleryService } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'

const categories = ['Factory Images', 'Product Images', 'Machinery Images', 'Team Images']

export default function AdminGallery() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ category: 'Product Images', image: '', title: '', imageFile: null })
  const [fileKey, setFileKey] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    loadGallery()
  }, [])

  async function loadGallery() {
    setLoading(true)
    try {
      const { data } = await galleryService.list()
      setItems(data)
    } catch (error) {
      setToast(getApiErrorMessage(error, 'Could not load gallery images.'))
    } finally {
      setLoading(false)
    }
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!form.image && !form.imageFile) {
      setToast('Please add an image URL or upload a file.')
      return
    }
    setSaving(true)
    setToast('')
    try {
      const payload = new FormData()
      payload.append('category', form.category)
      if (form.title) payload.append('title', form.title)
      if (form.image) payload.append('image', form.image)
      if (form.imageFile) payload.append('image', form.imageFile)
      const { data } = await galleryService.create(payload)
      setItems((current) => [data, ...current])
      setForm({ category: 'Product Images', image: '', title: '', imageFile: null })
      setFileKey((value) => value + 1)
      setToast('Gallery image added successfully.')
    } catch (error) {
      setToast(getApiErrorMessage(error, 'Gallery image could not be saved.'))
    } finally {
      setSaving(false)
    }
  }

  const deleteItem = async (id) => {
    try {
      await galleryService.remove(id)
      setItems((current) => current.filter((item) => item._id !== id))
      setToast('Gallery image deleted.')
    } catch {
      setToast('Gallery image deletion failed.')
    }
  }

  return (
    <>
      <h1 className="font-display text-4xl font-bold text-navy">Manage Gallery</h1>
      {toast && <p className="mt-4 rounded-2xl bg-green-50 p-4 font-bold text-green-700">{toast}</p>}

      <form onSubmit={submit} className="card mt-8 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <select className="field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input className="field" placeholder="Title optional" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <input className="field" placeholder="Image URL optional — or upload below" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <label className="rounded-[1.5rem] border border-dashed border-logo-blue/40 bg-logo-blue/5 p-5">
          <span className="block font-display text-lg font-bold text-navy">Upload Image</span>
          <span className="mt-1 block text-xs font-semibold text-slate-500">Choose an image from your computer. JPG, PNG, WebP supported.</span>
          <input key={fileKey} type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })} className="mt-4 block w-full text-sm text-slate-600" />
          {form.imageFile && <span className="mt-3 block rounded-full bg-white px-3 py-2 text-xs font-bold text-logo-blue">{form.imageFile.name}</span>}
        </label>
        <button disabled={saving} className="w-fit rounded-full bg-purple px-6 py-3 font-bold text-white disabled:opacity-60">
          {saving ? 'Saving...' : 'Add Image'}
        </button>
      </form>

      {loading && <p className="mt-8 font-bold text-logo-blue">Loading gallery...</p>}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="overflow-hidden rounded-[2rem] bg-white shadow-lg">
            <img src={item.image} alt={item.category} className="h-48 w-full object-cover" />
            <div className="flex items-center justify-between p-4">
              <span className="font-semibold">{item.category}</span>
              <button onClick={() => deleteItem(item._id)} className="rounded-full bg-red-50 px-3 py-1 font-bold text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
