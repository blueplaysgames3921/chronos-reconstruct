
'use client';

import { motion, Variants } from 'framer-motion';

interface ArtifactScannerProps {
  lore: string;
}

export const ArtifactScanner = ({ lore }: ArtifactScannerProps) => {
  const words = lore.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
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
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-2xl p-4 border border-amber-500 rounded-lg text-amber-500"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} style={{ marginRight: '5px' }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
