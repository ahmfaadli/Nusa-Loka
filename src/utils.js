export function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

export function initCart() {
  const saved = localStorage.getItem('nusa-loka-cart')
  return saved ? JSON.parse(saved) : []
}

export function saveCart(cart) {
  localStorage.setItem('nusa-loka-cart', JSON.stringify(cart))
}

export function loadProducts() {
  return []
}
