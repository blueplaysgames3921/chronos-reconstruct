import { useState } from 'react';
import { Pollinations } from '@/lib/pollinations';
import { SCIENTIFIC_RESTORATION_REPORT_PROMPT, FLUX_PROMPT } from '@/lib/constants';

type ChronosState = 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'COMPLETE' | 'ERROR';
type EnhanceStatus = 'IDLE' | 'SEARCHING' | 'SUCCESS' | 'FAILED';

export const useChronos = () => {
  const [state, setState] = useState<ChronosState>('IDLE');
  const [enhanceStatus, setEnhanceStatus] = useState<EnhanceStatus>('IDLE');
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
    setEnhanceStatus('IDLE');

    const pollinations = new Pollinations(apiKey);

    try {
      // Stage 1: Analyze (Gemini-Fast)
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

      // Stage 2: Image Reconstruction (Flux - 0.3s)
      const fluxPrompt = FLUX_PROMPT(cleanLore);
      const fluxResponse = await pollinations.dispatch(fluxPrompt, {});
      
      if (!fluxResponse.output) throw new Error("Image reconstruction failed.");
      setImageUrl(fluxResponse.output);
                                                                                 
      // Stage 3: Immediate Completion
      // We do not wait for video here. The user is now free to Export or View.
      setState('COMPLETE');

    } catch (err: any) {
      console.error("Chronos Reconstruction Failure:", err);
      setError(err.message || "An unknown temporal anomaly occurred.");
      setState('ERROR');
    }
  };

  const enhance = async (apiKey: string) => {
    if (!imageUrl) return;
    setEnhanceStatus('SEARCHING');
    const pollinations = new Pollinations(apiKey);

    try {
      const videoResponse = await pollinations.dispatch(
        "Cinematic temporal animation, slow movement, historical restoration, high definition, museum quality",
        { image: imageUrl, model: 'grok-video' }
      );

      if (videoResponse.output) {
        setVideoUrl(videoResponse.output);
        setEnhanceStatus('SUCCESS');
      } else {
        setEnhanceStatus('FAILED');
      }
    } catch (err) {
      console.warn("Temporal Pulse (Video) failed.", err);
      setEnhanceStatus('FAILED');
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
    setEnhanceStatus('IDLE');
    setLore('');
    setImageUrl(null);
    setVideoUrl(null);
    setChronoPaths([]);
    setError(null);
  };

  return { state, enhanceStatus, lore, imageUrl, videoUrl, chronoPaths, error, reconstruct, enhance, exportCapsule, reset };
};
