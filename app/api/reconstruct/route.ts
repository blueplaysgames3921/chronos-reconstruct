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

    // Stage 1: Analyze Artifact Lore
    const visionResponse = await pollinations.dispatch(SCIENTIFIC_RESTORATION_REPORT_PROMPT, { image: imageUrl });
    const lore = visionResponse.output;

    if (!lore) {
      throw new Error("Vision analysis returned null output");
    }

    // Stage 2: Reconstruct Image via Flux
    const fluxPrompt = FLUX_PROMPT(lore);
    const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
    const reconstructedImageUrl = fluxResponse.output;

    if (!reconstructedImageUrl) {
        throw new Error("Flux reconstruction failed");
    }

    // Stage 3: Temporal Animation (Optional fallback)
    let videoUrl = null;
    try {
        const videoPromise = pollinations.dispatch("Cinematic temporal animation, slow movement, historical restoration", { image: reconstructedImageUrl });
        // Set a race condition or just await if time allows
        const videoResponse = await videoPromise;
        videoUrl = videoResponse.output;
    } catch (vError) {
        console.warn("Video generation failed, falling back to static:", vError);
    }

    const chronoPaths = [
      "[STABILIZE] Reinforce the current timeline continuity.",
      "[REDACT] Classify the artifact as a temporal anomaly and seal.",
      "[DIVERGE] Explore the alternative timeline this artifact suggests.",
    ];

    return NextResponse.json({
      lore,
      reconstructedImageUrl,
      videoUrl,
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
