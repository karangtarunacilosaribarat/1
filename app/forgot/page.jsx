"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";
import GlassCard from "../../components/GlassCard";

export const dynamic = "force-dynamic";

export default function ForgotPage(){
  const [email,setEmail] = useState("");
  const [msg,setMsg] = useState("");
  const [err,setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); setMsg(""); setErr("");
    try{
      await sendPasswordResetEmail(auth, email);
      setMsg("Cek email untuk link reset password.");
    }catch(error){
      setErr(error.message);
    }
  };

  return (
    <div className="grid" style={{gap:16, maxWidth:520, margin:"0 auto"}}>
      <GlassCard title="Lupa Password">
        <form className="grid" style={{gap:12}} onSubmit={onSubmit}>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          {msg && <div className="small" style={{color:"#b6f3c5"}}>{msg}</div>}
          {err && <div className="small" style={{color:"#fba4a4"}}>{err}</div>}
          <button className="btn" type="submit">Kirim Link Reset</button>
        </form>
      </GlassCard>
    </div>
  );
}
