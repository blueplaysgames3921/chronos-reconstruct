
'use client';

import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center border border-emerald-500 rounded-md p-2">
        <span className="text-emerald-500 mr-2">{`>_`}</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Artifact Image URL..."
          className="w-full bg-transparent text-emerald-500 placeholder-emerald-500/50 focus:outline-none"
        />
        <button type="submit" className="ml-4 px-4 py-2 bg-emerald-500 text-void font-bold rounded-md glow-expansion">
          Reconstruct
        </button>
      </div>
    </form>
  );
};
