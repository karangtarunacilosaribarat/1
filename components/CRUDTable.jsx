'use client'
import { useEffect, useState } from 'react'
import GlassCard from './GlassCard'
import { db } from '@/lib/firebase'
import { collection, addDoc, onSnapshot, serverTimestamp, doc, deleteDoc } from 'firebase/firestore'

export default function CRUDTable({ col, columns }){
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})

  useEffect(() => {
    const unsub = onSnapshot(collection(db, col), (snap) => {
      const arr = []
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }))
      setRows(arr)
    })
    return () => unsub()
  }, [col])

  const onAdd = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, col), { ...form, createdAt: serverTimestamp() })
    setForm({})
  }

  const onDelete = async (id) => { await deleteDoc(doc(db, col, id)) }

  return (
    <GlassCard>
      <form onSubmit={onAdd} className="grid md:grid-cols-3 gap-3 mb-4">
        {columns.map(c => (
          <input key={c.key} placeholder={c.label} value={form[c.key]||''}
            onChange={e=>setForm({...form,[c.key]:e.target.value})}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-white/20" />
        ))}
        <button className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-4 py-2">Tambah</button>
      </form>
      <div className="space-y-2">
        {rows.map(r => (
          <div key={r.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex-1 text-sm">
              {columns.map(c => (
                <span key={c.key} className="mr-4"><span className="text-muted">{c.label}:</span> {String(r[c.key]||'')}</span>
              ))}
            </div>
            <button onClick={()=>onDelete(r.id)} className="text-red-300/90 hover:text-red-200 text-sm">Hapus</button>
          </div>
        ))}
        {rows.length===0 && <div className="text-muted text-sm">Belum ada data.</div>}
      </div>
    </GlassCard>
  )
}
