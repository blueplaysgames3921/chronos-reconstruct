import { POLLINATIONS_MODELS } from './constants';

const BASE_URL = "https://gen.pollinations.ai";

export class Pollinations {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async dispatch(prompt: string, data: Record<string, any>): Promise<any> {
    const isTextTask = prompt.includes('Analyze') || prompt.includes('Report');
    const isVideoTask = prompt.includes('Animate') || prompt.includes('temporal') || data.model === 'grok-video';

    try {
      if (isTextTask) {
        // TEXT TASK: Uses POST (Already working as you confirmed)
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

        if (!response.ok) throw new Error(`Text API Error: ${response.statusText}`);

        const result = await response.json();
        return { output: result.choices[0]?.message?.content || "" };

      } else {
        // IMAGE/VIDEO TASK: Uses GET (The logic you caught)
        const model = isVideoTask ? 'grok-video' : 'flux';

        // Clean prompt for URL safety
        const cleanPrompt = prompt
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .split(' ')
          .slice(0, 50)
          .join(' ');

        const encodedPrompt = encodeURIComponent(cleanPrompt);
        const seed = data.seed || Math.floor(Math.random() * 100000);

        // Construct the full URL
        const requestUrl = `${BASE_URL}/image/${encodedPrompt}?model=${model}&seed=${seed}&width=1024&height=1024&nologo=true&nofeed=true`;

        // THE FIX: We MUST fetch the URL to send the Authorization header
        const response = await fetch(requestUrl, {
          method: 'GET',
          headers: {
            'Accept': isVideoTask ? 'video/mp4' : 'image/jpeg, image/png',
            'Authorization': `Bearer ${this.apiKey}`
          }
        });

        if (!response.ok) {
          throw new Error(`Media Generation Error: ${response.status} ${response.statusText}`);
        }

        // Pollinations returns the generated media directly. 
        // We return the URL so the UI can display it, but the fetch above 
        // ensures the generation process is actually authorized and triggered.
        return { output: response.url };
      }
    } catch (error: any) {
      console.error("Pollinations Dispatch Error:", error.message);
      throw new Error(`Pollinations API Error: ${error.message}`);
    }
  }
}
