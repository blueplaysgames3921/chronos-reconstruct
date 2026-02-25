import { NextApiRequest, NextApiResponse } from 'next';
import { pollinations } from '@/lib/pollinations';
import { VISION_PROMPT, RESTORATION_PROMPT } from '@/lib/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { artifactUrl, apiKey } = req.body;

  try {
    // Step 1: Analyze the artifact with GPT-4 Vision
    const visionResponse = await pollinations.post('/gpt4-vision', { url: artifactUrl, prompt: VISION_PROMPT }, apiKey);
    const lore = visionResponse.text;

    // Step 2: Generate a restored image with DALL-E 3
    const restorationResponse = await pollinations.post('/dalle3', { prompt: `${RESTORATION_PROMPT} ${lore}` }, apiKey);
    const imageUrl = restorationResponse.output;

    // Step 3: Animate the image with SVD
    const animationResponse = await pollinations.post('/svd', { image_url: imageUrl }, apiKey);
    const videoUrl = animationResponse.output;

    // Step 4: Generate branching story paths with GPT-4
    const branchingPrompt = `Based on the following lore, create two alternative historical paths or narratives as short, intriguing titles:

${lore}`;
    const branchingResponse = await pollinations.post('/gpt-4', { prompt: branchingPrompt }, apiKey);
    const pathsText = branchingResponse.text;
    const chronoPaths = pathsText.split('\n').map((title: string, index: number) => ({ id: `path-${index}`, title }));


    res.status(200).json({ lore, imageUrl, videoUrl, chronoPaths });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
