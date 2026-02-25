'use client';

import { motion } from 'framer-motion';

interface ApertureViewportProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const ApertureViewport = ({ isLoading, children }: ApertureViewportProps) => {
  const cornerVariants = {
    initial: { scale: 1, opacity: 0.5 },
    loading: { 
      scale: 1.1, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        repeat: Infinity, 
        repeatType: "reverse" as const // Corrected from yoyo
      } 
    },
  };

  return (
    <div className="relative w-full max-w-4xl p-8 border border-cyan-border rounded-lg bg-black/30 backdrop-blur-xl glass-morphism">
      {/* Corner Brackets */}
      <motion.div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-glow" variants={cornerVariants} initial="initial" animate={isLoading ? 'loading' : 'initial'} />
      <motion.div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-glow" variants={cornerVariants} initial="initial" animate={isLoading ? 'loading' : 'initial'} />
      <motion.div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-glow" variants={cornerVariants} initial="initial" animate={isLoading ? 'loading' : 'initial'} />
      <motion.div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-glow" variants={cornerVariants} initial="initial" animate={isLoading ? 'loading' : 'initial'} />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
