'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ChronoDisplayProps {
  imageUrl: string | null;
  videoUrl: string | null;
  state: 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';
}

export const ChronoDisplay = ({ imageUrl, videoUrl, state }: ChronoDisplayProps) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const isVisible = state !== 'IDLE' && state !== 'ERROR';

  // Reset video ready state when image changes
  useEffect(() => {
    setIsVideoReady(false);
  }, [imageUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0 }}
      className="relative w-full max-w-5xl aspect-video rounded-2xl p-1 overflow-hidden chrome-container group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-chrono-purple pointer-events-none mix-blend-overlay transition-opacity" />

      <div className="w-full h-full rounded-xl bg-black/90 flex items-center justify-center relative overflow-hidden">

        {state === 'SCANNING' && (
          <div className="relative flex flex-col items-center gap-6">
            <div className="absolute inset-0 w-64 h-64 bg-chrono-cyan/10 blur-[80px] animate-pulse" />
            <div className="relative w-32 h-32">
               <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" className="text-chrono-cyan/20" />
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="100 200" className="text-chrono-cyan shadow-[0_0_15px_#00f2ff]" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-history-red rounded-full animate-ping" />
               </div>
            </div>
            <p className="text-2xl font-black italic tracking-[0.5em] digital-fire-text">RE-SYNCING REALITY</p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {imageUrl && (
            <motion.div
              key="media-container"
              layoutId="main-artifact-frame"
              initial={{ filter: 'blur(40px) brightness(0)', scale: 1.1 }}
              animate={{ filter: 'blur(0px) brightness(1)', scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center rainbow-blast"
            >
              {videoUrl && (
                <video 
                  src={videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  onCanPlay={() => setIsVideoReady(true)}
                  className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-1000 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`} 
                />
              )}
              
              <img 
                src={imageUrl} 
                alt="Artifact" 
                className="w-full h-full object-contain p-4 drop-shadow-[0_0_30px_rgba(0,242,255,0.5)] z-10" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(188,19,254,0.4)_50%,transparent_75%)] bg-[length:200%_200%] animate-[nebula-drift_5s_linear_infinite]" />
      </div>
    </motion.div>
  );
};
