'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';

interface ChronoDisplayProps {
  imageUrl: string | null;
  videoUrl: string | null;
  state: 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';
}

export const ChronoDisplay = ({ imageUrl, videoUrl, state }: ChronoDisplayProps) => {
  const isVisible = state !== 'IDLE' && state !== 'ERROR';

  const chromeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, rotateX: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={chromeVariants}
      className="relative w-full max-w-5xl aspect-video rounded-2xl p-1 overflow-hidden chrome-container"
    >
      {/* Chrome Corner Accents */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/40 z-20" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/40 z-20" />

      <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center relative overflow-hidden">
        {state === 'SCANNING' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-24 h-24 time-bubble border-2 border-chrono-cyan flex items-center justify-center">
               <div className="w-16 h-16 border-t-2 border-chrono-cyan rounded-full animate-spin" />
            </div>
            <p className="text-xl font-bold tracking-[0.3em] animate-pulse">INITIATING TEMPORAL SYNC</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {imageUrl && (
            <motion.div
              key={videoUrl || imageUrl}
              initial={{ filter: 'blur(20px) brightness(0)', opacity: 0 }}
              animate={{ filter: 'blur(0px) brightness(1)', opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center"
            >
              {videoUrl ? (
                <video src={videoUrl} autoPlay loop muted className="w-full h-full object-cover" />
              ) : (
                <img src={imageUrl} alt="Artifact" className="w-full h-full object-contain p-4" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cinematic Flare Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-chrono-cyan/5 via-transparent to-white/5" />
      </div>
    </motion.div>
  );
};
