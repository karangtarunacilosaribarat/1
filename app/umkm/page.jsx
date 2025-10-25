'use client'
export const dynamic = 'force-dynamic'
import CRUDTable from '@/components/CRUDTable'
export default function Page() {{
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">UMKM</h2>
      <CRUDTable col="umkm" columns={[{"key": "nama", "label": "Nama"}, {"key": "kategori", "label": "Kategori"}, {"key": "whatsapp", "label": "WhatsApp"}]} />
    </section>
  )
}
