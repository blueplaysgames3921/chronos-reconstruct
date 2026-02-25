
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SecureTerminalProps {
  onApiKeySet: (apiKey: string) => void;
}

export const SecureTerminal = ({ onApiKeySet }: SecureTerminalProps) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApiKeySet(key);
  };

  return (
    <div className="w-full max-w-md p-4 border border-cyan-border rounded-lg bg-black/50 backdrop-blur-md">
      <h2 className="text-lg font-bold text-cyan-glow mb-4">Secure Decryption Terminal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full px-3 py-2 bg-transparent border border-cyan-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-glow"
          placeholder="Enter API Key..."
        />
        <motion.button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-cyan-glow/20 text-cyan-glow font-bold rounded-md hover:bg-cyan-glow/40 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Authorize
        </motion.button>
      </form>
    </div>
  );
};
