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
      transition: { staggerChildren: 0.025, delayChildren: 0.04 },
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
      className="w-full p-4 border border-chrono-cyan/20 rounded-lg text-chrono-cyan bg-black/30 backdrop-blur-xl relative"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-2 right-3 text-[8px] text-chrono-cyan/40 font-mono uppercase tracking-widest">
        STATUS: RECONSTRUCTING
      </div>
      <div className="flex flex-wrap mt-4 gap-y-0.5">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={child}
            className="mr-1.5 text-xs md:text-sm leading-relaxed"
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};
