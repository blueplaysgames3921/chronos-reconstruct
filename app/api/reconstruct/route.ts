import { NextResponse } from 'next/server';
import { Pollinations } from '@/lib/pollinations';
import { SCIENTIFIC_RESTORATION_REPORT_PROMPT, FLUX_PROMPT } from '@/lib/constants';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, apiKey } = body;

    if (!imageUrl || !apiKey) {
      return NextResponse.json({ error: 'Missing Credentials or Image' }, { status: 400 });
    }

    const pollinations = new Pollinations(apiKey);

    // Stage 1: Analyze Artifact Lore (Gemini-Fast)
    const visionResponse = await pollinations.dispatch(SCIENTIFIC_RESTORATION_REPORT_PROMPT, { image: imageUrl });
    
    // REGEX FIX: Remove Markdown code blocks if Gemini returns them
    let lore = visionResponse.output.replace(/```json|```markdown|```/g, "").trim();

    if (!lore) {
      throw new Error("Vision analysis returned null output");
    }

    // Stage 2: Reconstruct Image (Flux)
    const fluxPrompt = FLUX_PROMPT(lore);
    const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
    const reconstructedImageUrl = fluxResponse.output;

    if (!reconstructedImageUrl) {
        throw new Error("Flux reconstruction failed");
    }

    const chronoPaths = [
      "[STABILIZE] Reinforce the current timeline continuity.",
      "[REDACT] Classify the artifact as a temporal anomaly and seal.",
      "[DIVERGE] Explore the alternative timeline this artifact suggests.",
    ];

    return NextResponse.json({
      lore,
      reconstructedImageUrl,
      chronoPaths,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Chronos pipeline failed:", error);
    return NextResponse.json({
      error: 'History Corrupted',
      details: error.message
    }, { status: 500 });
  }
}
