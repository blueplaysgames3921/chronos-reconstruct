import { useState } from 'react';

type ChronosState = 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';

export const useChronos = () => {
  const [state, setState] = useState<ChronosState>('IDLE');
  const [lore, setLore] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [chronoPaths, setChronoPaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reconstruct = async (sourceImageUrl: string, apiKey: string) => {
    // Reset buffers for new scan
    setVideoUrl(null);
    setImageUrl(null);
    setLore('');
    setError(null);
    setState('SCANNING');

    try {
      // Step 1: Vision & Flux (Parallelized in the route)
      const response = await fetch('/api/reconstruct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: sourceImageUrl, apiKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Temporal Uplink Failed');
      }

      const data = await response.json();

      setLore(data.lore);
      setImageUrl(data.reconstructedImageUrl);
      setChronoPaths(data.chronoPaths);
      
      // Pivot to Animating state only after we have the base reconstruction
      setState('ANIMATING');

      // Step 2: Grok-Video (Decoupled to bypass Edge timeouts)
      try {
        const videoResponse = await fetch('/api/animate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: data.reconstructedImageUrl, apiKey }),
        });

        if (videoResponse.ok) {
            const videoData = await videoResponse.json();
            setVideoUrl(videoData.videoUrl);
        }
      } catch (videoErr) {
        console.warn('Temporal Animation failed; staying on static reconstruction.', videoErr);
      }

      setState('COMPLETE');

    } catch (err: any) {
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
      a.download = `chronos-capsule-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Export failed', err);
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
