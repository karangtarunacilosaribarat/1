# KARTEJI Portal — Black Glass (Next.js 14)

Minimal portal dengan Next.js 14 + Firebase (Auth, Firestore) + Cloudinary (unsigned upload).
Tema: full black glass (hitam + abu transparan, tanpa neon).

## Jalankan
```bash
npm install
cp .env.local.example .env.local  # isi semua variabel
npm run dev
```

## Deploy Vercel
- Tambahkan semua env yang sama dari `.env.local` ke Vercel Project → Settings → Environment Variables
- Jangan isi API Secret Cloudinary di client (gunakan unsigned preset).

## Catatan
- User **pertama** yang register otomatis menjadi `super_admin`.
- Super admin bisa mengganti background portal di `/dashboard`.
