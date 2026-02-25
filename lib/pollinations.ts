
import { POLLINATIONS_MODELS } from './constants';

const POLLINATIONS_API_URL = "https://api.pollinations.ai/v2";

export class Pollinations {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async dispatch(prompt: string, data: Record<string, any>): Promise<any> {
    let model = POLLINATIONS_MODELS.FLUX;
    if (prompt.includes('Analyze') || prompt.includes('Report')) {
        model = POLLINATIONS_MODELS.VISION;
    } else if (prompt.includes('Animate')) {
        model = POLLINATIONS_MODELS.SVD;
    }

    const response = await fetch(`${POLLINATIONS_API_URL}/dispatch/${model}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ prompt, ...data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Pollinations API error: ${response.status} ${errorText}`);
    }

    return response.json();
  }
}
