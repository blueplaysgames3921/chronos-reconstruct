import { POLLINATIONS_MODELS } from './constants';

const BASE_URL = "https://gen.pollinations.ai";

export class Pollinations {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async dispatch(prompt: string, data: Record<string, any>): Promise<any> {
    const isTextTask = prompt.includes('Analyze') || prompt.includes('Report');
    const isVideoTask = prompt.includes('Animate') || prompt.includes('temporal');

    try {
      if (isTextTask) {
        const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            messages: [{
              role: 'user',
              content: data.image
                ? [
                    { type: "text", text: prompt }, 
                    { type: "image_url", image_url: { url: data.image } }
                  ]
                : prompt
            }],
            model: 'gemini-fast',
            seed: Math.floor(Math.random() * 100000)
          })
        });

        const result = await response.json();
        return { output: result.choices[0]?.message?.content || "" };

      } else {
        const model = isVideoTask ? 'grok-video' : 'flux';
        
        // Remove characters that break URL parsing in many browsers
        const cleanPrompt = prompt
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .split(' ')
          .slice(0, 60)
          .join(' ');

        const encodedPrompt = encodeURIComponent(cleanPrompt);
        const seed = data.seed || Math.floor(Math.random() * 100000);

        // Standardized format: nologo and no-cache ensure fresh delivery
        const outputUrl = `${BASE_URL}/image/${encodedPrompt}?model=${model}&seed=${seed}&width=1024&height=1024&nologo=true&nofeed=true`;

        return { output: outputUrl };
      }
    } catch (error: any) {
      throw new Error(`Pollinations API Error: ${error.message}`);
    }
  }
}
