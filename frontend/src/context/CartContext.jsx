import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { showToast } from '../utils/toast'

const CartContext = createContext(null)

function productKey(product) {
  return product._id || product.id
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('vcolors_cart') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('vcolors_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product, quantity = 1) => {
    const productName = product.name || 'Product'
    const amount = typeof product.priceAmount === 'number' && product.priceAmount > 0
      ? product.priceAmount
      : Number(String(product.price || '').match(/\d+/)?.[0] || 0)
    if (!amount) {
      showToast({ type: 'info', title: 'Price not set', message: 'This product has no price yet. Contact V.Colors or set price in admin.' })
      return
    }
    setItems((current) => {
      const id = productKey(product)
      const existing = current.find((item) => item.id === id)
      if (existing) {
        return current.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item)
      }
      return [...current, {
        id,
        productId: product._id || product.id,
        name: product.name,
        image: product.image || product.images?.[0],
        category: product.category?.name || product.category,
        price: product.price,
        priceAmount: amount,
        quantity,
      }]
    })
    showToast({
      type: 'cart',
      title: 'Added to cart',
      message: `${productName} is ready for checkout.`,
    })
  }

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Number(quantity)
    if (nextQuantity <= 0) {
      setItems((current) => current.filter((item) => item.id !== id))
      return
    }
    setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: nextQuantity } : item))
  }

  const removeFromCart = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
    showToast({ type: 'info', title: 'Removed from cart', message: 'Cart has been updated.' })
  }
  const clearCart = useCallback(() => setItems([]), [])

  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.priceAmount * item.quantity, 0)
    const shippingCharge = subtotal > 0 && subtotal < 999 ? 99 : 0
    return {
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shippingCharge,
      total: subtotal + shippingCharge,
    }
  }, [items])

  const getProductQuantity = (product) => {
    const id = productKey(product)
    return items.find((item) => item.id === id)?.quantity || 0
  }

  return <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, getProductQuantity, summary }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
