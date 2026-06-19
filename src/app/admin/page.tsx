"use client";

import { useState, useEffect, useRef } from "react";
import { defaultConfig, SiteConfig } from "@/lib/site-config";
import { Lock, Save, Image as ImageIcon, Link as LinkIcon, CheckCircle, LogOut, AlertCircle, Plus, Trash2 } from "lucide-react";

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
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [supplements, setSupplements] = useState<Supplement[]>(defaultSupplements);
  const [newSupp, setNewSupp] = useState({ name: "", link: "", imageUrl: "" });
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [uploading, setUploading] = useState<string | null>(null);

  const fileRefs = {
    aboutImage: useRef<HTMLInputElement>(null),
    howItWorksImage: useRef<HTMLInputElement>(null),
    premiumImage: useRef<HTMLInputElement>(null),
    newSuppImage: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const session = sessionStorage.getItem("admin_auth");
    if (session === "ok") setAuthed(true);
    fetch("/api/config").then(r => r.json()).then(setConfig).catch(() => {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) try { setConfig(JSON.parse(s)); } catch {}
    });
    const s = localStorage.getItem(SUPP_KEY);
    if (s) try { const p = JSON.parse(s); if (Array.isArray(p)) setSupplements(p); } catch {}
  }, []);

  function login() {
    if (checkPassword(password)) {
      sessionStorage.setItem("admin_auth", "ok");
      setAuthed(true);
      setAuthError("");
    } else {
      setAuthError("Senha incorreta");
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setPassword("");
  }

  async function save() {
    setSaveState("saving");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    localStorage.setItem(SUPP_KEY, JSON.stringify(supplements));
    window.dispatchEvent(new Event("supplements-updated"));
    try {
      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...config, password }),
      });
    } catch {}
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 3000);
  }

  function handleFileUpload(field: string, file: File) {
    setUploading(field);
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      if (field === "newSuppImage") {
        setNewSupp(n => ({ ...n, imageUrl: url }));
      } else {
        setConfig(c => ({ ...c, [field]: url }));
      }
      setUploading(null);
    };
    reader.readAsDataURL(file);
  }

  function addSupplement() {
    if (!newSupp.name || !newSupp.link) return;
    const item: Supplement = { id: `supp-${Date.now()}`, name: newSupp.name, link: newSupp.link, imageUrl: newSupp.imageUrl || null };
    setSupplements(s => [...s, item]);
    setNewSupp({ name: "", link: "", imageUrl: "" });
  }

  function deleteSupplement(id: string) {
    setSupplements(s => s.filter(x => x.id !== id));
  }

  const imageFields: { key: keyof SiteConfig; label: string }[] = [
    { key: "aboutImage", label: "Foto — Seção Sobre o App" },
    { key: "howItWorksImage", label: "Foto — Como Funciona" },
    { key: "premiumImage", label: "Foto — Premium" },
  ];

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient px-4">
        <div className="bg-white rounded-3xl shadow-2xl shadow-rose-100 p-8 w-full max-w-sm">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold pink-gradient-text" style={{ fontFamily: "var(--font-playfair)" }}>Admin Access</h1>
            <p className="text-sm text-muted-foreground text-center">Digite a senha para acessar o painel</p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()}
              placeholder="Senha"
              autoComplete="current-password"
              className="w-full border border-rose-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            {authError && <div className="flex items-center gap-2 text-sm text-red-500"><AlertCircle className="h-4 w-4" />{authError}</div>}
            <button onClick={login} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl py-3 font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-md shadow-rose-200">
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen luxury-gradient">
      <div className="bg-white border-b border-rose-100 sticky top-0 z-10 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-bold pink-gradient-text" style={{ fontFamily: "var(--font-playfair)" }}>Painel Admin — Exact Calories</h1>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-rose-500">
            <LogOut className="h-4 w-4" /><span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>

      <div className="container py-8 max-w-2xl flex flex-col gap-6 px-4">

        {/* Download Links */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center"><LinkIcon className="h-4 w-4 text-rose-500" /></div><h2 className="font-bold">Links de Download</h2></div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">🍎 App Store (iPhone)</label>
            <input value={config.iosUrl} onChange={e => setConfig(c => ({ ...c, iosUrl: e.target.value }))} className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 w-full" placeholder="https://apps.apple.com/..." />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">🤖 Google Play (Android)</label>
            <input value={config.androidUrl} onChange={e => setConfig(c => ({ ...c, androidUrl: e.target.value }))} className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 w-full" placeholder="https://play.google.com/..." />
          </div>
        </div>

        {/* Site Photos */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center"><ImageIcon className="h-4 w-4 text-rose-500" /></div><h2 className="font-bold">Fotos do Site</h2></div>
          {imageFields.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-3 pb-5 border-b border-rose-50 last:border-0 last:pb-0">
              <label className="text-sm font-medium">{label}</label>
              {config[key] && <div className="w-full h-40 rounded-xl overflow-hidden border border-rose-100"><img src={config[key]} alt={label} className="w-full h-full object-cover" /></div>}
              <input value={(config[key] as string).startsWith("data:") ? "" : (config[key] as string)} onChange={e => setConfig(c => ({ ...c, [key]: e.target.value }))} className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="Cole a URL da imagem..." />
              <input ref={fileRefs[key as keyof typeof fileRefs]} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload(key, f); }} />
              <button onClick={() => fileRefs[key as keyof typeof fileRefs].current?.click()} disabled={uploading === key} className="inline-flex items-center gap-2 text-xs text-rose-500 border border-rose-200 rounded-lg px-3 py-2 hover:bg-rose-50 transition-colors disabled:opacity-50 font-medium w-fit">
                <ImageIcon className="h-3.5 w-3.5" />{uploading === key ? "Carregando..." : "📱 Escolher do dispositivo"}
              </button>
            </div>
          ))}
        </div>

        {/* Supplements */}
        <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center"><Plus className="h-4 w-4 text-rose-500" /></div><h2 className="font-bold">Suplementos</h2></div>

          {/* Existing supplements */}
          <div className="flex flex-col gap-3">
            {supplements.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-rose-100 bg-rose-50/30">
                {s.imageUrl && <img src={s.imageUrl} alt={s.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.link}</p>
                </div>
                <button onClick={() => deleteSupplement(s.id)} className="flex-shrink-0 p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>

          {/* Add new supplement */}
          <div className="border border-dashed border-rose-200 rounded-xl p-4 flex flex-col gap-3">
            <p className="text-sm font-medium text-rose-500">+ Adicionar Suplemento</p>
            <input value={newSupp.name} onChange={e => setNewSupp(n => ({ ...n, name: e.target.value }))} className="border border-rose-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="Nome do produto" />
            <input value={newSupp.link} onChange={e => setNewSupp(n => ({ ...n, link: e.target.value }))} className="border border-rose-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="Link do produto (ex: Amazon)" />
            <input value={newSupp.imageUrl.startsWith("data:") ? "" : newSupp.imageUrl} onChange={e => setNewSupp(n => ({ ...n, imageUrl: e.target.value }))} className="border border-rose-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300" placeholder="URL da imagem" />
            <div className="flex gap-2">
              <input ref={fileRefs.newSuppImage} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFileUpload("newSuppImage", f); }} />
              <button onClick={() => fileRefs.newSuppImage.current?.click()} className="inline-flex items-center gap-2 text-xs text-rose-500 border border-rose-200 rounded-lg px-3 py-2 hover:bg-rose-50 font-medium">
                <ImageIcon className="h-3.5 w-3.5" />Foto do dispositivo
              </button>
              <button onClick={addSupplement} disabled={!newSupp.name || !newSupp.link} className="flex-1 bg-rose-100 text-rose-600 rounded-lg py-2 text-sm font-semibold hover:bg-rose-200 transition-colors disabled:opacity-40">
                Adicionar
              </button>
            </div>
          </div>
        </div>

        {/* Save */}
        <button onClick={save} disabled={saveState === "saving"} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-70 text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-rose-200 transition-all">
          {saveState === "saving" && <><span className="animate-spin inline-block">⏳</span> Salvando...</>}
          {saveState === "saved" && <><CheckCircle className="h-5 w-5" /> Salvo com sucesso!</>}
          {saveState === "error" && <><AlertCircle className="h-5 w-5" /> Erro — tente novamente</>}
          {saveState === "idle" && <><Save className="h-5 w-5" /> Salvar Alterações</>}
        </button>
      </div>
    </div>
  );
}
