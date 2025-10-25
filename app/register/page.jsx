'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc, serverTimestamp, getDocs, collection } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import GlassCard from '@/components/GlassCard'

export default function RegisterPage(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState('')
  const [loading,setLoading]=useState(false)
  const router=useRouter()

  const onSubmit=async(e)=>{
    e.preventDefault(); setErr(''); setLoading(true)
    try {
      const usersSnap = await getDocs(collection(db, 'users'))
      const isFirstUser = usersSnap.empty
      const cred=await createUserWithEmailAndPassword(auth,email,password)
      await updateProfile(cred.user,{displayName:name})
      const role = isFirstUser ? 'super_admin' : 'anggota'
      await setDoc(doc(db,'users',cred.user.uid),{name,email,role,createdAt:serverTimestamp()})
      router.replace('/dashboard')
    } catch(e){ setErr(e.message) } finally { setLoading(false) }
  }

  return (
    <GlassCard className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Daftar Akun</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input placeholder="Nama" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-300 text-sm">{err}</div>}
        <button disabled={loading} className="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-4 py-2">{loading? 'Memproses...' : 'Daftar'}</button>
      </form>
    </GlassCard>
  )
}
