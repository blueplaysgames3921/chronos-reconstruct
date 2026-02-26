import { useState } from 'react';

export const useChronos = () => {
  const [state, setState] = useState<'IDLE' | 'SCANNING' | 'ANIMATING' | 'COMPLETE' | 'ERROR'>('IDLE');
  const [lore, setLore] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [chronoPaths, setChronoPaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reconstruct = async (sourceImageUrl: string, apiKey: string) => {
    setState('SCANNING');
    setVideoUrl(null);
    setImageUrl(null);
    setError(null);

    try {
      const response = await fetch('/api/reconstruct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: sourceImageUrl, apiKey }),
      });

      if (!response.ok) throw new Error('Uplink Failed');
      const data = await response.json();

      setLore(data.lore);
      setImageUrl(data.reconstructedImageUrl);
      setChronoPaths(data.chronoPaths);
      setState('ANIMATING');

      // Separate call for video to prevent timing out the reconstruction
      const videoRes = await fetch('/api/animate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: data.reconstructedImageUrl, apiKey }),
      });

      if (videoRes.ok) {
        const vData = await videoRes.json();
        setVideoUrl(vData.videoUrl);
      }
      
      setState('COMPLETE');
    } catch (err: any) {
      setError(err.message);
      setState('ERROR');
    }
  };

  const reset = () => {
    setState('IDLE');
    setLore('');
    setImageUrl(null);
    setVideoUrl(null);
    setError(null);
  };

  return { state, lore, imageUrl, videoUrl, chronoPaths, error, reconstruct, reset };
};
