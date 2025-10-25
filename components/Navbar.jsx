'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
export default function Navbar(){
  const path = usePathname()
  const Item = ({href, children}) => (
    <Link href={href} className={clsx(
      "px-3 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10",
      path===href && "bg-white/10 border-white/10"
    )}>{children}</Link>
  )
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/" className="font-semibold tracking-wide">KARTEJI</Link>
        <nav className="ml-auto flex gap-2 text-sm">
          <Item href="/berita">Berita</Item>
          <Item href="/kegiatan">Kegiatan</Item>
          <Item href="/umkm">UMKM</Item>
          <Item href="/galeri">Galeri</Item>
          <Item href="/login">Login</Item>
        </nav>
      </div>
    </header>
  )
}
