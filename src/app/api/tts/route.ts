import { pollinationsTtsUrl } from "@/lib/pollinations";

export const maxDuration = 120;

// Kostenlose TTS-Vertonung via Pollinations (OpenAI-Audio Modell).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = (searchParams.get("text") ?? "").slice(0, 600);
  const voice = (searchParams.get("voice") ?? "nova").slice(0, 24);
  if (!text) return new Response("text required", { status: 400 });

  const url = pollinationsTtsUrl(text, voice);

  let upstream: Response;
  try {
    upstream = await fetch(url, { signal: AbortSignal.timeout(110_000) });
  } catch {
    return new Response("Sprachgenerierung fehlgeschlagen (Timeout).", {
      status: 502,
    });
  }
  if (!upstream.ok || !upstream.body) {
    return new Response("Sprachgenerierung fehlgeschlagen.", { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
