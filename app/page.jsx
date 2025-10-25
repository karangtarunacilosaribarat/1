import GlassCard from '@/components/GlassCard'
export const dynamic = 'force-dynamic'
export default function Page(){
  return (
    <section className="space-y-6">
      <div className="glass p-10">
        <h1 className="text-4xl font-semibold tracking-tight">KARTEJI Portal</h1>
        <p className="text-white/70 mt-2 max-w-2xl">UI full black glass minimalis (tanpa neon). Konten dinamis dari Firestore, unggah gambar via Cloudinary.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <GlassCard><h3 className="font-semibold">Berita</h3><p className="text-muted text-sm">/berita</p></GlassCard>
        <GlassCard><h3 className="font-semibold">Kegiatan</h3><p className="text-muted text-sm">/kegiatan</p></GlassCard>
        <GlassCard><h3 className="font-semibold">UMKM</h3><p className="text-muted text-sm">/umkm</p></GlassCard>
        <GlassCard><h3 className="font-semibold">Galeri</h3><p className="text-muted text-sm">/galeri</p></GlassCard>
      </div>
    </section>
  )
}
