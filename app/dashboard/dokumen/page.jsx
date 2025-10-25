"use client";
import CRUDTable from "../../../components/CRUDTable";
import UploadInput from "../../../components/UploadInput";

export const dynamic = "force-dynamic";

export default function Page(){
  return (
    <section className="grid" style={{gap:16}}>
      <h2 style={{fontSize:"1.4rem", fontWeight:800}}>CRUD Dokumen</h2>
      <CRUDTable col="dokumen" columns={[{"key": "nama", "label": "Nama"}, {"key": "jenis", "label": "Jenis"}, {"key": "file_url", "label": "URL File"}]} />
      <UploadInput folder="dokumen" />
    </section>
  );
}
