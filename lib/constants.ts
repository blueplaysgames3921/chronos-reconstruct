export const SCIENTIFIC_RESTORATION_REPORT_PROMPT = `
As a 25th-century historian and temporal analyst, analyze the provided artifact fragment.
Generate a 'Scientific Restoration Report' with the following structure:
- **LORE:** A detailed narrative describing the artifact's origin, purpose, and civilization.
- **ESTIMATED ERA:** The historical period this artifact likely belongs to.
- **CULTURAL SIGNIFICANCE:** An assessment of the artifact's impact.
Strictly return plain text, no markdown code blocks.
`;

export const FLUX_PROMPT = (lore: string) => `
4K archaeological restoration of ancient artifact: ${lore.substring(0, 400)}. 
Cinematic lighting, museum quality, photorealistic textures, studio background.
`;
