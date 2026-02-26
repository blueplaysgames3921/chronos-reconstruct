import { NextResponse } from 'next/server';
import { Pollinations } from '@/lib/pollinations';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageUrl, apiKey } = body;

    if (!imageUrl || !apiKey) {
      return NextResponse.json({ error: 'Missing Credentials or Image' }, { status: 400 });
    }

    const pollinations = new Pollinations(apiKey);

    // Stage 3: Temporal Animation
    const videoResponse = await pollinations.dispatch(
        "Cinematic temporal animation, slow movement, historical restoration", 
        { image: imageUrl }
    );
    
    return NextResponse.json({ videoUrl: videoResponse.output }, { status: 200 });

  } catch (error: any) {
    console.error("Animation pipeline failed:", error);
    return NextResponse.json({
      error: 'Animation Corrupted',
      details: error.message
    }, { status: 500 });
  }
}

