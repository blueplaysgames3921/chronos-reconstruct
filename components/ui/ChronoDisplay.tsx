
'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface ChronoDisplayProps {
  imageUrl: string | null;
  videoUrl: string | null;
  state: 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'ANIMATING' | 'COMPLETE' | 'ERROR';
}

export const ChronoDisplay = ({ imageUrl, videoUrl, state }: ChronoDisplayProps) => {
  const isVisible = state === 'RECONSTRUCTING' || state === 'ANIMATING' || state === 'COMPLETE';

  return (
    <div className="w-full max-w-4xl h-96 flex items-center justify-center border-2 border-cyan-500/30 rounded-lg p-4 bg-black bg-opacity-20">
      <AnimatePresence>
        {isVisible && imageUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full"
          >
            {state === 'COMPLETE' && videoUrl ? (
              <video src={videoUrl} autoPlay loop muted className="w-full h-full object-contain" />
            ) : (
              <img src={imageUrl} alt="Reconstructed Artifact" className="w-full h-full object-contain" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!isVisible && (
        <div className="text-center text-cyan-500/50">
          <p>Awaiting Artifact...</p>
        </div>
      )}
    </div>
  );
};
