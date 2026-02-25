
import { NextResponse } from 'next/server';
import { Pollinations } from '@/lib/pollinations';
import { SCIENTIFIC_RESTORATION_REPORT_PROMPT, FLUX_PROMPT } from '@/lib/constants';

export const runtime = 'edge';

export async function POST(request: Request) {
  const { imageUrl, apiKey } = await request.json();

  if (!imageUrl) {
    return new NextResponse(JSON.stringify({ error: 'Image URL is required' }), { status: 400 });
  }
  if (!apiKey) {
    return new NextResponse(JSON.stringify({ error: 'API key is required' }), { status: 400 });
  }

  const pollinations = new Pollinations(apiKey);

  try {
    // Stage 1: Analyze the artifact with Vision model
    const visionResponse = await pollinations.dispatch(SCIENTIFIC_RESTORATION_REPORT_PROMPT, { image: imageUrl });
    const lore = visionResponse.output;

    // Stage 2: Restore the image with Flux
    const fluxPrompt = FLUX_PROMPT(lore);
    const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
    const reconstructedImageUrl = fluxResponse.output;

    // Stage 3: Animate the image with SVD
    const videoResponse = await pollinations.dispatch("Animate this image", { image: reconstructedImageUrl });
    const videoUrl = videoResponse.output;

    // Stage 4: Generate branching timelines
    const chronoPaths = [
      "[STABILIZE] Reinforce the current timeline continuity.",
      "[REDACT] Classify the artifact as a temporal anomaly and seal the record.",
      "[DIVERGE] Explore the alternative timeline this artifact suggests.",
    ];

    return new NextResponse(JSON.stringify({
      lore,
      reconstructedImageUrl,
      videoUrl,
      chronoPaths,
    }), { status: 200 });

  } catch (error: any) {
    console.error("Chronos pipeline failed:", error);
    return new NextResponse(JSON.stringify({ error: 'History Corrupted: The reconstruction process failed.', details: error.message }), { status: 500 });
  }
}
