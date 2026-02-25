
'use client';

import { motion } from 'framer-motion';

export const Scanline = () => {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-1 bg-cyan-glow/50 animate-scanline"
      style={{ originY: 0 }}
    />
  );
};
