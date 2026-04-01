import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://alllfdkdxdlasvkaqgwe.supabase.co'

// ⬇️ HARUS dari project yang sama!
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsbGxmZGtkeGRsYXN2a2FxZ3dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTQ2NjAsImV4cCI6MjA5MDA3MDY2MH0.jNfX9AqyzzEBn74PwnmCS2dm2OV8LazYqnh5k_q-4Yc'

export const supabase = createClient(supabaseUrl, supabaseKey)