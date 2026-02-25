'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';

interface ChronoDisplayProps {
  imageUrl: string | null;
  videoUrl: string | null;
  state: 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';
}

export const ChronoDisplay = ({ imageUrl, videoUrl, state }: ChronoDisplayProps) => {
  const isVisible = state === 'RECONSTRUCTING' || state === 'ANIMATING' || state === 'COMPLETE';

  const contentVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 20,
        filter: 'blur(10px)',
        scale: 1.1
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { 
          duration: 0.8, 
          ease: [0.6, -0.05, 0.01, 0.99] as any // Explicit cast to bypass strict Easing check
      },
    },
    exit: {
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        scale: 0.9
    }
  };

  return (
    <div className="w-full max-w-4xl h-96 flex items-center justify-center border border-cyan-border rounded-lg p-4 bg-black/30 backdrop-blur-xl">
      <AnimatePresence mode="wait">
        {isVisible && imageUrl && (
          <motion.div
            key={state === 'COMPLETE' ? 'video' : 'image'}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
            className="w-full h-full"
          >
            {state === 'COMPLETE' && videoUrl ? (
              <video 
                src={videoUrl} 
                autoPlay 
                loop 
                muted 
                className="w-full h-full object-contain" 
              />
            ) : (
              <img 
                src={imageUrl} 
                alt="Reconstructed Artifact" 
                className="w-full h-full object-contain"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!isVisible && (
        <div className="text-center text-cyan-glow/50">
          <p>Awaiting Artifact...</p>
        </div>
      )}
    </div>
  );
};
