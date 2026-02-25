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
      <main className="h-screen w-screen flex items-center justify-center p-6 bg-void overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] animate-pulse" />
        <SecureTerminal onApiKeySet={setApiKey} />
      </main>
    );
  }

  return (
    <main className="h-screen w-screen flex flex-col relative overflow-hidden bg-void font-mono">
      {/* Rainbow Burst Effecter (Slash Layer) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-chrono-cyan/5 to-transparent skew-x-12 -translate-x-20 pointer-events-none" />
      
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-12 bg-black/80 backdrop-blur-2xl relative z-30">
        <div className="flex items-center gap-8">
          <div className="text-3xl font-black italic tracking-tighter text-white glitch-effect cursor-crosshair">
            CHRONOS<span className="text-chrono-purple">.ALPHA</span>
          </div>
          <div className="hidden md:flex flex-col border-l border-white/20 pl-6">
            <span className="text-[10px] font-black uppercase text-chrono-cyan leading-none">Command / Temporal_Slash</span>
            <span className="text-[9px] text-white/40">LATENCY_SYNC: 0.002ms</span>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
           <div className="text-right">
              <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Protocol Status</div>
              <div className="text-sm font-black text-chrono-cyan digital-fire-text uppercase">{state}</div>
           </div>
           <button onClick={reset} className="p-3 border-2 border-chrono-purple/30 rounded-full hover:border-chrono-purple transition-all hover:shadow-[0_0_15px_#bc13fe]">
              <svg className="w-5 h-5 text-chrono-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
           </button>
        </div>
      </header>

      <div className="flex-1 p-10 flex gap-10 overflow-hidden relative z-20">
        <aside className="w-[480px] flex flex-col gap-8">
          <div className="chrome-container p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-chrono-cyan/10 rounded-full blur-3xl group-hover:bg-chrono-purple/20 transition-colors" />
            <h2 className="text-xs font-black text-white uppercase tracking-[0.5em] mb-8 border-b border-white/10 pb-4 flex justify-between">
              <span>Input_Nexus</span>
              <span className="text-chrono-cyan">READY</span>
            </h2>
            <TerminalInput onSubmit={(url) => reconstruct(url, apiKey)} />
          </div>
          
          <div className="chrome-container rounded-3xl flex-1 overflow-hidden flex flex-col relative border-t-2 border-chrono-purple/50">
            <div className="p-8 border-b border-white/10 bg-black/20 flex justify-between items-center">
              <h2 className="text-xs font-black text-white uppercase tracking-widest">Data_Stream</h2>
              <div className="flex gap-1">
                 <div className="w-1 h-4 bg-chrono-cyan animate-pulse" />
                 <div className="w-1 h-4 bg-chrono-purple animate-pulse delay-75" />
                 <div className="w-1 h-4 bg-history-red animate-pulse delay-150" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
              {lore ? <ArtifactScanner lore={lore} /> : (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                  <div className="text-[10px] font-black text-chrono-cyan mb-4 tracking-[0.3em] uppercase">Deep Scan Required</div>
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-chrono-cyan to-transparent animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-10">
          <div className="flex-1 flex items-center justify-center relative bg-black/40 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden group">
             <div className="absolute inset-0 bg-void opacity-40 group-hover:opacity-20 transition-opacity" />
             {/* Holographic Slashes */}
             <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[120%] h-[2px] bg-chrono-cyan/20 -rotate-12 shadow-[0_0_15px_#00f2ff]" />
                <div className="absolute bottom-[10%] right-[-10%] w-[120%] h-[2px] bg-chrono-purple/20 -rotate-12 shadow-[0_0_15px_#bc13fe]" />
             </div>
             
             <ChronoDisplay state={state} imageUrl={imageUrl} videoUrl={videoUrl} />
          </div>

          <div className="h-44 chrome-container p-8 rounded-3xl flex items-center justify-center relative overflow-hidden border-b-4 border-chrono-cyan/30">
             {state === 'COMPLETE' ? (
               <StoryBranching chronoPaths={chronoPaths} onExport={() => {}} />
             ) : (
               <div className="flex flex-col items-center gap-2">
                  <div className="text-[10px] font-black tracking-[1em] uppercase text-white/20">Timeline_Sync_Buffer</div>
                  <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        animate={{ x: ['-100%', '100%'] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-gradient-to-r from-chrono-cyan via-chrono-purple to-chrono-cyan" 
                     />
                  </div>
               </div>
             )}
          </div>
        </section>
      </div>
    </main>
  );
}

