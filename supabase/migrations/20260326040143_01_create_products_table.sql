/*
  # Create Products Table (FIXED)

  1. New Tables
    - products

  2. Security
    - Enable RLS
    - Allow SELECT, INSERT, UPDATE, DELETE
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price integer NOT NULL,
  image_url text,
  category text DEFAULT 'Coffee',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- SELECT (user bisa lihat)
CREATE POLICY "Public can view products"
ON products FOR SELECT
TO public
USING (true);

-- INSERT (admin bisa tambah)
CREATE POLICY "Public can insert products"
ON products FOR INSERT
TO public
WITH CHECK (true);

-- UPDATE (opsional edit)
CREATE POLICY "Public can update products"
ON products FOR UPDATE
TO public
USING (true);

-- DELETE (opsional hapus)
CREATE POLICY "Public can delete products"
ON products FOR DELETE
TO public
USING (true);