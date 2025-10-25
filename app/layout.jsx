import "./../styles/globals.css";

export const metadata = {
  title: "KARTEJI Portal — Black Glass",
  description: "Portal Karang Taruna — Next.js + Firebase + Cloudinary",
};
export const dynamic = "force-dynamic";

export default function RootLayout({ children }){
  return (
    <html lang="id">
      <body>
        <header className="header">
          <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontWeight:800}}>KARTEJI • Black Glass</div>
            <nav className="small" style={{display:"flex",gap:14}}>
              <a href="/">Home</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/login">Login</a>
            </nav>
          </div>
        </header>
        <main className="container" style={{paddingTop:24}}>{children}</main>
        <footer className="container small" style={{opacity:.6, paddingBottom:24}}>© {new Date().getFullYear()} KARTEJI</footer>
      </body>
    </html>
  );
}
