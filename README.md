# CHRONOS.ALPHA

> *A temporal reconstruction engine. Submit any artifact fragment and watch history reassemble itself across the quantum continuum.*

Chronos is an AI-powered artifact restoration experience. Drop any image URL into the engine, and it returns a full scientific lore report alongside a photorealistic reconstruction of what that artifact may have originally looked like — generated entirely by AI, styled as a classified 25th-century research terminal.

---

## What It Does

### Deep Scan Analysis
Paste any image URL into the Input Nexus. Chronos dispatches the artifact to a vision AI that generates a **Scientific Restoration Report** — a structured historical analysis covering the artifact's origin civilization, estimated era, purpose, and cultural significance. The report streams into the Data Stream panel word by word as the engine processes it.

### Visual Reconstruction
Simultaneously, the lore is used to prompt a photorealistic image model. The result — a **cinematic, museum-quality reconstruction** of the artifact — materializes in the main viewport with a blur-to-clarity reveal effect.

### Temporal Pulse Enhancement
Once a reconstruction is complete, you can attempt **Temporal Pulse Enhancement** — an experimental video generation layer that animates the reconstructed artifact into a short cinematic clip. This operates across unstable quantum corridors and is intentionally volatile; the UI communicates this honestly with a sci-fi flavored warning so failed attempts feel like a feature rather than a bug.

### Timeline Archive
Every completed reconstruction is automatically saved to your local archive. The **Temporal Archive** sidebar (clock icon in the header) shows all past generations with thumbnails, timestamps, lore previews, and a video indicator. You can purge the archive at any time.

### Story Branching
After each reconstruction, three timeline paths appear:
- **[STABILIZE]** — Export the reconstruction as a sealed capsule
- **[REDACT]** — Wipe the current timeline and start fresh
- **[DIVERGE]** — Re-run the reconstruction of the same artifact for a different result

### Export Capsule
Export any completed reconstruction as a standalone **self-contained `.html` file** — the lore report, reconstructed image, and video (if generated) bundled together in a styled terminal document you can save, share, or archive.

---

## Authentication

Chronos uses **Bring Your Own Pollen** — Pollinations AI's OAuth flow. No accounts are created within the app.

Clicking **Sync Timeline** redirects you to Pollinations' authorization screen, where you grant the Chronos app access to your pollen (compute credits). After authorization you're returned to the app, key in hand. It is stored locally in your browser and never touches a server.

You can disconnect at any time via the **Disconnect** option in the header, which clears the key from your browser entirely. Keys expire automatically after 30 days and can be revoked from the Pollinations dashboard.

---

## Design

The interface is built around a dark sci-fi terminal aesthetic — animated nebula backgrounds, neon cyan and purple glow effects, CRT scanlines, glitch typography, and matrix rain overlays. Everything from loading states to error messages is written in-universe to maintain immersion throughout the experience.

The layout is fully responsive and works on both desktop and mobile.

---

## Powered By

- **Gemini Fast** — vision analysis and lore generation
- **Flux** — photorealistic image reconstruction
- **LTX-2** — experimental temporal animation
- **Pollinations AI** — unified inference API and BYOP auth layer

