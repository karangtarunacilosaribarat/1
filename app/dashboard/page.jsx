"use client";
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import GlassCard from "../../components/GlassCard";
import { doc, getDoc, setDoc } from "firebase/firestore";
import UploadInput from "../../components/UploadInput";

export const dynamic = "force-dynamic";

export default function Dashboard(){
  const [user,setUser] = useState(null);
  const [role,setRole] = useState(null);
  const [bg,setBg] = useState("");

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async(u)=>{
      setUser(u);
      if(!u) return;
      const snap = await getDoc(doc(db,"users",u.uid));
      setRole(snap.exists()? (snap.data().role||"anggota") : "anggota");

      const s = await getDoc(doc(db,"settings","general"));
      if(s.exists()) setBg(s.data().bgUrl || "");
    });
    return ()=>unsub();
  },[]);

  const saveBg = async()=>{
    await setDoc(doc(db,"settings","general"), { bgUrl:bg }, { merge:true });
    alert("Background disimpan.");
  };

  const logout = async()=>{ await signOut(auth); window.location.href="/login"; };

  return (
    <div className="grid" style={{gap:16}}>
      <GlassCard title="Dashboard">
        <div className="small">Masuk sebagai: <b>{user?.email || "-"}</b> • Role: <b>{role||"-"}</b></div>
        <div style={{marginTop:12, display:"flex", gap:8}}>
          <a className="btn" href="/dashboard/berita">Berita</a>
          <a className="btn" href="/dashboard/galeri">Galeri</a>
          <a className="btn" href="/dashboard/kegiatan">Kegiatan</a>
          <a className="btn" href="/dashboard/dokumen">Dokumen</a>
          <a className="btn" href="/dashboard/kas">Kas</a>
          <button className="btn" onClick={logout}>Keluar</button>
        </div>
      </GlassCard>

      {role === "super_admin" && (
        <GlassCard title="Pengaturan Portal (Super Admin)">
          <div className="grid" style={{gap:12}}>
            <div>
              <div className="small" style={{marginBottom:6}}>Background URL</div>
              <input className="input" value={bg} onChange={e=>setBg(e.target.value)} placeholder="https://..." />
            </div>
            <UploadInput onUploaded={(u)=>setBg(u)} folder="portal-bg" />
            <button className="btn" onClick={saveBg}>Simpan Background</button>
            {bg && <div className="small">Preview: <a href={bg} target="_blank" rel="noreferrer">Buka</a></div>}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
