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
  const [retryKey, setRetryKey] = useState(0);
  
  const isVisible = state !== 'IDLE' && state !== 'ERROR';

  useEffect(() => {
    if (imageUrl || videoUrl) {
      setIsMediaReady(false);
    }
  }, [imageUrl, videoUrl, retryKey]);

  const handleMediaError = () => {
    if (retryKey < 3) {
      setTimeout(() => setRetryKey(prev => prev + 1), 5000);
    } else {
      setIsMediaReady(true); 
    }
  };

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
                <div className="relative w-32 h-32 mb-8">
                   <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" className="text-chrono-cyan/20" />
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="100 200" className="text-chrono-cyan shadow-[0_0_15px_#00f2ff]" />
                   </svg>
                </div>
                <p className="text-2xl font-black italic tracking-[0.5em] digital-fire-text">RE-SYNCING REALITY</p>
                <p className="text-[10px] font-mono text-chrono-cyan/40 mt-4 uppercase tracking-[0.2em]">
                    PHASE: {state === 'SCANNING' ? 'TEMPORAL UPLINK' : 'MOLECULAR RECONSTRUCTION'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {imageUrl && (
              <motion.div
                key={`${videoUrl || imageUrl}-${retryKey}`}
                initial={{ filter: 'blur(40px) brightness(0)', scale: 1.1 }}
                animate={isMediaReady ? { filter: 'blur(0px) brightness(1)', scale: 1 } : { filter: 'blur(40px) brightness(0)', scale: 1.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full flex items-center justify-center"
              >
                {videoUrl ? (
                  <video
                    src={`${videoUrl}&cache=${retryKey}`}
                    autoPlay loop muted playsInline
                    onLoadedData={() => setIsMediaReady(true)}
                    onError={handleMediaError}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={`${imageUrl}&cache=${retryKey}`}
                    alt="Artifact"
                    onLoad={() => setIsMediaReady(true)}
                    onError={handleMediaError}
                    className="w-full h-full object-contain p-4 drop-shadow-[0_0_30px_rgba(0,242,255,0.5)]"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ENHANCE BUTTON UI */}
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
            "This process requires massive computational resonance. Total reconstruction is not guaranteed—deep archive fragments may be lost to time."
          </p>
        </motion.div>
      )}
    </div>
  );
};

