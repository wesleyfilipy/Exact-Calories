import { NextRequest, NextResponse } from "next/server";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const _k = "OTU2MTQyMjc=";
function verifyPassword(input: string): boolean {
  try { return Buffer.from(input.trim()).toString("base64") === _k; } catch { return false; }
}

const defaultSupplements = [
  { id: "supplement-whey", name: "Whey Protein", link: "#", imageUrl: "https://images.unsplash.com/photo-1693996045369-781799bbaea0?w=400&q=80" },
  { id: "supplement-creatine", name: "Creatine", link: "#", imageUrl: "https://images.unsplash.com/photo-1693996045838-980674653385?w=400&q=80" },
  { id: "supplement-preworkout", name: "Pre-Workout", link: "#", imageUrl: "https://images.unsplash.com/photo-1704650311981-419f841421cc?w=400&q=80" },
];

// In-memory fallback (resets on cold start, but Blob takes over when configured)
const g = globalThis as any;
if (!g.__site_data) g.__site_data = { config: defaultConfig, supplements: defaultSupplements };

const BLOB_FILENAME = "exactcalories-site-data.json";

async function readData(): Promise<{ config: SiteConfig; supplements: any[] }> {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: BLOB_FILENAME });
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url);
        if (res.ok) return await res.json();
      }
    }
  } catch {}
  return g.__site_data;
}

async function writeData(data: { config: SiteConfig; supplements: any[] }) {
  g.__site_data = data;
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      await put(BLOB_FILENAME, JSON.stringify(data), {
        access: "public",
        allowOverwrite: true,
        contentType: "application/json",
      });
    }
  } catch {}
}

export async function GET() {
  const data = await readData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  if (!verifyPassword(body.password ?? "")) return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

  const { password: _, supplements, ...configFields } = body;
  const current = await readData();

  const next = {
    config: { ...current.config, ...configFields },
    supplements: supplements !== undefined ? supplements : current.supplements,
  };

  await writeData(next);
  return NextResponse.json({ ok: true });
}
