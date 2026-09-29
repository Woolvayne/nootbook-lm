import { NextResponse } from "next/server";
import { generateScript } from "@/lib/mistral";

export const maxDuration = 90;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      topic?: string;
      apiKey?: string;
      style?: string;
      sceneCount?: number;
    };
    const topic = String(body.topic ?? "").trim();
    const apiKey = String(body.apiKey ?? "").trim();
    const style = String(body.style ?? "cinematic");
    const sceneCount = Math.min(
      Math.max(Number(body.sceneCount) || 5, 3),
      8,
    );

    if (!topic || topic.length < 3) {
      return NextResponse.json(
        { error: "Bitte gib ein Thema ein (mindestens 3 Zeichen)." },
        { status: 400 },
      );
    }
    if (!apiKey) {
      return NextResponse.json(
        { error: "Mistral API-Schlüssel fehlt." },
        { status: 400 },
      );
    }

    const script = await generateScript({
      apiKey,
      topic,
      style,
      sceneCount,
    });
    return NextResponse.json(script);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unbekannter Fehler.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
