import { supabase } from './supabase.js'

// =======================
// FORMAT RUPIAH
// =======================
function formatRupiah(angka) {
  return angka.toLocaleString('id-ID')
}

// =======================
// LOAD PRODUK
// =======================
async function loadProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    alert('Gagal load produk')
    return
  }

  const list = document.getElementById('product-list')

  list.innerHTML = data.map(p => `
    <div class="border border-gray-300 p-4 rounded shadow-md flex flex-col">
      <img src="${p.image_url || 'https://via.placeholder.com/150'}" alt="${p.name}" class="w-full h-40 object-cover rounded mb-2">
      <b class="text-lg">${p.name}</b>
      <span class="text-coffee-brown font-semibold">Rp ${formatRupiah(p.price)}</span>
      <span class="text-sm text-gray-500">${p.category}</span>
      <p class="text-gray-700 mt-1 flex-1">${p.description}</p>
      <div class="mt-2 flex space-x-2">
        <button onclick="deleteProduct('${p.id}')" class="flex-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
          Hapus
      </div>
    </div>
  `).join('')
}

// =======================
// TAMBAH PRODUK
// =======================
document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const priceInput = document.getElementById('price').value.replace(/\./g,'')
  const price = parseInt(priceInput)
  const image_url = document.getElementById('image_url').value
  const category = document.getElementById('category').value
  const description = document.getElementById('description').value

  const product = { name, price, image_url, category, description }

  const { error } = await supabase
    .from('products')
    .insert([product])

  if (error) {
    alert('Gagal tambah produk')
  } else {
    alert('Produk berhasil ditambahkan')
    document.getElementById('product-form').reset()
    loadProducts()
  }
})

// =======================
// DELETE PRODUK
// =======================
window.deleteProduct = async (id) => {
  const confirmDelete = confirm('Yakin hapus produk?')
  if (!confirmDelete) return

  await supabase
    .from('products')
    .delete()
    .eq('id', id)

  loadProducts()
}

// =======================
// TAMBAH PESANAN
// =======================
window.addOrder = async (productId) => {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  if (error) {
    alert('Gagal mengambil produk')
    return
  }

  const order = {
    product_id: product.id,
    product_name: product.name,
    price: product.price,
    quantity: 1,
    total: product.price
  }

  const { error: orderError } = await supabase
    .from('orders')
    .insert([order])

  if (orderError) {
    alert('Gagal tambah pesanan')
  } else {
    alert(`Pesanan "${product.name}" berhasil ditambahkan!`)
  }
}

// =======================
// FORMAT HARGA INPUT OTOMATIS
// =======================
const priceInput = document.getElementById('price')
priceInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g,'')
  e.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
})

// =======================
// LOAD PRODUK AWAL
// =======================
loadProducts()