import { NextResponse } from 'next/server';
import { Pollinations } from '@/lib/pollinations';
import { SCIENTIFIC_RESTORATION_REPORT_PROMPT, FLUX_PROMPT } from '@/lib/constants';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, apiKey } = body;

    if (!imageUrl || !apiKey) {
      return NextResponse.json({ error: 'Auth Required' }, { status: 400 });
    }

    const pollinations = new Pollinations(apiKey);

    // Stage 1: Gemini Vision Analysis
    const visionResponse = await pollinations.dispatch(SCIENTIFIC_RESTORATION_REPORT_PROMPT, { image: imageUrl });
    
    // Clean potential LLM artifacts
    let lore = visionResponse.output
      .replace(/```[a-z]*\n?|```/g, "")
      .replace(/["'{}[\]]/g, "")
      .trim();

    if (!lore) throw new Error("Vision stage failed");

    // Stage 2: Flux Image Reconstruction
    const fluxPrompt = FLUX_PROMPT(lore);
    const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
    const reconstructedImageUrl = fluxResponse.output;

    if (!reconstructedImageUrl) throw new Error("Flux stage failed");

    return NextResponse.json({
      lore,
      reconstructedImageUrl,
      chronoPaths: [
        "[STABILIZE] Archive this timeline.",
        "[REDACT] Classify as Anomaly.",
        "[DIVERGE] Explore Variance."
      ],
    }, { status: 200 });

  } catch (error: any) {
    console.error("Pipeline Failure:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
