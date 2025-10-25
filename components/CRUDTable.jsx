"use client";
import { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function CRUDTable({ col, columns }){
  const [rows,setRows] = useState([]);
  const [form,setForm] = useState({});
  const [editing, setEditing] = useState(null);

  useEffect(()=>{
    const unsub = onSnapshot(collection(db, col), snap => {
      setRows(snap.docs.map(d=>({ id:d.id, ...d.data() })));
    });
    return ()=>unsub();
  },[col]);

  const onSave = async (e)=>{
    e.preventDefault();
    if(editing){
      await updateDoc(doc(db,col,editing), form);
      setEditing(null);
    }else{
      await addDoc(collection(db,col), { ...form, createdAt: serverTimestamp() });
    }
    setForm({});
  };

  const onEdit = (r)=>{ setEditing(r.id); const copy = {}; columns.forEach(c=> copy[c.key] = r[c.key] || ""); setForm(copy); };
  const onDelete = async(id)=>{ if(confirm("Hapus data?")) await deleteDoc(doc(db,col,id)); };

  return (
    <div className="glass card">
      <form onSubmit={onSave} className="grid" style={{gap:12}}>
        <div className="grid grid-2">
          {columns.map(c=>(
            <div key={c.key}>
              <div className="small" style={{marginBottom:6}}>{c.label}</div>
              <input className="input" value={form[c.key]||""} onChange={e=>setForm({...form,[c.key]:e.target.value})} />
            </div>
          ))}
        </div>
        <button className="btn" type="submit">{editing ? "Update" : "Tambah"}</button>
      </form>

      <div style={{marginTop:16}} className="grid" >
        {rows.map(r=>(
          <div key={r.id} className="glass card" style={{display:"grid", gap:8}}>
            <div style={{fontWeight:700}}>{r[columns[0].key]||"(tanpa judul)"}</div>
            <div className="small">{columns.slice(1).map(c => `${c.label}: ${r[c.key]||"-"}`).join(" • ")}</div>
            <div style={{display:"flex", gap:8}}>
              <button className="btn" onClick={()=>onEdit(r)} type="button">Edit</button>
              <button className="btn" onClick={()=>onDelete(r.id)} type="button">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
