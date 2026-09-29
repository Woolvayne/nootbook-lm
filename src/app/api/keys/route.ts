import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";

export async function GET() {
  const rows = await db
    .select({
      id: apiKeys.id,
      name: apiKeys.name,
      key: apiKeys.key,
      createdAt: apiKeys.createdAt,
    })
    .from(apiKeys)
    .orderBy(desc(apiKeys.createdAt))
    .limit(20);
  return NextResponse.json({ keys: rows });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { name?: string };
  const name = String(body.name ?? "").trim().slice(0, 60) || "KI-Assistent";
  const key = `nrto_${crypto.randomUUID().replaceAll("-", "")}${crypto
    .randomUUID()
    .replaceAll("-", "")
    .slice(0, 8)}`;
  const [row] = await db.insert(apiKeys).values({ name, key }).returning();
  return NextResponse.json({ id: row.id, name: row.name, key: row.key });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ?? "";
  if (!id) return NextResponse.json({ error: "id fehlt" }, { status: 400 });
  await db.delete(apiKeys).where(eq(apiKeys.id, id));
  return NextResponse.json({ ok: true });
}
