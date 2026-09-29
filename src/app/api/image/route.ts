import { pollinationsImageUrl } from "@/lib/pollinations";

export const maxDuration = 180;

// Proxy für Pollinations-Bilder: verhindert CORS-/Canvas-Tainting-Probleme
// beim Rendern des Videos im Browser.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const prompt = (searchParams.get("prompt") ?? "").slice(0, 800);
  if (!prompt) return new Response("prompt required", { status: 400 });

  const width = Math.min(Math.max(Number(searchParams.get("w")) || 1280, 64), 1920);
  const height = Math.min(Math.max(Number(searchParams.get("h")) || 720, 64), 1920);
  const seed = Math.max(Number(searchParams.get("seed")) || 1, 1);

  const url = pollinationsImageUrl(prompt, { width, height, seed });

  let upstream: Response;
  try {
    upstream = await fetch(url, { signal: AbortSignal.timeout(170_000) });
  } catch {
    return new Response("Bildgenerierung fehlgeschlagen (Timeout).", {
      status: 502,
    });
  }
  if (!upstream.ok || !upstream.body) {
    return new Response("Bildgenerierung fehlgeschlagen.", { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
