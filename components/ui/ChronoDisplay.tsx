'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ChronoDisplayProps {
  imageUrl: string | null;
  videoUrl: string | null;
  state: 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';
}

export const ChronoDisplay = ({ imageUrl, videoUrl, state }: ChronoDisplayProps) => {
  const [isMediaReady, setIsMediaReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  
  const isVisible = state !== 'IDLE' && state !== 'ERROR';

  // Whenever a new URL comes in (Image then Video), reset readiness
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

  // The loader only disappears when isMediaReady is true, regardless of the state string.
  const showLoader = isVisible && !isMediaReady;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0 }}
      className="relative w-full max-w-5xl aspect-video rounded-2xl p-1 overflow-hidden chrome-container group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-chrono-purple pointer-events-none mix-blend-overlay transition-opacity" />

      <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center relative overflow-hidden">
        
        {/* Loading Overlay */}
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
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-history-red rounded-full animate-ping" />
                 </div>
              </div>
              <p className="text-2xl font-black italic tracking-[0.5em] digital-fire-text">RE-SYNCING REALITY</p>
              <p className="text-[10px] font-mono text-chrono-cyan/40 mt-4 uppercase tracking-[0.2em]">
                  Status: {state} {retryKey > 0 ? `(Attempt ${retryKey})` : ''}
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
              className="w-full h-full flex items-center justify-center rainbow-blast"
            >
              {videoUrl ? (
                <video
                  src={`${videoUrl}&cache=${retryKey}`}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
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

        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(188,19,254,0.4)_50%,transparent_75%)] bg-[length:200%_200%] animate-[nebula-drift_5s_linear_infinite]" />
      </div>
    </motion.div>
  );
};
