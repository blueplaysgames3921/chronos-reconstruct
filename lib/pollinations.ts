const API_URL = 'https://pollinations.ai/p';

async function post(endpoint: string, body: any, apiKey: string) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Pollinations API error: ${response.statusText}`);
  }

  return response.json();
}

export const pollinations = {
  post,
};
