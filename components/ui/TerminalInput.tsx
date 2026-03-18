'use client';

import { useState } from 'react';

interface TerminalInputProps {
  onSubmit: (url: string) => void;
}

const isValidImageUrl = (str: string): boolean => {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const TerminalInput = ({ onSubmit }: TerminalInputProps) => {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    if (!isValidImageUrl(trimmed)) {
      setValidationError('INVALID SIGNATURE — must be a valid https:// URL');
      return;
    }
    setValidationError(null);
    onSubmit(trimmed);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (validationError) setValidationError(null);
  };

  return (
    <div className="relative group">
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-chrono-cyan group-focus-within:w-6 group-focus-within:h-6 transition-all" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-chrono-cyan group-focus-within:w-6 group-focus-within:h-6 transition-all" />

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={url}
            onChange={handleChange}
            placeholder="PASTE ARTIFACT SIGNATURE (URL)..."
            className={`w-full bg-white/5 border px-4 py-4 rounded-lg text-chrono-cyan placeholder:text-chrono-cyan/20 focus:outline-none focus:bg-white/10 transition-all font-bold tracking-wider text-sm ${
              validationError ? 'border-history-red/60' : 'border-white/10'
            }`}
          />
          <div className="absolute left-0 bottom-0 h-[1px] bg-chrono-cyan w-0 group-focus-within:w-full transition-all duration-500 shadow-[0_0_10px_#00f2ff]" />
        </div>

        <button
          type="submit"
          className="px-5 md:px-6 bg-chrono-cyan text-void font-black uppercase tracking-tighter rounded-lg hover:brightness-125 transition-all text-sm flex-shrink-0"
        >
          SCAN
        </button>
      </form>

      {validationError && (
        <p className="mt-2 text-[10px] text-history-red font-bold uppercase tracking-wider animate-pulse">
          {validationError}
        </p>
      )}
    </div>
  );
};
