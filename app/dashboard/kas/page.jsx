"use client";
import CRUDTable from "../../../components/CRUDTable";
import UploadInput from "../../../components/UploadInput";

export const dynamic = "force-dynamic";

export default function Page(){
  return (
    <section className="grid" style={{gap:16}}>
      <h2 style={{fontSize:"1.4rem", fontWeight:800}}>CRUD Kas</h2>
      <CRUDTable col="kas" columns={[{"key": "tanggal", "label": "Tanggal"}, {"key": "jenis", "label": "Jenis (Masuk/Keluar)"}, {"key": "nominal", "label": "Nominal"}]} />
      null
    </section>
  );
}
