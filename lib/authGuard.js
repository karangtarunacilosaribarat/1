'use client'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase'

export function useAuthGuard(requireRole = null) {
  const router = useRouter()
  const [state, setState] = useState({ ready:false, user:null, role:null })
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if(!user){ setState({ready:true,user:null,role:null}); router.replace('/login'); return }
      let role='anggota'
      try { const snap=await getDoc(doc(db,'users',user.uid)); if(snap.exists()) role=snap.data().role||role } catch(e){}
      if(requireRole && role!==requireRole){ router.replace('/dashboard') }
      setState({ready:true,user,role})
    })
    return () => unsub()
  }, [requireRole])
  return state
}
