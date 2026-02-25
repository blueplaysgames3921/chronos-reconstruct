import { NextResponse } from 'next/server';
import { VISION_PROMPT, RESTORATION_PROMPT } from '@/lib/constants';
import { pollinations } from '@/lib/pollinations';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { artifactUrl, apiKey } = await request.json();

    if (!apiKey) {
      return new NextResponse('Missing Pollinations API Key', { status: 401 });
    }

    // Stage 1: Analysis (Vision)
    const visionResponse = await pollinations.post(
      '/vision',
      {
        prompt: VISION_PROMPT,
        image: artifactUrl,
      },
      apiKey
    );

    const lore = visionResponse.text;

    // Stage 2: Restoration (Image)
    const imageResponse = await pollinations.post(
      '/image',
      {
        prompt: `${RESTORATION_PROMPT} ${lore}`,
        model: 'flux',
      },
      apiKey
    );

    const imageUrl = imageResponse.output;

    // Stage 3: Pulse (Video)
    const videoResponse = await pollinations.post(
      '/video',
      {
        image: imageUrl,
        model: 'svd',
        duration: 5,
      },
      apiKey
    );

    const videoUrl = videoResponse.output;

    // Stage 4: Branching (Placeholder)
    const chronoPaths = [
      { id: 'stabilize', title: 'Stabilize Timeline' },
      { id: 'redact', title: 'Redact Anomaly' },
      { id: 'diverge', title: 'Initiate Divergence' },
    ];

    return NextResponse.json({
      lore,
      imageUrl,
      videoUrl,
      chronoPaths,
    });

  } catch (error) {
    console.error('Chronos Reconstruct Error:', error);
    return new NextResponse('History Corrupted', { status: 500 });
  }
}
