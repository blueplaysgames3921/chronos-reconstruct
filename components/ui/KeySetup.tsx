
'use client';

import { useState, useEffect } from 'react';

interface KeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

export const KeySetup = ({ onApiKeySet }: KeySetupProps) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedKey = localStorage.getItem('pollinations_api_key');
    if (storedKey) {
      onApiKeySet(storedKey);
    }
  }, [onApiKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('pollinations_api_key', apiKey);
      onApiKeySet(apiKey);
    }
  };

  return (
    <div className="fixed inset-0 bg-void bg-opacity-90 flex items-center justify-center z-50">
      <div className="border border-amber-500 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">AUTHENTICATION REQUIRED</h2>
        <p className="mb-4">Enter your Pollinations API Key to proceed.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-void border border-amber-500 rounded-md px-3 py-2 mb-4 text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button type="submit" className="px-4 py-2 bg-amber-500 text-void font-bold rounded-md glow-expansion">
            Authorize
          </button>
        </form>
      </div>
    </div>
  );
};
