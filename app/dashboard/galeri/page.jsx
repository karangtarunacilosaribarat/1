"use client";
import CRUDTable from "../../../components/CRUDTable";
import UploadInput from "../../../components/UploadInput";

export const dynamic = "force-dynamic";

export default function Page(){
  return (
    <section className="grid" style={{gap:16}}>
      <h2 style={{fontSize:"1.4rem", fontWeight:800}}>CRUD Galeri</h2>
      <CRUDTable col="galeri" columns={[{"key": "judul", "label": "Judul"}, {"key": "foto_url", "label": "Foto URL"}, {"key": "tanggal", "label": "Tanggal"}]} />
      <UploadInput folder="galeri" />
    </section>
  );
}
