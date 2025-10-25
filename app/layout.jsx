import './globals.css'
import Navbar from '@/components/Navbar'
export const metadata = { title:'KARTEJI Portal — Black Glass', description:'Next.js + Firebase + Cloudinary' }
export default function RootLayout({ children }){
  return (
    <html lang="id">
      <body className="min-h-dvh text-white antialiased">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="max-w-5xl mx-auto px-4 py-12 text-center text-xs text-white/50">© {new Date().getFullYear()} KARTEJI</footer>
      </body>
    </html>
  )
}
