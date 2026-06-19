import { NextRequest, NextResponse } from "next/server";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const _k = "OTU2MTQyMjc=";

function verifyPassword(input: string): boolean {
  try {
    return Buffer.from(input.trim()).toString("base64") === _k;
  } catch {
    return false;
  }
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

  const valid = verifyPassword(body.password ?? "");
  if (!valid) return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

  const { password: _, ...updates } = body;
  g.__siteConfig = { ...g.__siteConfig!, ...updates };
  return NextResponse.json({ ok: true, config: g.__siteConfig });
}
