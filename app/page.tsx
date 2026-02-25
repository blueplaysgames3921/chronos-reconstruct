
'use client';

import { useState } from 'react';
import { useChronos } from '@/hooks/useChronos';
import { SecureTerminal } from '@/components/ui/SecureTerminal';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { ArtifactScanner } from '@/components/ui/ArtifactScanner';
import { ChronoDisplay } from '@/components/ui/ChronoDisplay';
import { StoryBranching } from '@/components/StoryBranching';
import { ApertureViewport } from '@/components/ui/ApertureViewport';
import { Scanline } from '@/components/ui/Scanline';
import { motion } from 'framer-motion';

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
    return (
      <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen cyber-grid">
        <div className="live-pulse" />
        <ApertureViewport isLoading={false}>
          <SecureTerminal onApiKeySet={handleApiKeySet} />
        </ApertureViewport>
        <div className="absolute bottom-4 text-xs text-cyan-glow/50">
          <span>LAT: 48.8566 | LONG: 2.3522 | PROTOCOL: CHRONOS-7</span>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen cyber-grid">
      <div className="live-pulse" />
      <h1 className="text-5xl font-bold mb-8" style={{ textShadow: '0 0 8px rgba(0, 242, 255, 0.6)' }}>PROJECT CHRONOS</h1>

      <ApertureViewport isLoading={state === 'SCANNING' || state === 'RECONSTRUCTING' || state === 'ANIMATING'}>
        {state === 'IDLE' && <TerminalInput onSubmit={handleReconstruct} />}

        <div className="my-8 w-full flex justify-center">
          {state === 'SCANNING' && <Scanline />}
          <ChronoDisplay imageUrl={imageUrl} videoUrl={videoUrl} state={state} />
        </div>

        {(state === 'SCANNING' || state === 'RECONSTRUCTING' || state === 'ANIMATING') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <ArtifactScanner lore={state === 'SCANNING' ? 'Scanning for temporal signatures...' : lore} />
          </motion.div>
        )}

        {state === 'COMPLETE' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <StoryBranching chronoPaths={chronoPaths} onExport={handleExport}/>
          </motion.div>
        )}

        {state === 'ERROR' && (
          <div className="w-full max-w-2xl p-4 border border-red-600 rounded-lg text-red-600">
            <h3 className="text-xl font-bold mb-2">HISTORY CORRUPTED</h3>
            <p>{error}</p>
            <button onClick={reset} className="mt-4 px-4 py-2 bg-red-600 text-void font-bold rounded-md">
              Reset System
            </button>
          </div>
        )}
      </ApertureViewport>

      <div className="absolute bottom-4 text-xs text-cyan-glow/50">
        <span>LAT: 48.8566 | LONG: 2.3522 | PROTOCOL: CHRONOS-7</span>
      </div>
    </main>
  );
}
