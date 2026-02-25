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
    if (url.trim()) onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      {/* Target Reticle Borders */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-chrono-cyan group-focus-within:w-6 group-focus-within:h-6 transition-all" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-chrono-cyan group-focus-within:w-6 group-focus-within:h-6 transition-all" />
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="PASTE ARTIFACT SIGNATURE (URL)..."
            className="w-full bg-white/5 border border-white/10 px-4 py-4 rounded-lg text-chrono-cyan placeholder:text-chrono-cyan/20 focus:outline-none focus:bg-white/10 transition-all font-bold tracking-wider"
          />
          <div className="absolute left-0 bottom-0 h-[1px] bg-chrono-cyan w-0 group-focus-within:w-full transition-all duration-500 shadow-[0_0_10px_#00f2ff]" />
        </div>
        
        <button 
          type="submit"
          className="px-6 bg-chrono-cyan text-void font-black uppercase tracking-tighter rounded-lg hover:brightness-125 transition-all"
        >
          SCAN
        </button>
      </div>
    </form>
  );
};
