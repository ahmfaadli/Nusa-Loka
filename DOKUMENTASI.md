# Nusa Loka Coffee - E-Commerce Website

Website e-commerce modern untuk brand kopi premium "Nusa Loka Coffee" dengan tema minimalis dan desain cup kopi modern.

## Fitur Utama

### 1. **Halaman Home**
- Hero section dengan gambar cup Nusa Loka
- Tagline: "Ngopi Asik, Rasa Autentik"
- Call-to-action buttons untuk melihat produk
- Desain minimalis dan responsif

### 2. **Katalog Produk**
- Grid layout responsif (1 kolom mobile, 2-3 kolom desktop)
- Card produk dengan:
  - Gambar produk berkualitas
  - Nama produk
  - Deskripsi singkat
  - Harga dalam Rupiah
  - Badge kategori (Arabica, Robusta, Blended)
  - Tombol "Beli" dan "Detail"
- 6 produk kopi pilihan dari berbagai daerah Indonesia

### 3. **Sistem Keranjang Belanja**
- Tambah produk ke keranjang langsung dari card
- Keranjang disimpan di localStorage
- Modal keranjang menampilkan:
  - Daftar produk dengan gambar dan harga
  - Kontrol jumlah (tambah/kurang/hapus)
  - Total harga otomatis terhitung
  - Tombol checkout dan lanjut belanja

### 4. **Detail Produk**
- Modal dengan informasi lengkap produk
- Gambar produk lebih besar
- Deskripsi detail
- Harga dan kategori
- Input jumlah sebelum tambah ke keranjang

### 5. **Proses Checkout**
- Form pengisian data pelanggan:
  - Nama lengkap
  - Email
  - Nomor HP (validasi format Indonesia)
  - Alamat lengkap
- Ringkasan pesanan otomatis
- Tombol konfirmasi pesanan

### 6. **Manajemen Pesanan**
- Data pesanan disimpan di Supabase
- Informasi order tersimpan dengan:
  - Data pelanggan
  - Total harga
  - Status pesanan
  - Detail item pesanan
- Validasi form sebelum submit

### 7. **UI/UX Modern**
- Palet warna brand:
  - Coklat kopi: #6b3e26 (primary)
  - Coklat medium: #8b5a2b
  - Cream: #f5e6d3 (background utama)
  - Hitam: #1a1a1a (aksen)
- Font modern: Playfair Display + Inter
- Animasi smooth dan transisi
- Responsive design (mobile-first)
- Loading states dan notifikasi user

### 8. **Navbar & Footer**
- Navbar sticky dengan:
  - Logo brand
  - Menu navigasi (Home, Produk)
  - Cart icon dengan item counter
- Responsif dan mobile-friendly

## Teknologi Stack

### Frontend
- **Vite** - Build tool modern
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6** - Vanilla JS (tanpa framework)
- **Responsive Design** - Mobile-first approach

### Backend & Database
- **Supabase** - PostgreSQL + API
- **Authentication** - Public access (tanpa login)
- **Real-time Sync** - Supabase SDK

### Struktur Proyek

```
project/
├── src/
│   ├── main.js              # Aplikasi utama
│   ├── supabase.js          # Konfigurasi Supabase
│   ├── utils.js             # Utility functions
│   ├── modal.js             # Modal handlers
│   └── style.css            # Tailwind styles
├── public/
│   └── images/
│       └── Panas_bg.png     # Logo cup Nusa Loka
├── index.html               # HTML utama
├── vite.config.js          # Konfigurasi Vite
├── tailwind.config.js      # Konfigurasi Tailwind
├── postcss.config.js       # Konfigurasi PostCSS
└── package.json            # Dependencies
```

## Database Schema

### Tabel: products
- `id` (UUID) - Primary key
- `name` (text) - Nama produk
- `description` (text) - Deskripsi produk
- `price` (integer) - Harga dalam Rupiah
- `image_url` (text) - URL gambar produk
- `category` (text) - Kategori (Arabica, Robusta, Blended)
- `created_at` (timestamp) - Waktu pembuatan

### Tabel: orders
- `id` (UUID) - Primary key
- `customer_name` (text) - Nama pelanggan
- `customer_email` (text) - Email pelanggan
- `customer_phone` (text) - Nomor HP
- `customer_address` (text) - Alamat pengiriman
- `total_price` (integer) - Total harga pesanan
- `status` (text) - Status pesanan (pending, confirmed, dll)
- `created_at` (timestamp) - Waktu pemesanan

### Tabel: order_items
- `id` (UUID) - Primary key
- `order_id` (UUID) - Foreign key ke orders
- `product_id` (UUID) - Foreign key ke products
- `quantity` (integer) - Jumlah item
- `price` (integer) - Harga saat pemesanan
- `created_at` (timestamp) - Waktu pembuatan

## Produk Tersedia

1. **Nusa Loka Premium Arabica** - Rp 89.000
   - Dari Tanah Toraja, Sulawesi Selatan
   - Cita rasa kaya dan kompleks

2. **Nusa Loka Robusta Sumatra** - Rp 65.000
   - Dari Sumatera Utara
   - Body kuat, aroma earthy

3. **Nusa Loka Java Heritage** - Rp 75.000
   - Dari Jawa Timur
   - Smooth dan balanced

4. **Nusa Loka Papua Excellence** - Rp 95.000
   - Dari Papua
   - Flavor brighter dan lebih asam

5. **Nusa Loka Espresso Blend** - Rp 80.000
   - Didesain untuk espresso
   - Body dense dan crema sempurna

6. **Nusa Loka Specialty Aceh** - Rp 110.000
   - Dari Aceh
   - Fermentasi natural, rasa fruity dan kompleks

## Fitur JavaScript

### Main Functions

#### loadProducts()
Memuat produk dari Supabase dan menampilkannya dalam grid layout.

```javascript
const { data, error } = await supabase
  .from('products')
  .select('*')
  .order('created_at', { ascending: false })
```

#### addToCart(product, quantity)
Menambahkan produk ke keranjang dengan validasi duplikat.

```javascript
const existingItem = cart.find(item => item.id === product.id)
if (existingItem) {
  existingItem.quantity += quantity
} else {
  cart.push({ ...product, quantity })
}
```

#### submitOrder()
Membuat pesanan dan menyimpan ke database.

```javascript
const { data: order } = await supabase
  .from('orders')
  .insert({
    customer_name, customer_email, customer_phone,
    customer_address, total_price, status: 'pending'
  })
  .select()
```

### Event Listeners

- **Cart Button** - Buka/tutup modal keranjang
- **Add to Cart** - Tambah produk ke keranjang
- **Detail Button** - Buka modal detail produk
- **Checkout** - Proses checkout pesanan
- **Quantity Controls** - Ubah jumlah item di keranjang
- **Remove Item** - Hapus item dari keranjang

## Styling & Warna

### Palet Warna
- **Primary Brown** - #6b3e26 (navbar, buttons)
- **Secondary Brown** - #8b5a2b (hover states)
- **Cream** - #f5e6d3 (background, accents)
- **Light Cream** - #e8d5c4 (subtle backgrounds)
- **Black** - #1a1a1a (text, borders)

### Responsive Breakpoints
- Mobile: < 768px (1 kolom)
- Tablet: 768px - 1024px (2 kolom)
- Desktop: > 1024px (3 kolom)

## Cara Menjalankan

### Development
```bash
npm install
npm run dev
```
Akses di `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## Validasi Form

### Email
- Format email standar dengan @

### Nomor HP
- Harus dimulai dengan +62, 62, atau 0
- Panjang 9-12 digit setelah prefix

### Semua Field
- Nama, email, nomor HP, dan alamat wajib diisi

## Local Storage

Keranjang disimpan di browser dengan key `nusa-loka-cart` dalam format JSON array.

```javascript
{
  id: "uuid",
  name: "Nama Produk",
  price: 89000,
  quantity: 2,
  ...
}
```

## Performa & Optimasi

- Lazy loading gambar dengan fallback placeholder
- Caching produk di browser
- Minimal HTTP requests
- Build output ~10KB (gzip)
- CSS utility-first dengan Tailwind

## Future Enhancements

- [ ] User authentication & login
- [ ] Order tracking system
- [ ] Payment gateway integration (Stripe/Midtrans)
- [ ] Admin dashboard
- [ ] Product reviews & ratings
- [ ] Email notifications
- [ ] Search & filter produk
- [ ] Wishlist feature
- [ ] Multiple payment methods
- [ ] Inventory management

## Support & Contact

Untuk pertanyaan atau dukungan, hubungi team Nusa Loka Coffee.

---

**Dibuat dengan ❤️ untuk pecinta kopi autentik Indonesia**
