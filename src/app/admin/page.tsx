"use client";

import { useState, useEffect, useRef } from "react";
import { defaultConfig, SiteConfig } from "@/lib/site-config";
import { Lock, Save, Image as ImageIcon, Link as LinkIcon, CheckCircle, LogOut } from "lucide-react";

const STORAGE_KEY = "exactcalories_admin_config";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRefs = {
    aboutImage: useRef<HTMLInputElement>(null),
    howItWorksImage: useRef<HTMLInputElement>(null),
    premiumImage: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setConfig(JSON.parse(stored)); } catch {}
    }
    const session = sessionStorage.getItem("admin_auth");
    if (session === "ok") setAuthed(true);
  }, []);

  function login() {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "admin") {
      sessionStorage.setItem("admin_auth", "ok");
      setAuthed(true);
      setError("");
    } else {
      setError("Senha incorreta");
    }
  }

  function logout() {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setPassword("");
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handleFileUpload(field: keyof typeof fileRefs, file: File) {
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
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <div className="bg-white rounded-3xl shadow-2xl shadow-rose-100 p-10 w-full max-w-sm mx-4">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
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
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <button
              onClick={login}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl py-3 font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
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
      <div className="bg-white border-b border-rose-100 sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-bold text-lg pink-gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>
            Painel Admin — Exact Calories
          </h1>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-rose-500 transition-colors">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </div>

      <div className="container py-10 max-w-2xl flex flex-col gap-8">

        {/* Links Section */}
        <div className="bg-white rounded-2xl shadow-sm shadow-rose-100 border border-rose-100 p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2 mb-1">
            <LinkIcon className="h-5 w-5 text-rose-400" />
            <h2 className="font-bold text-base">Links de Download</h2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground/80">Link App Store (iOS)</label>
            <input
              value={config.iosUrl}
              onChange={(e) => setConfig((c) => ({ ...c, iosUrl: e.target.value }))}
              className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="https://apps.apple.com/..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground/80">Link Google Play (Android)</label>
            <input
              value={config.androidUrl}
              onChange={(e) => setConfig((c) => ({ ...c, androidUrl: e.target.value }))}
              className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="https://play.google.com/..."
            />
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white rounded-2xl shadow-sm shadow-rose-100 border border-rose-100 p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon className="h-5 w-5 text-rose-400" />
            <h2 className="font-bold text-base">Fotos do Site</h2>
          </div>

          {imageFields.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/80">{label}</label>

              {/* Preview */}
              {config[key] && (
                <div className="w-full h-40 rounded-xl overflow-hidden border border-rose-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={config[key]}
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* URL input */}
              <input
                value={config[key].startsWith("data:") ? "" : config[key]}
                onChange={(e) => setConfig((c) => ({ ...c, [key]: e.target.value }))}
                className="border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Cole a URL da imagem ou faça upload abaixo"
              />

              {/* File upload */}
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
                  className="flex items-center gap-2 text-xs text-rose-500 border border-rose-200 rounded-lg px-3 py-1.5 hover:bg-rose-50 transition-colors disabled:opacity-50"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  {uploading === key ? "Carregando..." : "Escolher do dispositivo"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Save */}
        <button
          onClick={save}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-rose-200 transition-all"
        >
          {saved ? (
            <><CheckCircle className="h-5 w-5" /> Salvo com sucesso!</>
          ) : (
            <><Save className="h-5 w-5" /> Salvar Alterações</>
          )}
        </button>

        <p className="text-xs text-center text-muted-foreground">
          As alterações são salvas neste dispositivo. Para publicar no site permanentemente, entre em contato com seu desenvolvedor.
        </p>
      </div>
    </div>
  );
}
