'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import GlassCard from '@/components/GlassCard'
export default function Page(){
  const [email,setEmail]=useState('')
  const [msg,setMsg]=useState('')
  const [err,setErr]=useState('')
  const onSubmit=async(e)=>{ e.preventDefault(); setMsg(''); setErr(''); try{ await sendPasswordResetEmail(auth,email); setMsg('Cek email untuk tautan reset.') }catch(e){ setErr(e.message) } }
  return (
    <GlassCard className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input placeholder="Email" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-4 py-2">Kirim</button>
      </form>
      {msg && <div className="text-green-300 mt-3 text-sm">{msg}</div>}
      {err && <div className="text-red-300 mt-3 text-sm">{err}</div>}
    </GlassCard>
  )
}
