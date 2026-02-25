'use client';

import { useState } from 'react';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { ArtifactScanner } from '@/components/ui/ArtifactScanner';
import { ChronoDisplay } from '@/components/ui/ChronoDisplay';
import { StoryBranching } from '@/components/StoryBranching';
import { KeySetup } from '@/components/ui/KeySetup';
import { useChronos } from '@/hooks/useChronos';

export default function ChronosInterface() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { state, lore, imageUrl, videoUrl, chronoPaths, error, reconstruct, reset } = useChronos();

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
  };

  const handleUrlSubmit = (url: string) => {
    if (apiKey) {
      reconstruct(url, apiKey);
    }
  };

  if (!apiKey) {
    return <KeySetup onApiKeySet={handleApiKeySet} />;
  }

  return (
    <main className="container mx-auto p-8 flex flex-col items-center justify-center min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-emerald-500 crt-flicker">Project Chronos</h1>
        <p className="text-lg text-amber-400">AI-Driven Historical Reconstruction</p>
      </header>

      {state === 'IDLE' && <TerminalInput onSubmit={handleUrlSubmit} />}

      {state === 'SCANNING' && <ArtifactScanner lore="Initiating temporal scan... Accessing artifact data stream..." />}
      {state === 'RECONSTRUCTING' && imageUrl && (
        <>
          <ArtifactScanner lore={lore} />
          <ChronoDisplay imageUrl={imageUrl} videoUrl={null} />
        </>
      )}
      {state === 'ANIMATING' && imageUrl && videoUrl && (
        <>
          <ArtifactScanner lore={lore} />
          <ChronoDisplay imageUrl={imageUrl} videoUrl={videoUrl} />
        </>
      )}

      {state === 'COMPLETE' && imageUrl && videoUrl && (
        <>
          <ChronoDisplay imageUrl={imageUrl} videoUrl={videoUrl} />
          <StoryBranching paths={chronoPaths} />
        </>
      )}

      {error && (
        <div className="w-full max-w-2xl mx-auto p-4 border border-red-600 rounded-lg text-center">
          <h2 className="text-2xl text-red-600 font-bold mb-4">Temporal Anomaly Detected</h2>
          <p className="text-white">{error}</p>
          <button onClick={reset} className="mt-4 px-4 py-2 bg-red-600 text-void font-bold rounded-md glow-expansion">
            Reset Chronometer
          </button>
        </div>
      )}
    </main>
  );
}
