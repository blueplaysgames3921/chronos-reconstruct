
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TerminalInputProps {
  onSubmit: (url: string) => void;
}

export const TerminalInput = ({ onSubmit }: TerminalInputProps) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4 border border-cyan-border rounded-lg bg-black/30 backdrop-blur-xl">
      <div className="flex items-center">
        <span className="text-cyan-glow mr-2">{`>_`}</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Artifact Image URL..."
          className="w-full bg-transparent text-cyan-glow placeholder-cyan-glow/50 focus:outline-none"
        />
        <motion.button 
          type="submit"
          className="ml-4 px-4 py-2 bg-cyan-glow/20 text-cyan-glow font-bold rounded-md hover:bg-cyan-glow/40 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reconstruct
        </motion.button>
      </div>
    </form>
  );
};
