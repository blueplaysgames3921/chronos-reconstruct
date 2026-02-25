'use client';

import { useState } from 'react';

type ChronosState = 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';

interface ChronoPath {
  id: string;
  title: string;
}

export function useChronos() {
  const [state, setState] = useState<ChronosState>('IDLE');
  const [lore, setLore] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [chronoPaths, setChronoPaths] = useState<ChronoPath[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reconstruct = async (artifactUrl: string, apiKey: string) => {
    setState('SCANNING');
    try {
      const response = await fetch('/api/reconstruct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artifactUrl, apiKey }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setLore(data.lore);
      setState('RECONSTRUCTING');
      setImageUrl(data.imageUrl);
      setState('ANIMATING');
      setVideoUrl(data.videoUrl);
      setChronoPaths(data.chronoPaths);
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

  return {
    state,
    lore,
    imageUrl,
    videoUrl,
    chronoPaths,
    error,
    reconstruct,
    reset,
  };
}
