import { useEffect, useState } from 'react'
import { productService } from '../../services/api'
import { categories } from '../../data/companyData'
import { normalizeProduct } from '../../utils/productUtils'
import { getApiErrorMessage } from '../../utils/apiError'
import CompanyImage from '../../components/CompanyImage'

const emptyForm = { name: '', category: categories[0], description: '', priceAmount: '', price: '', image: '', video: '', imageFile: null, videoFile: null }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [fileInputKey, setFileInputKey] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 3500)
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const { data } = await productService.list()
        setProducts(data.map(normalizeProduct))
      } catch (error) {
        setToast({ message: getApiErrorMessage(error, 'Could not load products. Check backend and MongoDB.'), type: 'error' })
        window.setTimeout(() => setToast(null), 3500)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setFileInputKey((value) => value + 1)
  }

  const startEdit = (product) => {
    if (!product._id) {
      showToast('Local catalog items cannot be edited. Choose a product saved in MongoDB.', 'error')
      return
    }
    setEditingId(product._id)
    setForm({
      name: product.name,
      category: product.category || product.categoryName || categories[0],
      description: product.description || '',
      priceAmount: product.priceAmount ? String(product.priceAmount) : '',
      price: product.price && product.price !== `INR ${product.priceAmount}` ? product.price : '',
      image: product.image || product.images?.[0] || '',
      video: product.video || '',
      imageFile: null,
      videoFile: null,
    })
    setFileInputKey((value) => value + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async (event) => {
    event.preventDefault()
    setSaving(true)
    const payload = new FormData()
    payload.append('name', form.name)
    payload.append('categoryName', form.category)
    payload.append('description', form.description)
    payload.append('priceAmount', form.priceAmount)
    if (form.price) payload.append('price', form.price)
    if (form.image) payload.append('image', form.image)
    if (form.video) payload.append('video', form.video)
    if (form.imageFile) payload.append('images', form.imageFile)
    if (form.videoFile) payload.append('video', form.videoFile)

    try {
      if (editingId) {
        const { data } = await productService.update(editingId, payload)
        setProducts((current) => current.map((item) => item._id === editingId ? normalizeProduct(data) : item))
        showToast('Product updated successfully.')
      } else {
        const { data } = await productService.create(payload)
        setProducts((current) => [normalizeProduct(data), ...current])
        showToast('Product created successfully.')
      }
      resetForm()
    } catch (error) {
      showToast(error.response?.data?.message || getApiErrorMessage(error, 'Product save failed.'), 'error')
    } finally {
      setSaving(false)
    }
  }

  const deleteProduct = async (product) => {
    if (!product._id) {
      showToast('Product is not saved in MongoDB, cannot be deleted.', 'error')
      return
    }

    try {
      await productService.remove(product._id)
      setProducts((current) => current.filter((item) => item._id !== product._id))
      if (editingId === product._id) resetForm()
      showToast('Product deleted successfully.')
    } catch {
      showToast('Product deletion failed.', 'error')
    }
  }

  return (
    <>
      <h1 className="font-display text-4xl font-bold text-navy">Manage Products</h1>
      {toast && (
        <div className={`fixed right-6 top-6 z-50 rounded-2xl px-5 py-4 font-bold text-white shadow-2xl ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          {toast.message}
        </div>
      )}
      <form onSubmit={submit} className="card mt-8 grid gap-4 md:grid-cols-2">
        {editingId && (
          <p className="md:col-span-2 rounded-2xl bg-logo-blue/10 px-4 py-3 text-sm font-bold text-logo-blue">
            Editing product — click &quot;Update Product&quot; to save changes or Cancel to discard.
          </p>
        )}
        <input required className="field" placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <select className="field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
        <input required type="number" min="1" step="1" className="field" placeholder="Price (INR per piece/meter)" value={form.priceAmount} onChange={(e) => setForm({ ...form, priceAmount: e.target.value })} />
        <input className="field" placeholder="Price label optional (e.g. INR 500 / Meter)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="field md:col-span-2" placeholder="Image URL optional (.jpg, .png, .webp) — or upload from your computer" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <input className="field md:col-span-2" placeholder="Video URL optional (.mp4, .webm) — or upload from your computer" value={form.video} onChange={(e) => setForm({ ...form, video: e.target.value })} />
        <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
          <label className="rounded-[1.5rem] border border-dashed border-logo-blue/40 bg-logo-blue/5 p-5">
            <span className="block font-display text-lg font-bold text-navy">Upload Product Image</span>
            <span className="mt-1 block text-xs font-semibold text-slate-500">Choose an image from your computer. URL is optional.</span>
            <input key={`image-${fileInputKey}`} type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })} className="mt-4 block w-full text-sm text-slate-600" />
            {form.imageFile && <span className="mt-3 block rounded-full bg-white px-3 py-2 text-xs font-bold text-logo-blue">{form.imageFile.name}</span>}
          </label>
          <label className="rounded-[1.5rem] border border-dashed border-gold/70 bg-logo-yellow/10 p-5">
            <span className="block font-display text-lg font-bold text-navy">Upload Product Video</span>
            <span className="mt-1 block text-xs font-semibold text-slate-500">Choose a video from your computer. MP4/WebM supported.</span>
            <input key={`video-${fileInputKey}`} type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => setForm({ ...form, videoFile: e.target.files?.[0] || null })} className="mt-4 block w-full text-sm text-slate-600" />
            {form.videoFile && <span className="mt-3 block rounded-full bg-white px-3 py-2 text-xs font-bold text-logo-blue">{form.videoFile.name}</span>}
          </label>
        </div>
        {(form.image || form.imageFile || form.video || form.videoFile) && (
          <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            {(form.image || form.imageFile) && (
              <div>
                <p className="mb-2 text-sm font-bold text-slate-500">Image Preview</p>
                <CompanyImage src={form.imageFile ? URL.createObjectURL(form.imageFile) : form.image} alt="Product preview" className="h-44 w-full rounded-2xl object-cover" />
              </div>
            )}
            {(form.video || form.videoFile) && (
              <div>
                <p className="mb-2 text-sm font-bold text-slate-500">Video Preview</p>
                <video src={form.videoFile ? URL.createObjectURL(form.videoFile) : form.video} className="h-44 w-full rounded-2xl bg-navy object-cover" controls muted />
              </div>
            )}
          </div>
        )}
        <textarea required className="field resize-none md:col-span-2" rows="4" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="flex flex-wrap gap-3">
          <button disabled={saving} className="rounded-full bg-logo-gradient px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-full border border-slate-200 px-6 py-3 font-bold text-slate-600">
              Cancel
            </button>
          )}
        </div>
      </form>
      {loading ? <p className="mt-8 font-bold text-logo-blue">Loading products...</p> : null}
      <div className="mt-8 grid gap-4">
        {products.map((product) => (
          <div key={product._id || product.id || product.name} className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {product.video ? <video src={product.video} className="h-24 w-28 rounded-2xl bg-navy object-cover" muted playsInline /> : <CompanyImage src={product.image} alt={product.name} className="h-24 w-28 rounded-2xl object-cover" />}
              <div>
                <h2>{product.name}</h2>
                <p className="text-sm text-slate-500">{product.category}</p>
                <p className="mt-1 text-sm font-bold text-navy">{product.priceAmount ? `INR ${product.priceAmount}` : 'No price set'}</p>
                <p className="mt-1 text-xs text-slate-400">{product._id ? 'Saved in MongoDB' : 'Local catalog item'}{product.video ? ' • Video added' : ''}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {product._id && (
                <button onClick={() => startEdit(product)} className="rounded-full bg-logo-blue/10 px-4 py-2 font-bold text-logo-blue">
                  Edit
                </button>
              )}
              <button onClick={() => deleteProduct(product)} className="rounded-full bg-red-50 px-4 py-2 font-bold text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
