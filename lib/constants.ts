export const SCIENTIFIC_RESTORATION_REPORT_PROMPT = `
As a 25th-century historian and temporal analyst, analyze the provided artifact fragment.
Generate a 'Scientific Restoration Report' with:
- **LORE:** Detailed narrative origin.
- **ESTIMATED ERA:** Historical period.
- **CULTURAL SIGNIFICANCE:** Assessment of impact.
Strictly return text only, no markdown code blocks.
`;

export const FLUX_PROMPT = (lore: string) => `
4K archaeological restoration of ancient artifact: ${lore.substring(0, 400)}. 
Cinematic lighting, museum quality, photorealistic.
`;

export const POLLINATIONS_MODELS = {
  FLUX: "flux",
  SVD: "grok-video",
  VISION: "gemini-fast",
};
