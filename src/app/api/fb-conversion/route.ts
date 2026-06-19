import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = "1030362109358006";
const TOKEN = process.env.FB_CONVERSION_TOKEN;
const API_VERSION = "v21.0";

export async function POST(req: NextRequest) {
  if (!TOKEN) {
    return NextResponse.json({ error: "Token not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const store: string = body.store ?? "unknown";
  const eventSourceUrl: string = body.url ?? "https://exactcalories.com";

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ua = req.headers.get("user-agent") ?? "";

  const hashedIp = ip ? crypto.createHash("sha256").update(ip).digest("hex") : undefined;
  const hashedUa = ua ? crypto.createHash("sha256").update(ua).digest("hex") : undefined;

  const eventName = "Lead";
  const eventTime = Math.floor(Date.now() / 1000);
  const eventId = `${eventTime}-${store}-${Math.random().toString(36).slice(2)}`;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        event_id: eventId,
        event_source_url: eventSourceUrl,
        action_source: "website",
        user_data: {
          ...(hashedIp && { client_ip_address: hashedIp }),
          ...(hashedUa && { client_user_agent: hashedUa }),
        },
        custom_data: {
          content_name: store === "ios" ? "AppStore Download" : "GooglePlay Download",
          content_category: "App Download",
        },
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 200 : 400 });
}
