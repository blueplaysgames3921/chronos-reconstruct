const BASE_URL = "https://gen.pollinations.ai";

type TaskType = 'text' | 'image' | 'video';

interface DispatchOptions {
  task: TaskType;
  image?: string;
  seed?: number;
}

export class Pollinations {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async dispatch(prompt: string, options: DispatchOptions): Promise<{ output: string }> {
    const { task, image, seed = Math.floor(Math.random() * 100000) } = options;

    if (task === 'text') {
      const content: any = image
        ? [
            { type: 'image_url', image_url: { url: image } },
            { type: 'text', text: prompt },
          ]
        : prompt;

      const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content }],
          model: 'gemini-fast',
          seed,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Vision API error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      return { output: result.choices[0]?.message?.content ?? '' };
    }

    const model = task === 'video' ? 'ltx-2' : 'flux';
    const enhance = task === 'video' ? 'false' : 'true';

    const cleanPrompt = prompt
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(' ')
      .slice(0, 50)
      .join(' ');

    const encodedPrompt = encodeURIComponent(cleanPrompt);

    if (task === 'video') {
      const params = new URLSearchParams({
        model,
        seed: String(seed),
        enhance,
        nologo: 'true',
        key: this.apiKey,
      });
      if (image) params.set('init_image', image);
      return { output: `${BASE_URL}/image/${encodedPrompt}?${params.toString()}` };
    }

    const url = `${BASE_URL}/image/${encodedPrompt}?model=${model}&width=1024&height=1024&seed=${seed}&enhance=${enhance}&nologo=true&key=${this.apiKey}`;
    return { output: url };
  }
}
