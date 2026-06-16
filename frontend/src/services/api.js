import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('vcolors_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
}

export const productService = {
  list: () => api.get('/products'),
  create: (payload) => api.post('/products', payload),
  update: (id, payload) => api.put(`/products/${id}`, payload),
  remove: (id) => api.delete(`/products/${id}`),
}

export const inquiryService = {
  create: (payload) => api.post('/inquiry', payload),
  list: () => api.get('/inquiry'),
  update: (id, payload) => api.put(`/inquiry/${id}`, payload),
  remove: (id) => api.delete(`/inquiry/${id}`),
}

export const orderService = {
  create: (payload) => api.post('/orders', payload),
  list: () => api.get('/orders'),
  get: (id) => api.get(`/orders/${id}`),
  track: (payload) => api.post('/orders/track', payload),
  update: (id, payload) => api.put(`/orders/${id}`, payload),
  confirmStripe: (id, sessionId) => api.post(`/orders/${id}/confirm-stripe${sessionId ? `?session_id=${sessionId}` : ''}`),
}

export const contactService = {
  create: (payload) => api.post('/contact', payload),
  list: () => api.get('/contact'),
  remove: (id) => api.delete(`/contact/${id}`),
}

export const galleryService = {
  list: () => api.get('/gallery'),
  create: (payload) => api.post('/gallery', payload),
  remove: (id) => api.delete(`/gallery/${id}`),
}

export const testimonialService = {
  list: () => api.get('/testimonials'),
  listAll: () => api.get('/testimonials/all'),
  create: (payload) => api.post('/testimonials', payload),
  update: (id, payload) => api.put(`/testimonials/${id}`, payload),
  remove: (id) => api.delete(`/testimonials/${id}`),
}

export default api
