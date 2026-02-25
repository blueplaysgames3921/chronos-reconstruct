'use client';

import { motion } from 'framer-motion';

interface Path {
  id: string;
  title: string;
}

export function StoryBranching({ paths }: { paths: Path[] }) {
  const handleExport = () => {
    // Logic to call the /api/export endpoint
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 border border-cyan-500 rounded-lg">
      <h3 className="text-cyan-500 text-lg font-bold mb-4 text-center">Chrono-Paths Detected</h3>
      <div className="flex justify-around items-center">
        {paths.map((path) => (
          <motion.button
            key={path.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-cyan-500 text-void font-bold rounded-md glow-expansion"
          >
            {path.title}
          </motion.button>
        ))}
         <motion.button
            onClick={handleExport}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 bg-emerald-500 text-void font-bold rounded-md glow-expansion"
          >
            Export Time Capsule
          </motion.button>
      </div>
    </div>
  );
}
