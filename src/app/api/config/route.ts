import { NextRequest, NextResponse } from "next/server";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const _k = "OTU2MTQyMjc=";
function verifyPassword(input: string): boolean {
  try { return Buffer.from(input.trim()).toString("base64") === _k; } catch { return false; }
}

const KV_KEY = "exactcalories_config";
const SUPP_KEY = "exactcalories_supplements";

// Try to use Vercel KV if available, otherwise use in-memory
async function kvGet(key: string): Promise<any> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import("@vercel/kv");
      return await kv.get(key);
    }
  } catch {}
  const g = globalThis as any;
  return g[`__kv_${key}`] ?? null;
}

async function kvSet(key: string, value: any): Promise<void> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import("@vercel/kv");
      await kv.set(key, value);
      return;
    }
  } catch {}
  (globalThis as any)[`__kv_${key}`] = value;
}

export async function GET() {
  const config = (await kvGet(KV_KEY)) as SiteConfig | null;
  const supplements = (await kvGet(SUPP_KEY)) as any[] | null;
  return NextResponse.json({
    config: config ?? defaultConfig,
    supplements: supplements ?? null,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  if (!verifyPassword(body.password ?? "")) return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

  const { password: _, supplements, ...configFields } = body;

  if (Object.keys(configFields).length > 0) {
    const current = ((await kvGet(KV_KEY)) as SiteConfig) ?? defaultConfig;
    await kvSet(KV_KEY, { ...current, ...configFields });
  }
  if (supplements !== undefined) {
    await kvSet(SUPP_KEY, supplements);
  }

  return NextResponse.json({ ok: true });
}
