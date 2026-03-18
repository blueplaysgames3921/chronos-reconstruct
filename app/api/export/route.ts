import { NextResponse } from 'next/server';

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export async function POST(request: Request) {
  const { lore, imageUrl, videoUrl } = await request.json();

  if (!lore || !imageUrl) {
    return new NextResponse(JSON.stringify({ error: 'Missing required data' }), { status: 400 });
  }

  const safeLore = escapeHtml(String(lore));
  const safeImageUrl = encodeURI(String(imageUrl));
  const safeVideoUrl = videoUrl ? encodeURI(String(videoUrl)) : null;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Chronos: Time Capsule</title>
    <style>
        body { font-family: 'Courier New', monospace; background-color: #050505; color: #06b6d4; padding: 2rem; line-height: 1.6; }
        .container { max-width: 800px; margin: 0 auto; border: 1px solid #10b98133; padding: 2rem; background: rgba(16, 185, 129, 0.05); }
        h1 { color: #10b981; text-transform: uppercase; letter-spacing: 0.2em; border-bottom: 2px solid #10b981; padding-bottom: 0.5rem; }
        h2 { color: #bc13fe; font-size: 0.9rem; text-transform: uppercase; margin-top: 2rem; }
        pre { white-space: pre-wrap; word-wrap: break-word; background: #000; padding: 1.5rem; border-left: 3px solid #10b981; color: #a7f3d0; }
        .media-box { margin-top: 2rem; border: 1px solid #06b6d4; background: #000; overflow: hidden; border-radius: 8px; }
        img, video { width: 100%; height: auto; display: block; }
        .footer { margin-top: 3rem; font-size: 0.7rem; color: #10b98155; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h1>CHRONOS_DEEP_SCAN</h1>
        <h2>[SCIENTIFIC_RESTORATION_REPORT]</h2>
        <pre>${safeLore}</pre>
        <h2>[VISUAL_RECONSTRUCTION]</h2>
        <div class="media-box">
            <img src="${safeImageUrl}" alt="Restored Artifact">
        </div>
        ${safeVideoUrl ? `<h2>[TEMPORAL_PULSE_ENHANCEMENT]</h2>
        <div class="media-box">
            <video controls autoplay loop muted src="${safeVideoUrl}"></video>
        </div>` : ''}
        <div class="footer">
            COMPLETED_BY_CHRONOS_ALPHA // TIMELINE_STABLE
        </div>
    </div>
</body>
</html>`;

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="chronos-capsule-${Date.now()}.html"`,
    },
  });
}
