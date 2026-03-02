'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ChronoDisplayProps {
  imageUrl: string | null;
  videoUrl: string | null;
  state: 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'COMPLETE' | 'ERROR';
  enhanceStatus: 'IDLE' | 'SEARCHING' | 'SUCCESS' | 'FAILED';
  onEnhance: () => void;
}

export const ChronoDisplay = ({ imageUrl, videoUrl, state, enhanceStatus, onEnhance }: ChronoDisplayProps) => {
  const [isMediaReady, setIsMediaReady] = useState(false);
  
  const isVisible = state !== 'IDLE' && state !== 'ERROR';

  // Reset ready state when a new generation starts
  useEffect(() => {
    if (state === 'SCANNING' || state === 'RECONSTRUCTING') {
      setIsMediaReady(false);
    }
  }, [state]);

  const showLoader = (state === 'SCANNING' || state === 'RECONSTRUCTING') || (imageUrl && !isMediaReady);

  return (
    <div className="flex flex-col items-center w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        className="relative w-full max-w-5xl aspect-video rounded-2xl p-1 overflow-hidden chrome-container group bg-black"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-chrono-purple pointer-events-none mix-blend-overlay transition-opacity" />

        <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center relative overflow-hidden">
          
          <AnimatePresence>
            {showLoader && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-void/80 backdrop-blur-md"
              >
                <div className="relative w-24 h-24 mb-6">
                   <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" className="text-chrono-cyan/10" />
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="140 200" className="text-chrono-cyan" />
                   </svg>
                </div>
                <p className="text-xl font-black italic tracking-[0.4em] text-white">RE-SYNCING REALITY</p>
                <p className="text-[10px] font-mono text-chrono-cyan/60 mt-2 uppercase tracking-[0.2em]">
                    PHASE: {state === 'SCANNING' ? 'TEMPORAL UPLINK' : 'MOLECULAR RECONSTRUCTION'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {imageUrl && (
              <motion.div
                key={videoUrl || imageUrl}
                initial={{ opacity: 0 }}
                animate={isMediaReady ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center"
              >
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    autoPlay loop muted playsInline
                    onLoadedData={() => setIsMediaReady(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt="Artifact"
                    onLoad={() => setIsMediaReady(true)}
                    className="w-full h-full object-contain p-4 drop-shadow-[0_0_20px_rgba(0,242,255,0.3)]"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {state === 'COMPLETE' && !videoUrl && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col items-center max-w-md text-center"
        >
          <button
            onClick={onEnhance}
            disabled={enhanceStatus === 'SEARCHING'}
            className={`group relative px-8 py-3 bg-black border-2 transition-all duration-300 ${enhanceStatus === 'FAILED' ? 'border-history-red text-history-red' : 'border-chrono-cyan text-chrono-cyan hover:bg-chrono-cyan hover:text-black hover:shadow-[0_0_20px_#00f2ff]'}`}
          >
            <span className="font-black italic tracking-widest uppercase">
              {enhanceStatus === 'SEARCHING' ? 'SEARCHING DEEP ARCHIVES...' : enhanceStatus === 'FAILED' ? 'ARCHIVE CORRUPTED - RETRY?' : 'INITIATE TEMPORAL ENHANCEMENT'}
            </span>
          </button>
          <p className="mt-3 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] leading-relaxed">
            "Direct video synthesis may take up to 300 seconds. Connection stability not guaranteed."
          </p>
        </motion.div>
      )}
    </div>
  );
};
