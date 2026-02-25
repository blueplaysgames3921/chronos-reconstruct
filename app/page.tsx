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
      <main className="h-screen w-screen flex items-center justify-center p-6 bg-[#02040a]">
        {/* Added a subtle vignette overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
        <SecureTerminal onApiKeySet={setApiKey} />
      </main>
    );
  }

  return (
    <main className="h-screen w-screen flex flex-col bg-[#02040a] relative overflow-hidden text-chrono-cyan">
      {/* Decorative Technical HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-40 h-1 bg-chrono-cyan/20" />
        <div className="absolute top-20 left-10 w-1 h-40 bg-chrono-cyan/20" />
        <div className="absolute bottom-20 right-10 w-40 h-1 bg-chrono-cyan/20" />
        <div className="absolute bottom-20 right-10 w-1 h-40 bg-chrono-cyan/20" />
      </div>

      <header className="h-16 border-b border-white/10 flex items-center justify-between px-10 bg-black/60 backdrop-blur-xl relative z-20">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-black italic tracking-tighter text-white">
            CHRONOS<span className="text-chrono-cyan">_OS</span>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-white/40 leading-none">Temporal Laboratory</span>
            <span className="text-[9px] font-mono text-chrono-cyan/60">NODE_ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-white/40 uppercase">System Status</span>
              <span className="text-xs font-bold text-chrono-cyan animate-pulse">{state}</span>
           </div>
           <button onClick={() => window.location.reload()} className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all text-white/50 hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.967 8.967 0 01-18 0z" /></svg>
           </button>
        </div>
      </header>

      <div className="flex-1 p-8 flex gap-8 overflow-hidden relative z-10">
        {/* Primary Data Column */}
        <aside className="w-[450px] flex flex-col gap-6">
          <div className="bg-black/40 border border-white/10 p-8 rounded-2xl backdrop-blur-xl flex-shrink-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-[8px] font-bold text-white/10">01_INPUT_MODULE</div>
            <h2 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-l-2 border-chrono-cyan pl-3">Temporal Signature</h2>
            <TerminalInput onSubmit={(url) => reconstruct(url, apiKey)} />
          </div>
          
          <div className="bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl flex-1 overflow-hidden flex flex-col relative">
            <div className="absolute top-0 right-0 p-2 text-[8px] font-bold text-white/10">02_RESTORED_LORE</div>
            <div className="p-8 border-b border-white/10">
              <h2 className="text-xs font-black text-white uppercase tracking-widest border-l-2 border-chrono-cyan pl-3">Chronicle Output</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-8 scrollbar-hide bg-gradient-to-b from-transparent to-chrono-cyan/5">
              {lore ? <ArtifactScanner lore={lore} /> : (
                <div className="h-full flex flex-col items-center justify-center opacity-20 gap-4">
                  <div className="w-12 h-12 border border-chrono-cyan/40 rounded-full animate-ping" />
                  <p className="font-mono text-[10px] tracking-widest">AWAITING SEQUENCE...</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Cinematic Viewport Column */}
        <section className="flex-1 flex flex-col gap-8">
          <div className="flex-1 flex items-center justify-center relative bg-black/20 rounded-3xl border border-white/5 overflow-hidden">
             {/* Visual "Targeting" corner marks inside the viewport */}
             <div className="absolute top-6 left-6 w-10 h-10 border-t border-l border-white/20" />
             <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-white/20" />
             <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-white/20" />
             <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-white/20" />
             
             <ChronoDisplay state={state} imageUrl={imageUrl} videoUrl={videoUrl} />
          </div>

          <div className="h-40 bg-black/40 border border-white/10 p-8 rounded-2xl backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5" />
             {state === 'COMPLETE' ? (
               <StoryBranching chronoPaths={chronoPaths} onExport={() => {}} />
             ) : (
               <div className="flex gap-4 items-center">
                  <div className="w-2 h-2 rounded-full bg-chrono-cyan animate-bounce" />
                  <div className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">Timeline Sync Module Idle</div>
               </div>
             )}
          </div>
        </section>
      </div>
    </main>
  );
}
