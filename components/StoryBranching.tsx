
'use client';

import { motion } from 'framer-motion';

interface StoryBranchingProps {
  chronoPaths: string[];
  onExport: () => void;
}

export const StoryBranching = ({ chronoPaths, onExport }: StoryBranchingProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 border border-cyan-border rounded-lg bg-black/30 backdrop-blur-xl">
      <h3 className="text-xl font-bold text-center text-cyan-glow mb-4">TIMELINE ANALYSIS COMPLETE</h3>
      <p className="text-center text-sm text-cyan-glow/70 mb-6">Select a branch to explore its potential future.</p>
      <div className="flex flex-col gap-4">
        {chronoPaths.map((path, index) => (
          <motion.button 
            key={index} 
            className="px-4 py-3 bg-cyan-glow/10 border border-cyan-border text-cyan-glow font-bold rounded-md hover:bg-cyan-glow/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {path}
          </motion.button>
        ))}
         <motion.button 
          onClick={onExport} 
          className="mt-4 px-4 py-3 bg-cyan-glow/20 text-cyan-glow font-bold rounded-md hover:bg-cyan-glow/40 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
         >
          Export Time-Capsule
        </motion.button>
      </div>
    </div>
  );
};
