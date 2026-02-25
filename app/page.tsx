'use client';

import { useState } from 'react';
import { useChronos } from '@/hooks/useChronos';
import { SecureTerminal } from '@/components/ui/SecureTerminal';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { ArtifactScanner } from '@/components/ui/ArtifactScanner';
import { ChronoDisplay } from '@/components/ui/ChronoDisplay';
import { StoryBranching } from '@/components/StoryBranching';

export default function ChronosLab() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { state, lore, imageUrl, videoUrl, chronoPaths, error, reconstruct, reset } = useChronos();

  if (!apiKey) {
    return (
      <main className="h-screen w-screen flex items-center justify-center p-6">
        <SecureTerminal onApiKeySet={setApiKey} />
      </main>
    );
  }

  return (
    <main className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Top Status Bar */}
      <header className="h-14 border-b border-chrono-cyan/20 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-chrono-cyan animate-pulse shadow-[0_0_10px_#00f2ff]" />
          <h1 className="text-lg font-black tracking-tighter text-white">CHRONOS_LAB v7.2</h1>
        </div>
        <div className="text-[10px] space-x-6 text-chrono-cyan/60 font-bold">
          <span>COORDINATES: 48.8566° N, 2.3522° E</span>
          <span>TIMELINE: PRIMARY_A</span>
          <span className="text-chrono-cyan">STATUS: {state}</span>
        </div>
      </header>

      <div className="flex-1 p-6 flex gap-6 overflow-hidden">
        {/* Left Side: Controls & Lore */}
        <aside className="w-[400px] flex flex-col gap-6">
          <div className="chrome-container p-6 rounded-xl flex-shrink-0">
            <h2 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-widest">Temporal Input</h2>
            <TerminalInput onSubmit={(url) => reconstruct(url, apiKey)} />
          </div>
          
          <div className="chrome-container p-6 rounded-xl flex-1 overflow-y-auto scrollbar-hide">
            <h2 className="text-xs font-bold text-white/50 mb-4 uppercase tracking-widest">Reconstruction Data</h2>
            {lore ? <ArtifactScanner lore={lore} /> : (
              <div className="h-full flex items-center justify-center text-chrono-cyan/20 italic text-sm">
                Awaiting artifact signature...
              </div>
            )}
          </div>
        </aside>

        {/* Right Side: Main Viewport */}
        <section className="flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 flex items-center justify-center min-h-0">
             <ChronoDisplay state={state} imageUrl={imageUrl} videoUrl={videoUrl} />
          </div>

          <div className="h-48 chrome-container p-6 rounded-xl flex items-center justify-center">
             {state === 'COMPLETE' ? (
               <StoryBranching chronoPaths={chronoPaths} onExport={() => {}} />
             ) : (
               <div className="text-chrono-cyan/40 font-mono text-xs animate-pulse">
                  SYSTEM MONITOR: IDLE... WAITING FOR DECODING SEQUENCE...
               </div>
             )}
          </div>
        </section>
      </div>

      {/* Error Overlays */}
      {error && (
        <div className="fixed inset-0 bg-red-900/20 backdrop-blur-md flex items-center justify-center z-[100]">
          <div className="bg-black border-2 border-red-500 p-8 rounded-xl max-w-md text-center">
            <h2 className="text-2xl font-black text-red-500 mb-4">CRITICAL SYSTEM ERROR</h2>
            <p className="text-red-400 mb-6">{error}</p>
            <button onClick={reset} className="px-8 py-3 bg-red-500 text-black font-bold rounded-lg hover:bg-red-400">
              REBOOT SYSTEM
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

