import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { settings } from "@/db/schema";

const MISTRAL_KEY = "mistral_api_key";

export async function GET() {
  const rows = await db
    .select()
    .from(settings)
    .where(eq(settings.key, MISTRAL_KEY))
    .limit(1);
  const value = rows[0]?.value ?? "";
  return NextResponse.json({
    serverKeySet: value.length > 0,
    masked: value ? `••••••••${value.slice(-4)}` : null,
  });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { mistralKey?: string };
  const key = String(body.mistralKey ?? "").trim();
  if (key.length < 10) {
    return NextResponse.json(
      { error: "Schlüssel zu kurz." },
      { status: 400 },
    );
  }
  await db
    .insert(settings)
    .values({ key: MISTRAL_KEY, value: key })
    .onConflictDoUpdate({ target: settings.key, set: { value: key } });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await db.delete(settings).where(eq(settings.key, MISTRAL_KEY));
  return NextResponse.json({ ok: true });
}
