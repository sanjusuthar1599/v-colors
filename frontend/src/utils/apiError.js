export function getApiErrorMessage(error, fallback = 'Request failed. Please try again.') {
  const status = error?.response?.status
  const apiMessage = error?.response?.data?.message

  if (status === 429) {
    return 'Too many requests. Please wait a minute or restart the backend (npm run dev).'
  }
  if (!error?.response) {
    return 'Backend server is not running. Check your terminal and run npm run dev.'
  }
  if (status === 401 || status === 403) {
    return apiMessage || 'Login expired. Please sign in to the admin panel again.'
  }
  if (status === 503 || status >= 500) {
    return apiMessage || 'Database or server error. Start MongoDB service and restart the backend.'
  }
  return apiMessage || fallback
}
