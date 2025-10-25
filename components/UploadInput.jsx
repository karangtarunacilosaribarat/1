"use client";
import { useRef, useState } from "react";

export default function UploadInput({ onUploaded, folder = "uploads" }){
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [url,setUrl] = useState("");

  const onChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try{
      const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", preset);
      form.append("folder", folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/upload`, { method:"POST", body:form });
      const data = await res.json();
      setUrl(data.secure_url);
      onUploaded && onUploaded(data.secure_url, data);
    }catch(err){
      console.error(err);
      alert("Upload gagal");
    }finally{
      setUploading(false);
    }
  };

  return (
    <div className="glass card" style={{display:"grid", gap:12}}>
      <div className="small">Upload ke Cloudinary (unsigned)</div>
      <input className="input" type="file" ref={fileRef} onChange={onChange} accept="image/*" />
      <button className="btn" type="button" onClick={()=>fileRef.current?.click()} disabled={uploading}>
        {uploading ? "Uploading..." : "Pilih File"}
      </button>
      {url && <div className="small">URL: <a href={url} target="_blank" rel="noreferrer">{url}</a></div>}
    </div>
  );
}
