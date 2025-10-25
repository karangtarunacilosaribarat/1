'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import GlassCard from '@/components/GlassCard'
import Link from 'next/link'

export default function Page(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState('')
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault(); setErr(''); setLoading(true)
    try { await signInWithEmailAndPassword(auth, email, password); router.replace('/dashboard') }
    catch(e){ setErr(e.message) } finally { setLoading(false) }
  }
  return (
    <GlassCard className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Masuk</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input placeholder="Email" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-300 text-sm">{err}</div>}
        <button disabled={loading} className="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-4 py-2">{loading? 'Memproses...' : 'Masuk'}</button>
      </form>
      <div className="text-sm text-muted mt-3">Belum punya akun? <Link href="/register" className="underline">Daftar</Link></div>
    </GlassCard>
  )
}
