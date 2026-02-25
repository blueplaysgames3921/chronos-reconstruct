
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { lore, imageUrl, videoUrl } = await request.json();

  if (!lore || !imageUrl) {
    return new NextResponse(JSON.stringify({ error: 'Missing required data for export' }), { status: 400 });
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Chronos: Time Capsule</title>
        <style>
            body { font-family: monospace; background-color: #050505; color: #06b6d4; padding: 2rem; }
            h1 { color: #10b981; }
            img, video { max-width: 100%; height: auto; border: 1px solid #10b981; margin-top: 1rem; }
        </style>
    </head>
    <body>
        <h1>Project Chronos: Time Capsule</h1>
        <h2>Scientific Restoration Report</h2>
        <pre>${lore}</pre>
        <h2>Restored Artifact</h2>
        <img src="${imageUrl}" alt="Restored Artifact">
        ${videoUrl ? `
        <h2>Temporal Pulse</h2>
        <video controls src="${videoUrl}"></video>
        ` : ''}
    </body>
    </html>
  `;

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="chronos-time-capsule.html"`,
    },
  });
}

