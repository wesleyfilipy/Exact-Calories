import { NextRequest, NextResponse } from "next/server";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const PWD_HASH = "8a43035a27c3a50e3dd7951d2b42c2045ec230a405fb1e66b84323f879bcc310";

async function verifyPassword(input: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  const hash = Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
  return hash === PWD_HASH;
}

// Global in-memory store — persists within the same Vercel function instance
const g = globalThis as typeof globalThis & { __siteConfig?: SiteConfig };
if (!g.__siteConfig) g.__siteConfig = { ...defaultConfig };

export async function GET() {
  return NextResponse.json(g.__siteConfig);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });

  const valid = await verifyPassword(body.password ?? "");
  if (!valid) return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

  const { password: _, ...updates } = body;
  g.__siteConfig = { ...g.__siteConfig!, ...updates };
  return NextResponse.json({ ok: true, config: g.__siteConfig });
}
