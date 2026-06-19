"use client";

import { useState, useEffect, useRef } from "react";
import { defaultConfig, SiteConfig } from "@/lib/site-config";
import { Lock, Save, Image as ImageIcon, Link as LinkIcon, CheckCircle, LogOut, AlertCircle } from "lucide-react";

const STORAGE_KEY = "exactcalories_admin_config";
const PWD_HASH = "8a43035a27c3a50e3dd7951d2b42c2045ec230a405fb1e66b84323f879bcc310";

async function checkPassword(input: string): Promise<boolean> {
  const encoded = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  const hash = Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
  return hash === PWD_HASH;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [uploading, setUploading] = useState<string | null>(null);

  const fileRefs = {
    aboutImage: useRef<HTMLInputElement>(null),
    howItWorksImage: useRef<HTMLInputElement>(null),
    premiumImage: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const session = sessionStorage.getItem("admin_auth");
    if (session === "ok") setAuthed(true);
    // Load current config from API
    fetch("/api/config")
      .then(r => r.json())
      .then(data => setConfig(data))
      .catch(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) try { setConfig(JSON.parse(stored)); } catch {}
      });
  }, []);

  async function login() {
    const ok = await checkPassword(password);
    if (ok) {
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
    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...config, password }),
      });
      if (res.ok) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 3000);
      } else {
        setSaveState("error");
        setTimeout(() => setSaveState("idle"), 3000);
      }
    } catch {
      // Fallback: save only to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  }

  function handleFileUpload(field: keyof typeof fileRefs, file: File) {
    setUploading(field);
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setConfig((c) => ({ ...c, [field]: url }));
      setUploading(null);
    };
    reader.readAsDataURL(file);
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient px-4">
        <div className="bg-white rounded-3xl shadow-2xl shadow-rose-100 p-8 sm:p-10 w-full max-w-sm">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold pink-gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>
              Admin Access
            </h1>
            <p className="text-sm text-muted-foreground text-center">Digite a senha para acessar o painel</p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="Senha"
              className="w-full border border-rose-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            {authError && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {authError}
              </div>
            )}
            <button
              onClick={login}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl py-3 font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-md shadow-rose-200"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const imageFields: { key: keyof typeof fileRefs; label: string }[] = [
    { key: "aboutImage", label: "Foto — Seção Sobre o App" },
    { key: "howItWorksImage", label: "Foto — Como Funciona" },
    { key: "premiumImage", label: "Foto — Premium" },
  ];

  return (
    <div className="min-h-screen luxury-gradient">
      {/* Header */}
      <div className="bg-white border-b border-rose-100 sticky top-0 z-10 shadow-sm shadow-rose-50">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-bold text-base sm:text-lg pink-gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            Painel Admin — Exact Calories
          </h1>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-rose-500 transition-colors">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>

      <div className="container py-8 max-w-2xl flex flex-col gap-6 px-4">

        {/* Links */}
        <div className="bg-white rounded-2xl shadow-sm shadow-rose-100 border border-rose-100 p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <LinkIcon className="h-4 w-4 text-rose-500" />
            </div>
            <h2 className="font-bold">Links de Download</h2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground/80">🍎 App Store (iPhone / iOS)</label>
            <input
              value={config.iosUrl}
              onChange={(e) => setConfig((c) => ({ ...c, iosUrl: e.target.value }))}
              className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
              placeholder="https://apps.apple.com/..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground/80">🤖 Google Play (Android)</label>
            <input
              value={config.androidUrl}
              onChange={(e) => setConfig((c) => ({ ...c, androidUrl: e.target.value }))}
              className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
              placeholder="https://play.google.com/..."
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl shadow-sm shadow-rose-100 border border-rose-100 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <ImageIcon className="h-4 w-4 text-rose-500" />
            </div>
            <h2 className="font-bold">Fotos do Site</h2>
          </div>

          {imageFields.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-3 pb-5 border-b border-rose-50 last:border-0 last:pb-0">
              <label className="text-sm font-medium text-foreground/80">{label}</label>

              {config[key] && (
                <div className="w-full h-44 rounded-xl overflow-hidden border border-rose-100 bg-rose-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={config[key]} alt={label} className="w-full h-full object-cover" />
                </div>
              )}

              <input
                value={config[key].startsWith("data:") ? "" : config[key]}
                onChange={(e) => setConfig((c) => ({ ...c, [key]: e.target.value }))}
                className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
                placeholder="Cole a URL da imagem..."
              />

              <div>
                <input
                  ref={fileRefs[key]}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(key, file);
                  }}
                />
                <button
                  onClick={() => fileRefs[key].current?.click()}
                  disabled={uploading === key}
                  className="inline-flex items-center gap-2 text-xs text-rose-500 border border-rose-200 rounded-lg px-3 py-2 hover:bg-rose-50 transition-colors disabled:opacity-50 font-medium"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  {uploading === key ? "Carregando..." : "📱 Escolher foto do dispositivo"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          onClick={save}
          disabled={saveState === "saving"}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-70 text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-rose-200 transition-all"
        >
          {saveState === "saving" && <><span className="animate-spin">⏳</span> Salvando...</>}
          {saveState === "saved" && <><CheckCircle className="h-5 w-5" /> Salvo com sucesso!</>}
          {saveState === "error" && <><AlertCircle className="h-5 w-5" /> Erro ao salvar — tente novamente</>}
          {saveState === "idle" && <><Save className="h-5 w-5" /> Salvar Alterações</>}
        </button>
      </div>
    </div>
  );
}
