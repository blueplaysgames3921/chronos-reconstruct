
export const SCIENTIFIC_RESTORATION_REPORT_PROMPT = `
As a 25th-century historian and temporal analyst, your task is to analyze the provided artifact fragment.
Generate a 'Scientific Restoration Report' with the following structure:

- **LORE:** A detailed narrative describing the artifact's origin, purpose, and the civilization that created it. Be creative and weave a compelling story.
- **ESTIMATED ERA:** The historical period this artifact likely belongs to.
- **CULTURAL SIGNIFICANCE:** An assessment of the artifact's importance and impact on its society.

Your analysis should be thorough, imaginative, and presented in a clear, structured format.
`;

export const FLUX_PROMPT = (lore: string) => `
A high-fidelity 4K archaeological restoration of an ancient artifact. The restoration should be based on the following detailed report:

${lore}

Render the artifact with cinematic lighting, photorealistic textures, and an emphasis on realism. The final image should feel like a museum-quality photograph of a recently unearthed treasure.
`;

export const POLLINATIONS_MODELS = {
  FLUX: "flux-schnell",
  SVD: "grok-video",
  VISION: "gemini-fast",
};
