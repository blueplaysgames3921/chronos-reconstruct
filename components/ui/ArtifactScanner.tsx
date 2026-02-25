'use client';

import { motion, Variants } from 'framer-motion';

interface ArtifactScannerProps {
  lore: string;
}

export const ArtifactScanner = ({ lore }: ArtifactScannerProps) => {
  const words = lore ? lore.split(' ') : [];
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
    },
  };

  return (
    <motion.div
      className="w-full max-w-2xl p-4 border border-cyan-border rounded-lg text-cyan-glow bg-black/30 backdrop-blur-xl relative"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-2 right-4 text-xs text-cyan-glow/50">STATUS: RECONSTRUCTING</div>
      <div className="flex flex-wrap">
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} variants={child} className="mr-1.5">
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
