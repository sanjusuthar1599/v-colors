import { useEffect, useState } from 'react'
import { contactService } from '../../services/api'
import { getApiErrorMessage } from '../../utils/apiError'

export default function AdminContact() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    loadMessages()
  }, [])

  async function loadMessages() {
    setLoading(true)
    setError('')
    try {
      const { data } = await contactService.list()
      setMessages(data)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not load contact messages.'))
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id) => {
    try {
      await contactService.remove(id)
      setMessages((current) => current.filter((item) => item._id !== id))
      setToast('Contact message deleted.')
      setTimeout(() => setToast(''), 2500)
    } catch {
      setToast('Could not delete message.')
      setTimeout(() => setToast(''), 2500)
    }
  }

  return (
    <>
      <h1 className="font-display text-4xl font-bold text-navy">Contact Messages</h1>
      <p className="mt-2 text-slate-500">Messages submitted from the Contact page inquiry form.</p>
      {toast && <p className="mt-4 rounded-2xl bg-green-50 p-4 font-bold text-green-700">{toast}</p>}
      {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 font-bold text-red-600">{error}</p>}

      {loading && <p className="mt-8 font-bold text-logo-blue">Loading messages...</p>}
      {!loading && !messages.length && <p className="mt-8 card">No contact messages yet.</p>}

      <div className="mt-8 grid gap-4">
        {messages.map((item) => (
          <div key={item._id} className="card">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-navy">{item.fullName}</h2>
                <p className="text-slate-500">{item.companyName || 'Individual'} • {item.email} • {item.phone}</p>
                {item.productRequirement && <p className="mt-2 font-semibold text-purple">Requirement: {item.productRequirement}</p>}
                {item.message && <p className="mt-2 text-sm text-slate-600">{item.message}</p>}
                <p className="mt-2 text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => deleteMessage(item._id)} className="rounded-full bg-red-50 px-4 py-2 font-bold text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
