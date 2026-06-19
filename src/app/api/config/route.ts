import { NextRequest, NextResponse } from "next/server";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin";

// In-memory store (resets on cold start — use Vercel KV for persistence)
// For Vercel, set KV_URL env var; otherwise falls back to in-memory
let memoryConfig: SiteConfig = { ...defaultConfig };

function getConfig(): SiteConfig {
  return memoryConfig;
}

function setConfig(cfg: SiteConfig) {
  memoryConfig = cfg;
}

export async function GET() {
  return NextResponse.json(getConfig());
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  }
  const { password: _, ...updates } = body;
  const current = getConfig();
  const next: SiteConfig = { ...current, ...updates };
  setConfig(next);
  return NextResponse.json({ ok: true, config: next });
}
