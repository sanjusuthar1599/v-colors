export function showToast({ title, message, type = 'success' }) {
  window.dispatchEvent(new CustomEvent('vcolors:toast', {
    detail: { title, message, type },
  }))
}
