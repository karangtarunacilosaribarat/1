'use client'
export const dynamic = 'force-dynamic'
import CRUDTable from '@/components/CRUDTable'
import UploadInput from '@/components/UploadInput'
import { useAuthGuard } from '@/lib/authGuard'

export default function Page(){
  const {{ ready }} = useAuthGuard()
  if(!ready) return <div className="glass p-6">Memuat...</div>
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">CRUD Galeri</h2>
      <CRUDTable col="galeri" columns={[{"key": "judul", "label": "Judul"}, {"key": "foto_url", "label": "Foto URL"}, {"key": "tanggal", "label": "Tanggal"}]} />
      <UploadInput label="Upload Gambar" />
    </section>
  )
}
