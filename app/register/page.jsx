"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import GlassCard from "../../components/GlassCard";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function RegisterPage(){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault(); setErr(""); setLoading(true);
    try{
      const usersSnap = await getDocs(collection(db,"users"));
      const isFirst = usersSnap.empty;

      const cred = await createUserWithEmailAndPassword(auth,email,password);
      await updateProfile(cred.user,{ displayName:name });
      const role = isFirst ? "super_admin" : "anggota";
      await setDoc(doc(db,"users",cred.user.uid),{
        name, email, role, createdAt: serverTimestamp()
      });
      router.replace("/dashboard");
    }catch(error){
      setErr(error.message);
    }finally{ setLoading(false); }
  };

  return (
    <div className="grid" style={{gap:16, maxWidth:520, margin:"0 auto"}}>
      <GlassCard title="Daftar Akun">
        <form className="grid" style={{gap:12}} onSubmit={onSubmit}>
          <input className="input" placeholder="Nama" value={name} onChange={e=>setName(e.target.value)} />
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <div className="small" style={{color:"#fba4a4"}}>{err}</div>}
          <button className="btn" type="submit" disabled={loading}>{loading ? "Memproses..." : "Daftar"}</button>
          <div className="small">Sudah punya akun? <a href="/login">Masuk</a></div>
        </form>
      </GlassCard>
    </div>
  );
}
