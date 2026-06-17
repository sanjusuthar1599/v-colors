import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/api'

function getLoginError(error) {
  if (!error?.response) {
    return 'Cannot reach backend API. If the server was sleeping (Render free tier), wait 30–60 seconds and try again.'
  }

  const status = error.response.status
  const message = error.response.data?.message

  if (status === 401) return 'Invalid email or password.'
  if (status === 503) return message || 'Database is waking up. Please wait a few seconds and try again.'
  if (status === 429) return 'Too many login attempts. Please wait a moment and try again.'
  if (status >= 500) return message || 'Server error. Please try again in a few seconds.'

  return message || 'Login failed. Please try again.'
}

async function loginWithRetry(credentials, attempts = 3) {
  let lastError
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await authService.login(credentials)
    } catch (err) {
      lastError = err
      const retryable = !err.response || err.response.status === 503 || err.code === 'ECONNABORTED'
      if (retryable && i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        continue
      }
      throw lastError
    }
  }
  throw lastError
}

export default function AdminLogin() {
  const [form, setForm] = useState({ email: 'admin@vcolors.in', password: 'admin123' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await loginWithRetry(form)
      localStorage.setItem('vcolors_token', data.token)
      navigate('/admin')
    } catch (err) {
      setError(getLoginError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-navy to-purple p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <h1 className="font-display text-3xl font-bold text-navy">V Colors Admin</h1>
        <p className="mt-2 text-slate-500">Protected dashboard login</p>
        <input className="field mt-8" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" />
        <input className="field mt-4" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password" />
        <button disabled={loading} className="mt-6 w-full rounded-full bg-navy px-6 py-4 font-bold text-white disabled:opacity-60">
          {loading ? 'Logging in…' : 'Login'}
        </button>
        {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
      </form>
    </main>
  )
}
