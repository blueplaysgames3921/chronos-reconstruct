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

    try {
      // Step 1: Fast Reconstruction (Vision + Image)
      const response = await fetch('/api/reconstruct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: sourceImageUrl, apiKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error during reconstruction');
      }

      const data = await response.json();
      
      setLore(data.lore);
      setImageUrl(data.reconstructedImageUrl);
      setChronoPaths(data.chronoPaths);
      
      // Update state to animating for the next phase
      setState('ANIMATING');

      // Step 2: Slower Video Generation (Decoupled)
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
        console.warn('Video generation timed out or failed, falling back to static image.', videoErr);
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
      a.download = 'chronos-time-capsule.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export time capsule', err);
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
