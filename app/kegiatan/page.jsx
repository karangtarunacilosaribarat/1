'use client'
export const dynamic = 'force-dynamic'
import CRUDTable from '@/components/CRUDTable'
export default function Page() {{
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Kegiatan</h2>
      <CRUDTable col="kegiatan" columns={[{"key": "judul", "label": "Judul"}, {"key": "waktu", "label": "Waktu"}, {"key": "lokasi", "label": "Lokasi"}]} />
    </section>
  )
}
