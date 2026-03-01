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
      // Stage 1: Analyze
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

      // Stage 2: Image
      const fluxPrompt = FLUX_PROMPT(cleanLore);
      const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
      
      if (!fluxResponse.output) throw new Error("Image reconstruction failed.");
      setImageUrl(fluxResponse.output);
                                                                                 
      // Stage 3: Animation
      setState('ANIMATING');
      
      const videoResponse = await pollinations.dispatch(
        "Cinematic temporal animation, slow movement, historical restoration, high definition, museum quality",
        { image: fluxResponse.output, model: 'grok-video' }
      );

      if (videoResponse.output) {
        setVideoUrl(videoResponse.output);
      } else {
        console.warn("Temporal Pulse (Video) failed. Using Static Reconstruction.");
        // If video fails, we move to complete since there is no video to wait for
        setState('COMPLETE');
      }

      // We DO NOT set state to 'COMPLETE' here anymore.
      // We let the media loading events in the UI determine when the "sync" is done.

    } catch (err: any) {
      console.error("Chronos Reconstruction Failure:", err);
      setError(err.message || "An unknown temporal anomaly occurred.");
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
      
      if (!response.ok) throw new Error("Export failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chronos-capsule-${Date.now()}.html`;
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
