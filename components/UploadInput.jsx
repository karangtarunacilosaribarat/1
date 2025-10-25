'use client'
import { useState } from 'react'
import GlassCard from './GlassCard'
export default function UploadInput({ label='Upload Gambar', onUploaded }){
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')
  const onChange = async (e) => {
    const file = e.target.files?.[0]; if(!file) return
    setLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, { method:'POST', body: form })
      const data = await res.json(); setUrl(data.secure_url); onUploaded?.(data.secure_url, data)
    } finally { setLoading(false) }
  }
  return (
    <GlassCard>
      <label className="block text-sm mb-2">{label}</label>
      <input type="file" onChange={onChange}
        className="block w-full text-sm file:mr-4 file:rounded-xl file:border file:border-white/10 file:bg-white/10 file:px-3 file:py-2 file:text-white hover:file:bg-white/15" />
      {loading && <div className="text-muted mt-2 text-sm">Mengunggah...</div>}
      {url && <a href={url} target="_blank" className="text-sm mt-2 inline-block underline">{url}</a>}
    </GlassCard>
  )
}
