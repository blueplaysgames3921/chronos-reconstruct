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
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

  const isVisible = state !== 'IDLE' && state !== 'ERROR';

  useEffect(() => {
    if (state === 'SCANNING' || state === 'RECONSTRUCTING') {
      setIsMediaReady(false);
    }
  }, [state]);

  useEffect(() => {
    if (videoUrl) {
      setIsMediaReady(false);
    }
  }, [videoUrl]);

  useEffect(() => {
    if (enhanceStatus === 'SUCCESS') {
      setShowSuccessFlash(true);
      const t = setTimeout(() => setShowSuccessFlash(false), 2800);
      return () => clearTimeout(t);
    }
  }, [enhanceStatus]);

  const showVideoLoader = enhanceStatus === 'SEARCHING';

  const showLoader =
    showVideoLoader ||
    state === 'SCANNING' ||
    state === 'RECONSTRUCTING' ||
    (imageUrl !== null && !isMediaReady && state !== 'IDLE' && state !== 'ERROR');

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <div className="w-full h-full bg-black/90 flex items-center justify-center relative overflow-hidden">
            <AnimatePresence>
              {showLoader && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-void/90 backdrop-blur-xl"
                >
                  <div className="relative w-16 h-16 md:w-28 md:h-28 mb-4 md:mb-8 flex items-center justify-center">
                    <div className="absolute w-3 h-3 md:w-4 md:h-4 bg-history-red rounded-full animate-ping z-50" />
                    <div className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-history-red rounded-full z-50" />
                    <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" className="text-chrono-cyan/20" />
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="80 200" className="text-chrono-cyan" />
                    </svg>
                  </div>
                  <p className="text-sm md:text-2xl font-black italic tracking-[0.25em] md:tracking-[0.5em] digital-fire-text uppercase px-4 text-center">
                    {showVideoLoader ? 'RETRIEVING TEMPORAL PULSE' : 'RE-SYNCING REALITY'}
                  </p>
                  <div className="flex items-center gap-3 md:gap-4 mt-3 md:mt-4">
                    <span className="w-6 md:w-12 h-[1px] bg-chrono-cyan/30" />
                    <p className="text-[9px] md:text-[10px] font-mono text-chrono-cyan tracking-[0.15em] md:tracking-[0.3em] uppercase">
                      {showVideoLoader
                        ? 'QUANTUM CORRIDOR OPEN'
                        : state === 'SCANNING'
                        ? 'TEMPORAL UPLINK'
                        : 'MOLECULAR RECONSTRUCTION'}
                    </p>
                    <span className="w-6 md:w-12 h-[1px] bg-chrono-cyan/30" />
                  </div>
                  {showVideoLoader && (
                    <p className="mt-3 text-[9px] text-white/30 font-mono uppercase tracking-widest px-6 text-center max-w-[260px]">
                      Fragment retrieval may take several minutes — corridor integrity fluctuating
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showSuccessFlash && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                >
                  <div className="px-4 md:px-6 py-2 md:py-3 border border-chrono-cyan/50 rounded-xl bg-black/80 backdrop-blur-sm text-center shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                    <p className="text-[10px] md:text-xs font-black uppercase italic tracking-[0.25em] text-chrono-cyan">
                      Temporal Pulse Anchored
                    </p>
                    <p className="text-[8px] md:text-[9px] text-chrono-cyan/50 font-mono mt-0.5 uppercase tracking-widest">
                      Timeline fragment recovered
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {imageUrl && (
                <motion.div
                  key={videoUrl ?? imageUrl}
                  initial={{ filter: 'blur(20px)', opacity: 0 }}
                  animate={isMediaReady ? { filter: 'blur(0px)', opacity: 1 } : { filter: 'blur(20px)', opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {videoUrl ? (
                    <video
                      key={videoUrl}
                      src={videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadedData={() => setIsMediaReady(true)}
                      onError={() => setIsMediaReady(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={imageUrl}
                      alt="Reconstructed Artifact"
                      onLoad={() => setIsMediaReady(true)}
                      onError={() => setIsMediaReady(true)}
                      className="w-full h-full object-contain p-3 md:p-6 drop-shadow-[0_0_40px_rgba(0,242,255,0.4)]"
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {state === 'COMPLETE' && !videoUrl && enhanceStatus !== 'SEARCHING' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 md:mt-3 w-full flex-shrink-0"
        >
          <div className="border border-chrono-purple/50 rounded-xl p-3 md:p-4 bg-chrono-purple/5 backdrop-blur-sm shadow-[0_0_20px_rgba(188,19,254,0.08)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-history-red animate-pulse flex-shrink-0" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-history-red">
                    Temporal_Flux_Warning
                  </span>
                </div>
                <p className={`text-[10px] md:text-[11px] font-mono leading-relaxed ${
                  enhanceStatus === 'FAILED' ? 'text-history-red/80' : 'text-white/70'
                }`}>
                  {enhanceStatus === 'FAILED'
                    ? 'Quantum corridor collapsed — temporal fragments unrecoverable. The timeline resists reconstruction. Re-entry may be attempted.'
                    : 'Fragment retrieval operates across unstable quantum corridors. Enhancement is experimental — timeline integrity governs success.'}
                </p>
              </div>

              <button
                onClick={onEnhance}
                className={`flex-shrink-0 w-full sm:w-auto px-4 md:px-6 py-2.5 md:py-3 border-2 font-black uppercase italic tracking-[0.1em] md:tracking-[0.15em] rounded-xl text-[10px] md:text-xs transition-all duration-200 ${
                  enhanceStatus === 'FAILED'
                    ? 'border-history-red text-history-red bg-history-red/10 shadow-[0_0_15px_rgba(255,49,49,0.2)] hover:shadow-[0_0_25px_rgba(255,49,49,0.4)] hover:bg-history-red/20'
                    : 'border-chrono-purple text-chrono-purple bg-chrono-purple/10 shadow-[0_0_15px_rgba(188,19,254,0.2)] hover:bg-chrono-purple/20 hover:shadow-[0_0_25px_rgba(188,19,254,0.4)]'
                }`}
              >
                {enhanceStatus === 'FAILED' ? 'Reattempt Retrieval' : 'Initiate Temporal Pulse'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};


