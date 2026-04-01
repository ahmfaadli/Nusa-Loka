import { supabase } from './supabase.js'

const cart = []

// --- Load Products dari Supabase ---
async function loadProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  const grid = document.getElementById('products-grid')
  if (!grid) return

  grid.innerHTML = data.map((product, index) => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition flex flex-col">
      <div class="h-48 bg-gray-200">
        <img src="${product.image_url}" 
             class="w-full h-full object-cover"
             onerror="this.src='https://via.placeholder.com/300'">
      </div>

      <div class="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-coffee-dark">${product.name}</h3>
          <p class="text-sm text-gray-500">${product.category}</p>
          <p class="text-xl font-semibold text-coffee-brown">Rp ${product.price}</p>
        </div>
        <button 
          class="bg-coffee-dark text-white py-2 rounded-lg font-semibold hover:bg-coffee-brown transition mt-4"
          data-index="${index}"
        >
          Beli
        </button>
      </div>
    </div>
  `).join('')

  // --- Tambahkan Event Listener ke tombol Beli ---
  const buttons = grid.querySelectorAll('button')
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => openDetailModal(data[i]))
  })
}

// --- Modal Detail ---
const detailModal = document.getElementById('detail-modal')
function openDetailModal(product) {
  document.getElementById('detail-name').textContent = product.name
  document.getElementById('detail-price').textContent = `Rp ${product.price}`
  document.getElementById('detail-description').textContent = product.description || ''
  document.getElementById('detail-image').src = product.image_url || 'https://via.placeholder.com/300'
  document.getElementById('detail-quantity').value = 1
  detailModal.classList.remove('hidden')

  // Simpan product sementara untuk ditambahkan ke cart
  detailModal.dataset.productId = product.id
  detailModal.dataset.productName = product.name
  detailModal.dataset.productPrice = product.price
}

// Close Detail Modal
document.getElementById('close-detail').addEventListener('click', () => {
  detailModal.classList.add('hidden')
})

// --- Tambah ke Keranjang ---
document.getElementById('add-to-cart-detail').addEventListener('click', () => {
  const name = detailModal.dataset.productName
  const price = parseInt(detailModal.dataset.productPrice)
  const quantity = parseInt(document.getElementById('detail-quantity').value)

  const existing = cart.find(item => item.name === name)
  if (existing) {
    existing.quantity += quantity
  } else {
    cart.push({ name, price, quantity })
  }

  updateCart()
  detailModal.classList.add('hidden')
  alert(`${quantity} ${name} berhasil ditambahkan ke keranjang!`)
})

// --- Update Cart ---
function updateCart() {
  const cartItems = document.getElementById('cart-items')
  const cartCount = document.getElementById('cart-count')
  const cartTotal = document.getElementById('cart-total')

  cartItems.innerHTML = ''
  let total = 0
  cart.forEach((item, index) => {
    total += item.price * item.quantity
    cartItems.innerHTML += `
      <div class="flex justify-between items-center mb-4">
        <div>
          <h4 class="font-semibold text-coffee-dark">${item.name}</h4>
          <div class="flex items-center space-x-2 mt-1">
            <button class="text-white bg-coffee-dark px-2 rounded" data-action="decrease" data-index="${index}">-</button>
            <span class="px-2">${item.quantity}</span>
            <button class="text-white bg-coffee-dark px-2 rounded" data-action="increase" data-index="${index}">+</button>
          </div>
        </div>
        <p class="font-bold text-coffee-brown">Rp ${(item.price * item.quantity).toLocaleString()}</p>
      </div>
    `
  })

  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0)
  cartTotal.textContent = `Rp ${total.toLocaleString()}`

  // Aktifkan tombol checkout hanya jika cart ada isi
  document.getElementById('checkout-btn').disabled = cart.length === 0

  // --- Tambahkan Event Listener untuk + / - ---
  cartItems.querySelectorAll('button').forEach(btn => {
    const index = parseInt(btn.dataset.index)
    if (btn.dataset.action === 'increase') {
      btn.addEventListener('click', () => {
        cart[index].quantity += 1
        updateCart()
      })
    }
    if (btn.dataset.action === 'decrease') {
      btn.addEventListener('click', () => {
        cart[index].quantity -= 1
        if (cart[index].quantity <= 0) cart.splice(index, 1)
        updateCart()
      })
    }
  })
}

// --- Event Cart Modal ---
document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.remove('hidden')
})
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.add('hidden')
})
document.getElementById('continue-shopping').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.add('hidden')
})
document.getElementById('checkout-btn').addEventListener('click', () => {
  const summary = document.getElementById('checkout-summary')
  const totalEl = document.getElementById('checkout-total')
  summary.innerHTML = ''
  let total = 0
  cart.forEach(item => {
    total += item.price * item.quantity
    summary.innerHTML += `
      <div class="flex justify-between">
        <span>${item.name} x${item.quantity}</span>
        <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
      </div>
    `
  })
  totalEl.textContent = `Rp ${total.toLocaleString()}`
  document.getElementById('cart-modal').classList.add('hidden')
  document.getElementById('checkout-modal').classList.remove('hidden')
})

// Close Checkout
document.getElementById('close-checkout').addEventListener('click', () => {
  document.getElementById('checkout-modal').classList.add('hidden')
})

// --- Confirm Order ---
document.getElementById('confirm-order').addEventListener('click', () => {
  const name = document.getElementById('customer-name').value
  const email = document.getElementById('customer-email').value
  const phone = document.getElementById('customer-phone').value
  const address = document.getElementById('customer-address').value

  if (!name || !email || !phone || !address) {
    alert('Mohon lengkapi semua data pengiriman!')
    return
  }

  cart.length = 0
  updateCart()

  document.getElementById('checkout-modal').classList.add('hidden')
  document.getElementById('success-modal').classList.remove('hidden')
})

// Close Success Modal
document.getElementById('success-close').addEventListener('click', () => {
  document.getElementById('success-modal').classList.add('hidden')
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// --- Hero CTA scroll ---
document.getElementById('hero-cta').addEventListener('click', () => {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' })
})

loadProducts()