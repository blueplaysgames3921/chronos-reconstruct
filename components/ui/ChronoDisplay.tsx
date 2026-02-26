'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ChronoDisplayProps {
  imageUrl: string | null;
  videoUrl: string | null;
  state: string;
}

export const ChronoDisplay = ({ imageUrl, videoUrl, state }: ChronoDisplayProps) => {
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const isVisible = state !== 'IDLE' && state !== 'ERROR';

  useEffect(() => {
    if (imageUrl || videoUrl) setIsMediaLoading(true);
  }, [imageUrl, videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      className="relative w-full max-w-5xl aspect-video rounded-2xl p-1 overflow-hidden chrome-container"
    >
      <div className="w-full h-full rounded-xl bg-black flex items-center justify-center relative overflow-hidden">
        
        {/* Spinner for UI transitions and Image loading */}
        {(state === 'SCANNING' || (imageUrl && isMediaLoading)) && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-void/60 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-chrono-cyan/20 border-t-chrono-cyan rounded-full animate-spin" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {imageUrl && (
            <motion.div
              key={videoUrl || imageUrl}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center"
            >
              {videoUrl ? (
                <video 
                  src={videoUrl} 
                  autoPlay loop muted playsInline 
                  onLoadedData={() => setIsMediaLoading(false)}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <img 
                  src={imageUrl} 
                  alt="Restored Artifact" 
                  onLoad={() => setIsMediaLoading(false)}
                  className="w-full h-full object-contain p-6" 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
