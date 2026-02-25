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
    if (key.trim()) onApiKeySet(key);
  };

  return (
    <div className="relative z-50 w-full max-w-4xl p-1 shadow-2xl rounded-2xl bg-gradient-to-b from-white/20 to-transparent">
      <div className="relative bg-void/90 backdrop-blur-3xl rounded-2xl overflow-hidden border border-white/10">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] font-black tracking-[0.2em] text-chrono-cyan/50 uppercase">
              Project Chronos // Temporal Uplink
            </span>
          </div>
          <span className="text-[10px] text-white/30 font-mono">SECURE_NODE: DC-7 // STATUS: ENCRYPTED</span>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side: Information & Description */}
          <div className="p-8 border-r border-white/10 bg-gradient-to-br from-chrono-cyan/5 to-transparent">
            <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase italic">
              Terminal <span className="text-chrono-cyan text-neon">Access</span>
            </h1>
            <p className="text-chrono-cyan/60 text-sm leading-relaxed mb-6 font-medium">
              You are attempting to access the **Project Chronos Reconstruction Engine**. 
              This system utilizes 25th-century neural weights to restore artifact fragments 
              from corrupted timelines.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 bg-chrono-cyan rounded-full shadow-[0_0_8px_#00f2ff]" />
                <div className="text-[11px] text-white/40 uppercase font-bold tracking-wider">
                  <span className="text-white">Protocol:</span> Deep-Scan Vision Restoration
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 bg-chrono-cyan rounded-full shadow-[0_0_8px_#00f2ff]" />
                <div className="text-[11px] text-white/40 uppercase font-bold tracking-wider">
                  <span className="text-white">Encryption:</span> Pollinations AI Nexus
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 bg-chrono-cyan rounded-full shadow-[0_0_8px_#00f2ff]" />
                <div className="text-[11px] text-white/40 uppercase font-bold tracking-wider">
                  <span className="text-white">Warning:</span> Timeline divergence may occur
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Input Form */}
          <div className="p-8 flex flex-col justify-center bg-black/40">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-chrono-cyan uppercase mb-2 tracking-widest">
                  Authentication Token
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full bg-void/50 border-2 border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-chrono-cyan transition-all group-hover:border-white/20 shadow-inner"
                    placeholder="••••••••••••••••"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-chrono-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 242, 255, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-chrono-cyan/10 border-2 border-chrono-cyan text-chrono-cyan font-black uppercase tracking-[0.3em] rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.1)] hover:shadow-[0_0_30px_rgba(0,242,255,0.3)] transition-all"
              >
                Sync Timeline
              </motion.button>
              
              <p className="text-[9px] text-center text-white/20 uppercase font-bold">
                Identity Verification Powered by Pollinations Nexus
              </p>
            </form>
          </div>
        </div>
        
        {/* Bottom Technical Readout */}
        <div className="px-6 py-2 border-t border-white/5 bg-black/60 flex justify-between items-center text-[9px] font-mono text-chrono-cyan/30 uppercase tracking-[0.2em]">
          <span>CPU_LOAD: 12.4%</span>
          <span>MEM_BUFFER: 8192TB</span>
          <span className="animate-pulse">LATENCY: 14MS</span>
        </div>
      </div>
    </div>
  );
};
