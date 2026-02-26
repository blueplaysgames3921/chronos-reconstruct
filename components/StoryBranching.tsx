'use client';

import { motion } from 'framer-motion';

interface StoryBranchingProps {
  chronoPaths: string[];
  onExport: () => void;
}

export const StoryBranching = ({ chronoPaths, onExport }: StoryBranchingProps) => {
  return (
    <div className="w-full flex items-center justify-between gap-6">
      <div className="flex-1 flex gap-3">
        {chronoPaths.map((path, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-1 px-4 py-3 bg-chrono-purple/5 border border-chrono-purple/20 text-[10px] font-black uppercase tracking-tighter text-chrono-purple hover:bg-chrono-purple hover:text-white transition-all rounded-xl border-dashed"
          >
            {path.split(']')[0]}]
            <span className="block text-[8px] opacity-60 font-medium normal-case tracking-normal">
              {path.split(']')[1]}
            </span>
          </motion.button>
        ))}
      </div>
      
      <div className="w-[1px] h-12 bg-white/10" />

      <motion.button
        onClick={onExport}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-chrono-cyan text-void font-black uppercase italic tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_40px_rgba(0,242,255,0.5)] transition-all"
      >
        EXPORT_CAPSULE
      </motion.button>
    </div>
  );
};
