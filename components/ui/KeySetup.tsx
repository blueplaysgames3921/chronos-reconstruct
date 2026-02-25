'use client';

import { useState } from 'react';

export function KeySetup({ onApiKeySet }: { onApiKeySet: (key: string) => void }) {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApiKeySet(key);
  };

  return (
    <div className="fixed inset-0 bg-void bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-full max-w-md p-8 border border-red-600 rounded-lg text-center">
        <h2 className="text-2xl text-red-600 font-bold mb-4">Authorization Required</h2>
        <p className="text-white mb-6">A valid Pollinations API Key is required to proceed.</p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full bg-void border border-red-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter API Key"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-void font-bold rounded-md glow-expansion"
          >
            Authorize
          </button>
        </form>
      </div>
    </div>
  );
}
