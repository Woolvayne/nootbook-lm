import { NextResponse } from "next/server";
import { verifyMistralKey } from "@/lib/mistral";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { apiKey?: string };
    const apiKey = String(body.apiKey ?? "").trim();
    if (!apiKey) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const ok = await verifyMistralKey(apiKey);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
