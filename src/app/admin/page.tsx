"use client";

import { useState, useEffect } from "react";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const STORAGE_KEY = "exactcalories_admin_config";

function compressImage(file: File, maxWidth = 800): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
    };
    img.src = url;
  });
}

function checkPassword(input: string): boolean {
  const a = ["9", "5", "6", "1", "4", "2", "2", "7"];
  return input.trim() === a.join("");
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwdError, setPwdError] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "ok") setAuthed(true);
    fetch("/api/config")
      .then(r => r.json())
      .then(data => { if (data.config) setConfig(data.config); })
      .catch(() => {
        try { const s = localStorage.getItem(STORAGE_KEY); if (s) setConfig(JSON.parse(s)); } catch {}
      });
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

  async function uploadImage(field: keyof SiteConfig, file: File) {
    const compressed = await compressImage(file);
    setConfig(c => ({ ...c, [field]: compressed }));
  }

  async function save() {
    setSaved(false);
    await fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...config, password: pwd }),
    }).catch(() => {});
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  /* ── LOGIN ── */
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

  /* ── ADMIN ── */
  const inputStyle: React.CSSProperties = { width: "100%", border: "1.5px solid #fecdd3", borderRadius: ".75rem", padding: ".65rem .9rem", fontSize: ".95rem", outline: "none", boxSizing: "border-box", marginBottom: ".5rem" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: ".8rem", fontWeight: 700, color: "#be185d", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: ".4rem" };
  const cardStyle: React.CSSProperties = { background: "#fff", borderRadius: "1.25rem", border: "1px solid #fce7f3", padding: "1.25rem", marginBottom: "1rem" };
  const uploadBtnStyle: React.CSSProperties = { background: "linear-gradient(135deg,#f43f5e,#ec4899)", color: "#fff", border: "none", borderRadius: ".75rem", padding: ".6rem 1.2rem", fontSize: ".85rem", fontWeight: 700, cursor: "pointer", display: "inline-block" };

  const imageFields: { key: keyof SiteConfig; label: string }[] = [
    { key: "aboutImage", label: "Foto — Seção Sobre" },
    { key: "howItWorksImage", label: "Foto — Como Funciona" },
    { key: "premiumImage", label: "Foto — Premium" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff8fa", paddingBottom: "2rem" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #fce7f3", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <span style={{ fontWeight: 800, color: "#e11d48", fontSize: "1.1rem" }}>⚙️ Admin Panel</span>
        <button onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }} style={{ background: "none", border: "1px solid #fecdd3", borderRadius: ".6rem", padding: ".4rem .8rem", color: "#e11d48", cursor: "pointer", fontSize: ".85rem" }}>Sair</button>
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>

        {/* Links */}
        <div style={cardStyle}>
          <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem", color: "#111" }}>📲 Links de Download</h2>
          <label style={labelStyle}>🍎 App Store (iPhone)</label>
          <input style={inputStyle} value={config.iosUrl} onChange={e => setConfig(c => ({ ...c, iosUrl: e.target.value }))} placeholder="https://apps.apple.com/..." />
          <label style={labelStyle}>🤖 Google Play (Android)</label>
          <input style={inputStyle} value={config.androidUrl} onChange={e => setConfig(c => ({ ...c, androidUrl: e.target.value }))} placeholder="https://play.google.com/..." />
        </div>

        {/* Photos */}
        <div style={cardStyle}>
          <h2 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1rem", color: "#111" }}>🖼 Fotos do Site</h2>
          {imageFields.map(({ key, label }) => (
            <div key={key} style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>{label}</label>
              {config[key] && <img src={config[key] as string} alt={label} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: ".75rem", marginBottom: ".5rem" }} />}
              <input style={inputStyle} value={(config[key] as string).startsWith("data:") ? "" : (config[key] as string)} onChange={e => setConfig(c => ({ ...c, [key]: e.target.value }))} placeholder="Cole a URL da foto..." />
              <label style={uploadBtnStyle}>
                📱 Fazer upload da foto
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(key, f); }} />
              </label>
            </div>
          ))}
        </div>

        {/* Save */}
        <button onClick={save} style={{ width: "100%", background: saved ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#f43f5e,#ec4899)", color: "#fff", border: "none", borderRadius: "1.25rem", padding: "1.1rem", fontSize: "1.1rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px #f4335530" }}>
          {saved ? "✅ Salvo com sucesso!" : "💾 SALVAR TODAS AS ALTERAÇÕES"}
        </button>
      </div>
    </div>
  );
}
