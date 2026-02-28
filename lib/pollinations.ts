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
        // --- TEXT TASK: FIXED TO PREVENT API ERROR ---
        // We pass the image URL as part of the prompt string to ensure 
        // the model sees it without the strict multimodal array crashing it.
        const fullPrompt = data.image 
          ? `${prompt}\n\n[ANALYZE IMAGE AT THIS URL: ${data.image}]` 
          : prompt;

        const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            messages: [{
              role: 'user',
              content: fullPrompt
            }],
            model: 'gemini-fast',
            seed: Math.floor(Math.random() * 100000)
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Text API Error: ${response.status} ${errorData}`);
        }

        const result = await response.json();
        return { output: result.choices[0]?.message?.content || "" };

      } else {
        // --- MEDIA TASK: WORKING GET LOGIC ---
        const model = isVideoTask ? 'grok-video' : 'flux';
        const enhance = isVideoTask ? 'false' : 'true';

        const cleanPrompt = prompt
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .split(' ')
          .slice(0, 50)
          .join(' ');

        const encodedPrompt = encodeURIComponent(cleanPrompt);
        const seed = data.seed || Math.floor(Math.random() * 100000);

        // Format: [BASE]/image/[prompt]?model=[model]&seed=[seed]&width=1024&height=1024&enhance=[bool]&nologo=true&key=[apiKey]
        const authenticatedUrl = `${BASE_URL}/image/${encodedPrompt}?model=${model}&width=1024&height=1024&seed=${seed}&enhance=${enhance}&nologo=true&key=${this.apiKey}`;

        return { output: authenticatedUrl };
      }
    } catch (error: any) {
      console.error("Pollinations Dispatch Error:", error.message);
      throw new Error(`Pollinations API Error: ${error.message}`);
    }
  }
}
