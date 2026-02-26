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
    setState('SCANNING');
    setError(null);
    setVideoUrl(null);
    setImageUrl(null);

    try {
      // Stage 1 & 2: Analysis and Flux Reconstruction
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

      setState('ANIMATING');

      // Stage 3: Grok-Video Temporal Shift
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
        console.warn('Video buffer failed, proceeding with static image.', videoErr);
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
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export Failed:', err);
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
