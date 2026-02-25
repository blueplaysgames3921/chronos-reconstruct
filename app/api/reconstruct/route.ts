import { NextResponse } from 'next/server';
import { Pollinations } from '@/lib/pollinations';
import { SCIENTIFIC_RESTORATION_REPORT_PROMPT, FLUX_PROMPT } from '@/lib/constants';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { imageUrl, apiKey } = await request.json();

    if (!imageUrl || !apiKey) {
      return NextResponse.json({ error: 'Missing Credentials or Image' }, { status: 400 });
    }

    const pollinations = new Pollinations(apiKey);

    // Stage 1: Analyze
    const visionResponse = await pollinations.dispatch(SCIENTIFIC_RESTORATION_REPORT_PROMPT, { image: imageUrl });
    const lore = visionResponse.output;

    if (!lore) throw new Error("Vision analysis returned null output");

    // Stage 2: Restore
    const fluxPrompt = FLUX_PROMPT(lore);
    const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
    const reconstructedImageUrl = fluxResponse.output;

    // Stage 3: Animate (Optional check to prevent crash if SVD fails)
    let videoUrl = null;
    try {
        const videoResponse = await pollinations.dispatch("Cinematic temporal animation, slow movement", { image: reconstructedImageUrl });
        videoUrl = videoResponse.output;
    } catch (vError) {
        console.warn("Video generation failed, falling back to static image", vError);
    }

    const chronoPaths = [
      "[STABILIZE] Reinforce the current timeline continuity.",
      "[REDACT] Classify the artifact as a temporal anomaly.",
      "[DIVERGE] Explore the alternative timeline.",
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
