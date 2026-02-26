import { NextResponse } from 'next/server';
import { Pollinations } from '@/lib/pollinations';
import { SCIENTIFIC_RESTORATION_REPORT_PROMPT, FLUX_PROMPT } from '@/lib/constants';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, apiKey } = body;

    if (!imageUrl || !apiKey) {
      return NextResponse.json({ error: 'Missing Credentials' }, { status: 400 });
    }

    const pollinations = new Pollinations(apiKey);

    // Stage 1: Analyze Artifact
    const visionResponse = await pollinations.dispatch(SCIENTIFIC_RESTORATION_REPORT_PROMPT, { image: imageUrl });
    
    // Remove Markdown pollution (```json, etc)
    const lore = visionResponse.output.replace(/```[a-z]*\n?|```/g, "").trim();

    if (!lore) throw new Error("Vision analysis failed");

    // Stage 2: Generate Reconstruction
    const fluxPrompt = FLUX_PROMPT(lore);
    const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
    const reconstructedImageUrl = fluxResponse.output;

    const chronoPaths = [
      "[STABILIZE] Reinforce the current timeline continuity.",
      "[REDACT] Classify the artifact as a temporal anomaly.",
      "[DIVERGE] Explore the alternative timeline suggested.",
    ];

    return NextResponse.json({
      lore,
      reconstructedImageUrl,
      chronoPaths,
    }, { status: 200 });

  } catch (error: any) {
    console.error("Pipeline Error:", error);
    return NextResponse.json({ error: 'History Corrupted', details: error.message }, { status: 500 });
  }
}
