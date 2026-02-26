import { useState } from 'react';
import { Pollinations } from '@/lib/pollinations';
import { SCIENTIFIC_RESTORATION_REPORT_PROMPT, FLUX_PROMPT } from '@/lib/constants';

type ChronosState = 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';

export const useChronos = () => {
  const [state, setState] = useState<ChronosState>('IDLE');
  const [lore, setLore] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [chronoPaths, setChronoPaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reconstruct = async (sourceImageUrl: string, apiKey: string) => {
    setState('SCANNING');
    setError(null);
    setVideoUrl(null);
    setImageUrl(null);
    setLore('');

    const pollinations = new Pollinations(apiKey);

    try {
      // Stage 1: Analyze via Browser
      setState('RECONSTRUCTING');
      const visionResponse = await pollinations.dispatch(SCIENTIFIC_RESTORATION_REPORT_PROMPT, { image: sourceImageUrl });

      let cleanLore = visionResponse.output
        .replace(/```[a-z]*\n?|```/g, "")
        .replace(/["'{}[\]]/g, "")
        .trim();
                                                                           
      if (!cleanLore) throw new Error("Timeline analysis failed to return data."); 
      
      setLore(cleanLore);
      setChronoPaths([
        "[STABILIZE] Archive this timeline.",
        "[REDACT] Classify as Anomaly.",
        "[DIVERGE] Explore Variance."
      ]);

      // Stage 2: Generate Reconstruction URL
      const fluxPrompt = FLUX_PROMPT(cleanLore);
      const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
      
      if (!fluxResponse.output) throw new Error("Image reconstruction failed.");
      setImageUrl(fluxResponse.output);
                                                                                 
      // Stage 3: Generate Animation URL
      setState('ANIMATING');
      const videoResponse = await pollinations.dispatch(
        "Cinematic temporal animation, slow movement, historical restoration, high definition",
        { image: fluxResponse.output, model: 'grok-video' }
      );

      if (videoResponse.output) {
        setVideoUrl(videoResponse.output);
      } else {
        console.warn("Video URL not generated, falling back to image.");
      }

      // Final Transition
      setState('COMPLETE');

    } catch (err: any) {
      console.error("Reconstruction Error:", err);
      setError(err.message);
      setState('ERROR');
    }
  };

  const exportCapsule = async () => {
    if (!lore || !imageUrl) return;
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lore, imageUrl, videoUrl })
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chronos-capsule.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export Error:', err);
    }
  };

  const reset = () => {
    setState('IDLE');
    setLore('');
    setImageUrl(null);
    setVideoUrl(null);
    setChronoPaths([]);
    setError(null);
  };

  return { state, lore, imageUrl, videoUrl, chronoPaths, error, reconstruct, exportCapsule, reset };
};
