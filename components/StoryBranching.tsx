'use client';

import { motion } from 'framer-motion';

interface StoryBranchingProps {
  chronoPaths: string[];
  onExport: () => void;
  onReset: () => void;
  onDiverge: () => void;
}

export const StoryBranching = ({ chronoPaths, onExport, onReset, onDiverge }: StoryBranchingProps) => {
  const pathHandlers = [onExport, onReset, onDiverge];

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
      <div className="flex-1 flex flex-row gap-2 md:gap-3 w-full">
        {chronoPaths.map((path, index) => (
          <motion.button
            key={index}
            onClick={pathHandlers[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-chrono-purple/5 border border-chrono-purple/20 text-[9px] md:text-[10px] font-black uppercase tracking-tighter text-chrono-purple hover:bg-chrono-purple hover:text-white transition-all rounded-xl border-dashed"
          >
            {path.split(']')[0]}]
            <span className="block text-[7px] md:text-[8px] opacity-60 font-medium normal-case tracking-normal mt-0.5">
              {path.split(']')[1]}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="hidden sm:block w-[1px] h-10 md:h-12 bg-white/10 flex-shrink-0" />

      <motion.button
        onClick={onExport}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-chrono-cyan text-void font-black uppercase italic tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_40px_rgba(0,242,255,0.5)] transition-all text-xs md:text-sm flex-shrink-0"
      >
        EXPORT_CAPSULE
      </motion.button>
    </div>
  );
};
