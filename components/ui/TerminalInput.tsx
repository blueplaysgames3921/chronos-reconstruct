'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function TerminalInput({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <label htmlFor="artifact-url" className="block text-emerald-500 mb-2">
          Enter Artifact URL:
        </label>
        <input
          id="artifact-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full bg-void border border-emerald-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="https://..."
          required
        />
      </motion.div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-emerald-500 text-void font-bold rounded-md glow-expansion"
      >
        Initiate Scan
      </motion.button>
    </form>
  );
}
