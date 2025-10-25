'use client'
export const dynamic = 'force-dynamic'
import { useAuthGuard } from '@/lib/authGuard'
import GlassCard from '@/components/GlassCard'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
export default function Page(){
  const { ready, user, role } = useAuthGuard()
  if(!ready) return <div className="glass p-6">Memuat...</div>
  return (
    <section className="space-y-4">
      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/60">Masuk sebagai</div>
            <div className="font-semibold">{user?.displayName || user?.email}</div>
            <div className="text-xs text-white/50">Role: {role}</div>
          </div>
          <button onClick={()=>signOut(auth)} className="text-sm underline">Keluar</button>
        </div>
      </GlassCard>
      <div className="grid md:grid-cols-3 gap-3">
        <Link href="/dashboard/berita" className="glass p-6">CRUD Berita</Link>
        <Link href="/dashboard/kegiatan" className="glass p-6">CRUD Kegiatan</Link>
        <Link href="/dashboard/umkm" className="glass p-6">CRUD UMKM</Link>
        <Link href="/dashboard/galeri" className="glass p-6">CRUD Galeri</Link>
        <Link href="/dashboard/kas" className="glass p-6">Kas</Link>
        <Link href="/dashboard/settings" className="glass p-6">Settings</Link>
      </div>
    </section>
  )
}
