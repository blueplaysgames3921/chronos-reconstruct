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

  useEffect(() => {
    if (state === 'SCANNING' || state === 'RECONSTRUCTING') {
      setIsMediaReady(false);
    }
  }, [state]);

  const showLoader =
    state === 'SCANNING' ||
    state === 'RECONSTRUCTING' ||
    (imageUrl !== null && !isMediaReady && state !== 'IDLE' && state !== 'ERROR');

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-0 py-2 md:py-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        className="relative w-full max-w-5xl aspect-video rounded-2xl p-px overflow-hidden chrome-container group bg-black"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-chrono-purple pointer-events-none mix-blend-overlay transition-opacity" />

        <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center relative overflow-hidden">
          <AnimatePresence>
            {showLoader && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-void/90 backdrop-blur-xl"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8 flex items-center justify-center">
                  <div className="absolute w-4 h-4 bg-history-red rounded-full animate-ping z-50" />
                  <div className="absolute w-2 h-2 bg-history-red rounded-full z-50" />
                  <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" className="text-chrono-cyan/20" />
                    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="80 200" className="text-chrono-cyan shadow-[0_0_15px_#00f2ff]" />
                  </svg>
                </div>
                <p className="text-base md:text-2xl font-black italic tracking-[0.4em] md:tracking-[0.5em] digital-fire-text uppercase">
                  RE-SYNCING REALITY
                </p>
                <div className="flex items-center gap-3 md:gap-4 mt-4">
                  <span className="w-8 md:w-12 h-[1px] bg-chrono-cyan/30" />
                  <p className="text-[9px] md:text-[10px] font-mono text-chrono-cyan tracking-[0.2em] md:tracking-[0.3em] uppercase">
                    {state === 'SCANNING' ? 'TEMPORAL UPLINK' : 'MOLECULAR RECONSTRUCTION'}
                  </p>
                  <span className="w-8 md:w-12 h-[1px] bg-chrono-cyan/30" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {imageUrl && (
              <motion.div
                key={videoUrl || imageUrl}
                initial={{ filter: 'blur(20px)', opacity: 0 }}
                animate={isMediaReady ? { filter: 'blur(0px)', opacity: 1 } : { filter: 'blur(20px)', opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full flex items-center justify-center"
              >
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setIsMediaReady(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt="Reconstructed Artifact"
                    onLoad={() => setIsMediaReady(true)}
                    className="w-full h-full object-contain p-4 md:p-6 drop-shadow-[0_0_40px_rgba(0,242,255,0.4)]"
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
          transition={{ delay: 0.3 }}
          className="mt-3 md:mt-5 w-full max-w-5xl"
        >
          <div className="border border-chrono-purple/15 rounded-xl md:rounded-2xl p-3 md:p-5 bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-history-red animate-pulse flex-shrink-0" />
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em] text-history-red/70">
                    Temporal_Flux_Warning
                  </span>
                </div>
                <p className="text-[9px] md:text-[10px] text-white/25 font-mono leading-relaxed">
                  Fragment retrieval operates across unstable quantum corridors. Temporal pulse enhancement is experimental — success rates fluctuate with timeline integrity. Proceed at your own risk.
                </p>
              </div>

              <button
                onClick={onEnhance}
                disabled={enhanceStatus === 'SEARCHING'}
                className={`flex-shrink-0 w-full sm:w-auto px-5 md:px-6 py-2.5 md:py-3 border-2 font-black uppercase italic tracking-[0.1em] md:tracking-[0.15em] rounded-xl text-[10px] md:text-xs transition-all duration-300 ${
                  enhanceStatus === 'FAILED'
                    ? 'border-history-red/40 text-history-red/60 hover:border-history-red/70 hover:text-history-red/90 cursor-pointer'
                    : enhanceStatus === 'SEARCHING'
                    ? 'border-chrono-cyan/20 text-chrono-cyan/30 cursor-not-allowed'
                    : 'border-chrono-purple/40 text-chrono-purple/80 hover:border-chrono-purple hover:text-chrono-purple hover:shadow-[0_0_20px_rgba(188,19,254,0.25)] cursor-pointer'
                }`}
              >
                {enhanceStatus === 'SEARCHING'
                  ? 'FLUX SCAN ACTIVE...'
                  : enhanceStatus === 'FAILED'
                  ? 'REATTEMPT RETRIEVAL'
                  : 'INITIATE TEMPORAL PULSE'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

