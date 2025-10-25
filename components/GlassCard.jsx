"use client";
export default function GlassCard({ title, children, footer }) {
  return (
    <div className="glass card">
      {title && <div style={{marginBottom:12, fontWeight:700, fontSize:"1.1rem"}}>{title}</div>}
      <div>{children}</div>
      {footer && <div style={{marginTop:12}} className="small">{footer}</div>}
    </div>
  );
}
