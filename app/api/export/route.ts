import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { lore, imageUrl, videoUrl } = await request.json();

  if (!lore || !imageUrl) {
    return new NextResponse(JSON.stringify({ error: 'Missing required data' }), { status: 400 });
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chronos Archive: ${Date.now()}</title>
        <style>
            body { font-family: 'Courier New', monospace; background-color: #020202; color: #00f2ff; padding: 3rem; line-height: 1.6; }
            .container { max-width: 800px; margin: 0 auto; border: 1px solid #222; padding: 2rem; border-radius: 8px; box-shadow: 0 0 50px rgba(0,242,255,0.05); }
            h1 { font-style: italic; text-transform: uppercase; letter-spacing: 0.3em; border-bottom: 2px solid #00f2ff; padding-bottom: 1rem; color: #fff; }
            .report { background: #0a0a0a; padding: 1.5rem; border-left: 4px solid #bc13fe; margin: 2rem 0; white-space: pre-wrap; font-size: 0.9rem; }
            .media-box { width: 100%; border: 1px solid #333; margin-top: 2rem; overflow: hidden; border-radius: 4px; }
            img, video { width: 100%; display: block; }
            .footer { margin-top: 3rem; font-size: 0.7rem; color: #444; text-transform: uppercase; letter-spacing: 0.1em; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Chronos: Temporal Record</h1>
            <div class="report">
                <strong>[SCIENTIFIC_RESTORATION_REPORT]</strong><br><br>${lore}
            </div>
            
            <div class="media-box">
                ${videoUrl ? `<video autoplay loop muted playsinline src="${videoUrl}"></video>` : `<img src="${imageUrl}" alt="Restored Artifact">`}
            </div>
            
            <div class="footer">
                Record Status: STABILIZED // System: BotForgeX Laboratories // Engine: 20k-Nuclear-Bomb-Optimized
            </div>
        </div>
    </body>
    </html>
  `;

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="chronos-record-${Date.now()}.html"`,
    },
  });
}
