'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecureTerminalProps {
  onApiKeySet: (apiKey: string) => void;
}

export const SecureTerminal = ({ onApiKeySet }: SecureTerminalProps) => {
  const [key, setKey] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) onApiKeySet(key);
  };

  return (
    <div className="relative z-50 w-full max-w-5xl p-1 shadow-2xl rounded-2xl bg-gradient-to-b from-white/20 to-transparent">
      <div className="relative bg-void/95 backdrop-blur-3xl rounded-2xl overflow-hidden border border-white/10">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50 shadow-[0_0_8px_red]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] font-black tracking-[0.2em] text-chrono-cyan/50 uppercase">
              Project Chronos // System_Auth
            </span>
          </div>
          <button 
            onClick={() => setShowGuide(!showGuide)}
            className="text-[10px] text-chrono-purple font-black hover:text-white transition-colors cursor-help border border-chrono-purple/30 px-2 py-1 rounded"
          >
            {showGuide ? 'CLOSE_MANUAL' : 'GET_ACCESS_MANUAL'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0 relative">
          {/* Left Side: Information & Description */}
          <div className="p-10 border-r border-white/10 bg-gradient-to-br from-chrono-purple/5 to-transparent">
            <h1 className="text-5xl font-black text-white mb-4 tracking-tighter uppercase italic">
              Terminal <span className="text-chrono-cyan text-neon">Access</span>
            </h1>
            <p className="text-chrono-cyan/70 text-sm leading-relaxed mb-8 font-medium">
              Welcome to the <span className="text-white">Chronos Reconstruction Engine</span>. 
              To proceed with artifact restoration, you must establish a secure uplink 
              via the Pollinations AI Nexus.
            </p>
            
            <div className="space-y-5">
              {[
                { label: 'Protocol', val: 'Deep-Scan Vision' },
                { label: 'Encryption', val: 'Neural Nexus v.4' },
                { label: 'Safety', val: 'Timeline Anchored' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 bg-chrono-cyan rounded-full shadow-[0_0_10px_#00f2ff] group-hover:scale-150 transition-transform" />
                  <div className="text-[11px] text-white/40 uppercase font-bold tracking-widest">
                    <span className="text-white">{item.label}:</span> {item.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Input Form OR Guide */}
          <div className="p-10 flex flex-col justify-center bg-black/40 min-h-[400px]">
            <AnimatePresence mode="wait">
              {!showGuide ? (
                <motion.form 
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                >
                  <div>
                    <label className="block text-[10px] font-black text-chrono-cyan uppercase mb-3 tracking-widest">
                      Authentication Token [API_KEY]
                    </label>
                    <div className="relative group">
                      <input
                        type="password"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full bg-void/80 border-2 border-white/10 rounded-xl px-5 py-5 text-white focus:outline-none focus:border-chrono-purple transition-all group-hover:border-white/20 shadow-inner font-mono"
                        placeholder="••••••••••••••••"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(188, 19, 254, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-5 bg-chrono-purple/10 border-2 border-chrono-purple text-chrono-purple font-black uppercase tracking-[0.4em] rounded-xl shadow-[0_0_20px_rgba(188,19,254,0.2)] hover:shadow-[0_0_40px_rgba(188,19,254,0.4)] transition-all italic"
                  >
                    Sync Timeline
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="guide"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 text-xs"
                >
                  <h3 className="text-chrono-cyan font-black uppercase tracking-widest border-b border-chrono-cyan/20 pb-2">How to get access:</h3>
                  <ol className="space-y-4 font-bold text-white/70 uppercase tracking-tighter">
                    <li className="flex gap-3">
                      <span className="text-chrono-purple">01.</span>
                      <span>Visit <a href="https://pollinations.ai" target="_blank" className="underline text-chrono-cyan hover:text-white">pollinations.ai</a></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-chrono-purple">02.</span>
                      <span>Log in or Sign up for a free developer account.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-chrono-purple">03.</span>
                      <span>Navigate to your <span className="text-white italic">Settings</span> or <span className="text-white italic">API section</span>.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-chrono-purple">04.</span>
                      <span>Copy your <span className="text-chrono-cyan">Secret Key</span> and paste it here.</span>
                    </li>
                  </ol>
                  <div className="p-4 bg-history-red/10 border border-history-red/20 rounded-lg">
                    <p className="text-[10px] text-history-red font-black">WARNING: NEVER SHARE YOUR KEY. IT IS YOUR TEMPORAL SIGNATURE.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Bottom Technical Readout */}
        <div className="px-6 py-3 border-t border-white/5 bg-black/60 flex justify-between items-center text-[9px] font-mono text-chrono-cyan/30 uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            NODE_ACTIVE: DC-7
          </span>
          <span>MEM_POOL: 8192TB</span>
          <span className="digital-fire-text">SECURITY_LEVEL: HIGH</span>
        </div>
      </div>
    </div>
  );
};
