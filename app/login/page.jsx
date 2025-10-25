"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import GlassCard from "../../components/GlassCard";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function LoginPage(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault(); setErr(""); setLoading(true);
    try{
      await signInWithEmailAndPassword(auth,email,password);
      router.replace("/dashboard");
    }catch(error){
      setErr(error.message);
    }finally{ setLoading(false); }
  };

  return (
    <div className="grid" style={{gap:16, maxWidth:520, margin:"0 auto"}}>
      <GlassCard title="Masuk">
        <form className="grid" style={{gap:12}} onSubmit={onSubmit}>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <div className="small" style={{color:"#fba4a4"}}>{err}</div>}
          <button className="btn" type="submit" disabled={loading}>{loading ? "Memproses..." : "Masuk"}</button>
          <div className="small">Belum punya akun? <a href="/register">Daftar</a> • <a href="/forgot">Lupa password</a></div>
        </form>
      </GlassCard>
    </div>
  );
}
