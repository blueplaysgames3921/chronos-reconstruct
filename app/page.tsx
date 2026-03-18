'use client';
import { useState, useEffect } from 'react';
import { useChronos } from '@/hooks/useChronos';
import { SecureTerminal } from '@/components/ui/SecureTerminal';
import { TerminalInput } from '@/components/ui/TerminalInput';
import { ArtifactScanner } from '@/components/ui/ArtifactScanner';
import { ChronoDisplay } from '@/components/ui/ChronoDisplay';
import { StoryBranching } from '@/components/StoryBranching';
import { HistorySidebar } from '@/components/ui/HistorySidebar';

const API_KEY_STORAGE_KEY = 'chronos_api_key';

export default function ChronosLab() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [keyChecked, setKeyChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    state,
    enhanceStatus,
    lore,
    imageUrl,
    videoUrl,
    chronoPaths,
    error,
    history,
    sourceImageUrl,
    reconstruct,
    enhance,
    exportCapsule,
    clearHistory,
    reset,
  } = useChronos();

  useEffect(() => {
    const stored = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (stored) setApiKey(stored);
    setKeyChecked(true);
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKey(null);
    reset();
  };

  if (!keyChecked) {
    return (
      <main className="h-screen w-screen flex items-center justify-center bg-void">
        <div className="w-3 h-3 bg-chrono-cyan rounded-full animate-ping" />
      </main>
    );
  }

  if (!apiKey) {
    return (
      <main className="min-h-screen w-screen flex items-center justify-center p-4 sm:p-6 bg-void overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.1)_0%,transparent_70%)] animate-pulse" />
        <SecureTerminal />
      </main>
    );
  }

  return (
    <main className="h-screen w-screen flex flex-col relative overflow-hidden bg-void font-mono">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-chrono-cyan/5 to-transparent skew-x-12 -translate-x-20 pointer-events-none" />

      <header className="h-14 md:h-20 border-b border-white/10 flex items-center justify-between px-4 md:px-12 bg-black/80 backdrop-blur-2xl relative z-30 flex-shrink-0">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="text-lg md:text-3xl font-black italic tracking-tighter text-white glitch-effect cursor-crosshair">
            CHRONOS<span className="text-chrono-purple">.ALPHA</span>
          </div>
          <div className="hidden lg:flex flex-col border-l border-white/20 pl-6">
            <span className="text-[10px] font-black uppercase text-chrono-cyan leading-none">Command / Temporal_Slash</span>
            <span className="text-[9px] text-white/40">LATENCY_SYNC: 0.002ms</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Protocol Status</div>
            <div className="text-xs md:text-sm font-black text-chrono-cyan digital-fire-text uppercase">{state}</div>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="relative p-2 md:p-3 border border-white/20 rounded-lg hover:border-chrono-cyan/60 transition-all text-white/60 hover:text-chrono-cyan"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {history.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-chrono-purple text-white text-[8px] font-black rounded-full flex items-center justify-center">
                {history.length > 9 ? '9+' : history.length}
              </span>
            )}
          </button>

          <button
            onClick={reset}
            className="p-2 md:p-3 border-2 border-chrono-purple/50 rounded-full hover:border-chrono-purple text-chrono-purple transition-all hover:shadow-[0_0_15px_#bc13fe]"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <button
            onClick={handleDisconnect}
            title="Disconnect"
            className="flex items-center gap-1.5 px-2.5 md:px-3 py-2 rounded-lg border border-history-red bg-history-red/10 hover:bg-history-red/20 hover:shadow-[0_0_12px_rgba(255,49,49,0.4)] transition-all text-history-red text-[10px] font-black uppercase tracking-wider"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden md:inline">Disconnect</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-10 p-4 md:p-10 overflow-y-auto md:overflow-hidden relative z-20 min-h-0">
        <aside className="w-full md:w-[420px] lg:w-[480px] flex flex-col gap-4 md:gap-8 flex-shrink-0 md:overflow-hidden">
          <div className="chrome-container p-5 md:p-10 rounded-3xl relative overflow-hidden group flex-shrink-0">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-chrono-cyan/10 rounded-full blur-3xl group-hover:bg-chrono-purple/20 transition-colors" />
            <h2 className="text-xs font-black text-white uppercase tracking-[0.5em] mb-5 md:mb-8 border-b border-white/10 pb-4 flex justify-between">
              <span>Input_Nexus</span>
              <span className="text-chrono-cyan">READY</span>
            </h2>
            <TerminalInput onSubmit={(url) => reconstruct(url, apiKey)} />
          </div>

          <div className="chrome-container rounded-3xl flex flex-col relative border-t-2 border-chrono-purple/50 h-48 md:flex-1 md:h-auto md:overflow-hidden">
            <div className="p-4 md:p-8 border-b border-white/10 bg-black/20 flex justify-between items-center flex-shrink-0">
              <h2 className="text-xs font-black text-white uppercase tracking-widest">Data_Stream</h2>
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-chrono-cyan animate-pulse" />
                <div className="w-1 h-4 bg-chrono-purple animate-pulse delay-75" />
                <div className="w-1 h-4 bg-history-red animate-pulse delay-150" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide min-h-0">
              {error ? (
                <div className="text-history-red font-bold animate-pulse text-sm">{error}</div>
              ) : lore ? (
                <ArtifactScanner lore={lore} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-40 py-4">
                  <div className="text-[10px] font-black text-chrono-cyan mb-4 tracking-[0.3em] uppercase">Deep Scan Required</div>
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-chrono-cyan to-transparent animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </aside>

        <section className="flex flex-col gap-4 md:gap-8 md:flex-1 md:overflow-hidden md:min-h-0">
          <div className="relative bg-black/40 rounded-[28px] md:rounded-[40px] border border-white/10 shadow-2xl overflow-hidden group h-56 sm:h-72 md:flex-1 md:h-auto flex-shrink-0">
            <div className="absolute inset-0 bg-void opacity-40 group-hover:opacity-20 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-[10%] left-[-10%] w-[120%] h-[2px] bg-chrono-cyan/20 -rotate-12 shadow-[0_0_15px_#00f2ff]" />
              <div className="absolute bottom-[10%] right-[-10%] w-[120%] h-[2px] bg-chrono-purple/20 -rotate-12 shadow-[0_0_15px_#bc13fe]" />
            </div>
            <div className="absolute inset-0 flex flex-col p-3 md:p-5">
              <ChronoDisplay
                state={state}
                imageUrl={imageUrl}
                videoUrl={videoUrl}
                enhanceStatus={enhanceStatus}
                onEnhance={() => enhance(apiKey)}
              />
            </div>
          </div>

          <div className="chrome-container p-4 md:p-8 rounded-3xl flex items-center justify-center relative overflow-hidden border-b-4 border-chrono-cyan/30 flex-shrink-0 min-h-[80px] md:h-44">
            {state === 'COMPLETE' ? (
              <StoryBranching
                chronoPaths={chronoPaths}
                onExport={exportCapsule}
                onReset={reset}
                onDiverge={() => reconstruct(sourceImageUrl, apiKey)}
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="text-[10px] font-black tracking-[0.5em] md:tracking-[1em] uppercase text-white/20">Timeline_Sync_Buffer</div>
                <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden" />
              </div>
            )}
          </div>
        </section>
      </div>

      <HistorySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        history={history}
        onClearHistory={clearHistory}
      />
    </main>
  );
}
