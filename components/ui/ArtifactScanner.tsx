'use client';

import { motion } from 'framer-motion';

export function ArtifactScanner({ lore }: { lore: string }) {
  return (
    <div className="w-full max-w-2xl mx-auto border border-amber-500 rounded-md p-4">
      <h2 className="text-amber-500 text-lg font-bold mb-4">Scanning Artifact...</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.02 }}
        className="whitespace-pre-wrap"
      >
        {lore.split('').map((char, index) => (
          <motion.span key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
