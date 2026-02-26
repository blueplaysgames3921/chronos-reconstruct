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
  const isVisible = state !== 'IDLE' && state !== 'ERROR';

  // Fallback: If media hasn't loaded in 5 seconds but we have a URL, show it anyway
  useEffect(() => {
    if (imageUrl || videoUrl) {
      setIsMediaReady(false);
      const timer = setTimeout(() => {
        setIsMediaReady(true); 
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [imageUrl, videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0 }}
      className="relative w-full max-w-5xl aspect-video rounded-2xl p-1 overflow-hidden chrome-container group shadow-2xl"
    >
      <div className="w-full h-full rounded-xl bg-black flex items-center justify-center relative overflow-hidden">
        
        {/* THE SCANNER OVERLAY - Fix: Only shows if we truly have no media ready */}
        {isVisible && !isMediaReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-void/90 backdrop-blur-xl">
            <div className="relative w-24 h-24 mb-6">
               <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" className="text-chrono-cyan/10" />
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="80 200" className="text-chrono-cyan" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-history-red rounded-full animate-ping" />
               </div>
            </div>
            <p className="text-xl font-black italic tracking-[0.4em] digital-fire-text uppercase">Syncing Reality</p>
            <span className="mt-2 text-[10px] text-chrono-cyan/40 font-mono">STABILIZING TEMPORAL DATA...</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {imageUrl && (
            <motion.div
              key={videoUrl || imageUrl}
              initial={{ opacity: 0, filter: 'blur(20px)' }}
              animate={isMediaReady ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full flex items-center justify-center"
            >
              {videoUrl ? (
                <video 
                  src={videoUrl} 
                  autoPlay loop muted playsInline
                  onCanPlay={() => setIsMediaReady(true)}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <img 
                  src={imageUrl} 
                  alt="Reconstructed Artifact" 
                  onLoad={() => setIsMediaReady(true)}
                  className="w-full h-full object-contain p-4 drop-shadow-[0_0_30px_rgba(0,242,255,0.4)]" 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Effects */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(188,19,254,0.3)_50%,transparent_75%)] animate-[nebula-drift_8s_linear_infinite]" />
        <div className="absolute inset-0 scanline-overlay opacity-20 pointer-events-none" />
      </div>
    </motion.div>
  );
};
