import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/api'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: 'admin@vcolors.in', password: 'admin123' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const { data } = await authService.login(form)
      localStorage.setItem('vcolors_token', data.token)
      navigate('/admin')
    } catch {
      setError('Login failed. Seed an admin user or check backend environment.')
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-navy to-purple p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <h1 className="font-display text-3xl font-bold text-navy">V Colors Admin</h1>
        <p className="mt-2 text-slate-500">Protected dashboard login</p>
        <input className="field mt-8" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" />
        <input className="field mt-4" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password" />
        <button className="mt-6 w-full rounded-full bg-navy px-6 py-4 font-bold text-white">Login</button>
        {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}
      </form>
    </main>
  )
}
