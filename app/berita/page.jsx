'use client'
export const dynamic = 'force-dynamic'
import CRUDTable from '@/components/CRUDTable'
export default function Page() {{
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Berita</h2>
      <CRUDTable col="berita" columns={[{"key": "judul", "label": "Judul"}, {"key": "isi", "label": "Isi"}, {"key": "penulis", "label": "Penulis"}]} />
    </section>
  )
}
