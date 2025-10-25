'use client'
export const dynamic = 'force-dynamic'
import CRUDTable from '@/components/CRUDTable'
export default function Page() {{
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Galeri</h2>
      <CRUDTable col="galeri" columns={[{"key": "judul", "label": "Judul"}, {"key": "foto_url", "label": "Foto URL"}, {"key": "tanggal", "label": "Tanggal"}]} />
    </section>
  )
}
