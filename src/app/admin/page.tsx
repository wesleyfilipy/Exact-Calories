"use client";

import { useState, useEffect, useRef } from "react";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const STORAGE_KEY = "exactcalories_admin_config";
const SUPP_KEY = "exactcalories_supplements";

function checkPassword(input: string): boolean {
  const a = ["9", "5", "6", "1", "4", "2", "2", "7"];
  return input.trim() === a.join("");
}

type Supplement = { id: string; name: string; link: string; imageUrl: string | null };

const defaultSupplements: Supplement[] = [
  { id: "supplement-whey", name: "Whey Protein", link: "#", imageUrl: "https://images.unsplash.com/photo-1693996045369-781799bbaea0?w=400&q=80" },
  { id: "supplement-creatine", name: "Creatine", link: "#", imageUrl: "https://images.unsplash.com/photo-1693996045838-980674653385?w=400&q=80" },
  { id: "supplement-preworkout", name: "Pre-Workout", link: "#", imageUrl: "https://images.unsplash.com/photo-1704650311981-419f841421cc?w=400&q=80" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [supplements, setSupplements] = useState<Supplement[]>(defaultSupplements);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "ok") setAuthed(true);
    // Always prefer localStorage (user's saved data) over API defaults
    try { const s = localStorage.getItem(STORAGE_KEY); if (s) setConfig(JSON.parse(s)); } catch {}
    try { const s = localStorage.getItem(SUPP_KEY); if (s) { const p = JSON.parse(s); if (Array.isArray(p)) setSupplements(p); } } catch {}
  }, []);

  function login() {
    if (checkPassword(pwd)) {
      sessionStorage.setItem("admin_auth", "ok");
      setAuthed(true);
    } else {
      setPwdError(true);
      setTimeout(() => setPwdError(false), 2000);
    }
  }

  function updateSupp(id: string, field: keyof Supplement, value: string) {
    setSupplements(list => list.map(s => s.id === id ? { ...s, [field]: value } : s));
  }

  function uploadSuppImage(id: string, file: File) {
    const r = new FileReader();
    r.onload = e => updateSupp(id, "imageUrl", e.target?.result as string);
    r.readAsDataURL(file);
  }

  function uploadSectionImage(field: keyof SiteConfig, file: File) {
    const r = new FileReader();
    r.onload = e => setConfig(c => ({ ...c, [field]: e.target?.result as string }));
    r.readAsDataURL(file);
  }

  function addSupp() {
    setSupplements(s => [...s, { id: `supp-${Date.now()}`, name: "Novo Produto", link: "https://", imageUrl: null }]);
  }

  function deleteSupp(id: string) {
    if (confirm("Apagar este produto?")) setSupplements(s => s.filter(x => x.id !== id));
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); } catch {}
    try { localStorage.setItem(SUPP_KEY, JSON.stringify(supplements)); } catch {}
    window.dispatchEvent(new Event("supplements-updated"));
    fetch("/api/config", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...config, password: pwd }) }).catch(() => {});
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  /* ── LOGIN SCREEN ── */
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#fff0f3,#fff)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ background: "#fff", borderRadius: "1.5rem", boxShadow: "0 8px 40px #f4335520", padding: "2.5rem 2rem", width: "100%", maxWidth: "360px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "1rem", background: "linear-gradient(135deg,#f43f5e,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <span style={{ fontSize: 28 }}>🔐</span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#e11d48", marginBottom: ".5rem" }}>Admin Access</h1>
          <p style={{ color: "#9ca3af", fontSize: ".9rem", marginBottom: "1.5rem" }}>Digite a senha para entrar</p>
          <input
            type="password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="Senha"
            autoFocus
            style={{ width: "100%", border: `2px solid ${pwdError ? "#f87171" : "#fecdd3"}`, borderRadius: "1rem", padding: ".75rem 1rem", fontSize: "1.1rem", outline: "none", marginBottom: ".75rem", textAlign: "center", letterSpacing: "0.2em", boxSizing: "border-box" }}
          />
          {pwdError && <p style={{ color: "#ef4444", fontSize: ".85rem", marginBottom: ".5rem" }}>❌ Senha incorreta</p>}
          <button onClick={login} style={{ width: "100%", background: "linear-gradient(135deg,#f43f5e,#ec4899)", color: "#fff", border: "none", borderRadius: "1rem", padding: "1rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
            Entrar →
          </button>
        </div>
      </div>
    );
  }

  /* ── ADMIN PANEL ── */
  const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: "1.25rem", border: "1px solid #fce7f3", padding: "1.25rem", marginBottom: "1rem" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: ".8rem", fontWeight: 700, color: "#be185d", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: ".4rem" };
  const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #fecdd3", borderRadius: ".75rem", padding: ".65rem .9rem", fontSize: ".95rem", outline: "none", boxSizing: "border-box", marginBottom: ".5rem" };
  const btnStyle: React.CSSProperties = { background: "linear-gradient(135deg,#f43f5e,#ec4899)", color: "#fff", border: "none", borderRadius: ".75rem", padding: ".6rem 1.2rem", fontSize: ".9rem", fontWeight: 700, cursor: "pointer" };

  return (
    <div style={{ minHeight: "100vh", background: "#fff8fa", paddingBottom: "2rem" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #fce7f3", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontWeight: 800, color: "#e11d48", fontSize: "1.1rem" }}>⚙️ Admin Panel</span>
        <button onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }} style={{ background: "none", border: "1px solid #fecdd3", borderRadius: ".6rem", padding: ".4rem .8rem", color: "#e11d48", cursor: "pointer", fontSize: ".85rem" }}>
          Sair
        </button>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>

        {/* ── SECTION 1: Download Links ── */}
        <div style={cardStyle}>
          <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem", color: "#111" }}>📲 Links de Download</h2>

          <label style={labelStyle}>🍎 App Store — link do iPhone</label>
          <input style={inputStyle} value={config.iosUrl} onChange={e => setConfig(c => ({ ...c, iosUrl: e.target.value }))} placeholder="https://apps.apple.com/..." />

          <label style={labelStyle}>🤖 Google Play — link do Android</label>
          <input style={inputStyle} value={config.androidUrl} onChange={e => setConfig(c => ({ ...c, androidUrl: e.target.value }))} placeholder="https://play.google.com/..." />
        </div>

        {/* ── SECTION 2: Supplements ── */}
        <div style={cardStyle}>
          <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem", color: "#111" }}>💊 Suplementos</h2>
          <p style={{ color: "#9ca3af", fontSize: ".85rem", marginBottom: "1rem" }}>Edite o nome, link e foto de cada produto abaixo.</p>

          {supplements.map((s, i) => (
            <div key={s.id} style={{ border: "1.5px solid #fce7f3", borderRadius: "1rem", padding: "1rem", marginBottom: "1rem", background: "#fffbfc" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".75rem" }}>
                <span style={{ fontWeight: 700, color: "#e11d48", fontSize: ".9rem" }}>Produto {i + 1}</span>
                <button onClick={() => deleteSupp(s.id)} style={{ background: "#fee2e2", border: "none", borderRadius: ".5rem", padding: ".3rem .7rem", color: "#ef4444", cursor: "pointer", fontSize: ".8rem", fontWeight: 600 }}>
                  🗑 Apagar
                </button>
              </div>

              {/* Image */}
              {s.imageUrl && (
                <img src={s.imageUrl} alt={s.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: ".75rem", marginBottom: ".5rem" }} />
              )}
              <label style={labelStyle}>🖼 Foto do produto</label>
              <input style={inputStyle} value={s.imageUrl?.startsWith("data:") ? "" : (s.imageUrl ?? "")} onChange={e => updateSupp(s.id, "imageUrl", e.target.value)} placeholder="Cole a URL da foto..." />
              <label style={{ ...btnStyle, display: "inline-block", marginBottom: ".75rem", fontSize: ".8rem", cursor: "pointer" }}>
                📱 Fazer upload da foto
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) uploadSuppImage(s.id, f); }} />
              </label>

              {/* Name */}
              <label style={labelStyle}>📝 Nome do produto</label>
              <input style={inputStyle} value={s.name} onChange={e => updateSupp(s.id, "name", e.target.value)} placeholder="Ex: Whey Protein" />

              {/* Link */}
              <label style={labelStyle}>🔗 Link — onde o visitante é redirecionado ao clicar</label>
              <input style={inputStyle} value={s.link} onChange={e => updateSupp(s.id, "link", e.target.value)} placeholder="https://amazon.com/produto..." />
            </div>
          ))}

          <button onClick={addSupp} style={{ width: "100%", background: "#fff0f3", border: "2px dashed #fda4af", borderRadius: "1rem", padding: ".9rem", color: "#e11d48", fontWeight: 700, cursor: "pointer", fontSize: ".95rem" }}>
            + Adicionar novo produto
          </button>
        </div>

        {/* ── SECTION 3: Site Photos ── */}
        <div style={cardStyle}>
          <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem", color: "#111" }}>🖼 Fotos do Site</h2>

          {([
            { key: "aboutImage" as keyof SiteConfig, label: "Foto — Seção Sobre" },
            { key: "howItWorksImage" as keyof SiteConfig, label: "Foto — Como Funciona" },
            { key: "premiumImage" as keyof SiteConfig, label: "Foto — Premium" },
          ]).map(({ key, label }) => (
            <div key={key} style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>{label}</label>
              {config[key] && <img src={config[key] as string} alt={label} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: ".75rem", marginBottom: ".5rem" }} />}
              <input style={inputStyle} value={(config[key] as string).startsWith("data:") ? "" : (config[key] as string)} onChange={e => setConfig(c => ({ ...c, [key]: e.target.value }))} placeholder="Cole a URL da foto..." />
              <label style={{ ...btnStyle, display: "inline-block", fontSize: ".8rem", cursor: "pointer" }}>
                📱 Fazer upload da foto
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) uploadSectionImage(key, f); }} />
              </label>
            </div>
          ))}
        </div>

        {/* ── SAVE BUTTON ── */}
        <button onClick={save} style={{ width: "100%", background: saved ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#f43f5e,#ec4899)", color: "#fff", border: "none", borderRadius: "1.25rem", padding: "1.1rem", fontSize: "1.1rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px #f4335530" }}>
          {saved ? "✅ Salvo com sucesso!" : "💾 SALVAR TODAS AS ALTERAÇÕES"}
        </button>
      </div>
    </div>
  );
}
