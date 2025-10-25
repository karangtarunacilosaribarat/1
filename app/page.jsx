import GlassCard from "../components/GlassCard";

export const dynamic = "force-dynamic";

export default function Home(){
  return (
    <section className="grid" style={{gap:16}}>
      <GlassCard title="Selamat datang" footer="UI black glass minimalis, tanpa neon.">
        <p>Portal KARTEJI menggunakan Next.js 14 + Firebase + Cloudinary.</p>
        <p><a href="/register">Daftar akun</a> atau <a href="/login">Masuk</a> untuk melanjutkan.</p>
      </GlassCard>
    </section>
  );
}
