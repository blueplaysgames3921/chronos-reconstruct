import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// This is a placeholder for a more robust solution
const EXPORT_DIR = path.resolve(process.cwd(), 'time-capsules');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { lore, imageUrl, videoUrl } = req.body;

  try {
    if (!fs.existsSync(EXPORT_DIR)) {
      fs.mkdirSync(EXPORT_DIR);
    }

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const capsuleDir = path.join(EXPORT_DIR, `capsule-${timestamp}`);
    fs.mkdirSync(capsuleDir);

    // Save the lore
    fs.writeFileSync(path.join(capsuleDir, 'lore.txt'), lore, 'utf-8');

    // Save the manifest
    const manifest = {
      lore: 'lore.txt',
      imageUrl,
      videoUrl,
      createdAt: new Date().toISOString(),
    };
    fs.writeFileSync(path.join(capsuleDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8');


    res.status(200).json({ message: `Time capsule exported to: ${capsuleDir}` });
  } catch (error: any) {
    res.status(500).json({ message: `Error exporting time capsule: ${error.message}` });
  }
}
