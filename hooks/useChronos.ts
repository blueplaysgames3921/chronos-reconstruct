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
    setLore('');

    try {
      // Step 1: Reconstruct Image and Lore
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
      
      // Update data immediately to trigger image load
      setLore(data.lore);
      setImageUrl(data.reconstructedImageUrl);
      setChronoPaths(data.chronoPaths);
      
      setState('ANIMATING');

      // Step 2: Attempt Video generation
      try {
        const videoResponse = await fetch('/api/animate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: data.reconstructedImageUrl, apiKey }),
        });

        if (videoResponse.ok) {
            const videoData = await videoResponse.json();
            if (videoData.videoUrl) {
                setVideoUrl(videoData.videoUrl);
            }
        }
      } catch (videoErr) {
        console.warn('Video stream interrupted, remaining on static frame.');
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
    setChronoPaths([]);
    setError(null);
  };

  return { state, lore, imageUrl, videoUrl, chronoPaths, error, reconstruct, reset };
};
