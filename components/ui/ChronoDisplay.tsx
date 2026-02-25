
'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface ChronoDisplayProps {
  imageUrl: string | null;
  videoUrl: string | null;
  state: 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';
}

export const ChronoDisplay = ({ imageUrl, videoUrl, state }: ChronoDisplayProps) => {
  const isVisible = state === 'RECONSTRUCTING' || state === 'ANIMATING' || state === 'COMPLETE';

  const contentVariants = {
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
          ease: [0.6, -0.05, 0.01, 0.99]
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
      <AnimatePresence>
        {isVisible && imageUrl && (
          <motion.div
            key="chrono-display"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            className="w-full h-full"
          >
            {state === 'COMPLETE' && videoUrl ? (
              <motion.video 
                src={videoUrl} 
                autoPlay 
                loop 
                muted 
                className="w-full h-full object-contain" 
                variants={contentVariants}
              />
            ) : (
              <motion.img 
                src={imageUrl} 
                alt="Reconstructed Artifact" 
                className="w-full h-full object-contain"
                variants={contentVariants}
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
