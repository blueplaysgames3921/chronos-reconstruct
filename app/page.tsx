
'use client';

import { useState } from 'react';
import { useChronos } from '@/hooks/useChronos';
import { KeySetup } from '@/components/ui/KeySetup';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { ArtifactScanner } from '@/components/ui/ArtifactScanner';
import { ChronoDisplay } from '@/components/ui/ChronoDisplay';
import { StoryBranching } from '@/components/StoryBranching';

export default function ChronosLab() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { state, lore, imageUrl, videoUrl, chronoPaths, error, reconstruct, reset } = useChronos();

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
  };

  const handleReconstruct = (url: string) => {
    if (apiKey) {
      reconstruct(url, apiKey);
    }
  };
  
  const handleExport = async () => {
    if (lore && imageUrl) {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lore, imageUrl, videoUrl }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'chronos-time-capsule.html';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error('Failed to export time capsule');
      }
    }
  };


  if (!apiKey) {
    return <KeySetup onApiKeySet={handleApiKeySet} />;
  }

  return (
    <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-emerald-500 mb-8 animate-flicker">PROJECT CHRONOS</h1>

      {state === 'IDLE' && <TerminalInput onSubmit={handleReconstruct} />}

      <div className="my-8 w-full flex justify-center">
        <ChronoDisplay imageUrl={imageUrl} videoUrl={videoUrl} state={state} />
      </div>

      {state === 'SCANNING' && <ArtifactScanner lore={"Scanning for temporal signatures..."} />}
      {state === 'RECONSTRUCTING' && <ArtifactScanner lore={lore} />}
      {state === 'ANIMATING' && <ArtifactScanner lore={lore} />}

      {state === 'COMPLETE' && <StoryBranching chronoPaths={chronoPaths} onExport={handleExport}/>}

      {state === 'ERROR' && (
        <div className="w-full max-w-2xl p-4 border border-red-600 rounded-lg text-red-600">
          <h3 className="text-xl font-bold mb-2">HISTORY CORRUPTED</h3>
          <p>{error}</p>
          <button onClick={reset} className="mt-4 px-4 py-2 bg-red-600 text-void font-bold rounded-md glow-expansion">
            Reset System
          </button>
        </div>
      )}
    </main>
  );
}
