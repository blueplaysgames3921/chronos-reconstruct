'use client';

import { motion } from 'framer-motion';

export const SecureTerminal = () => {
  const handleAuth = () => {
    const params = new URLSearchParams({
      redirect_uri: `${window.location.origin}/auth`,
      client_id: 'pk_XFnEUbJl0hKG0A7Z',
    });
    window.location.href = `https://enter.pollinations.ai/authorize?${params}`;
  };

  return (
    <div className="relative z-50 w-full max-w-2xl p-px rounded-2xl bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
      <div className="relative bg-void/95 backdrop-blur-3xl rounded-2xl overflow-hidden border border-white/10">
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
        </div>

        <div className="px-8 pt-12 pb-10 md:px-16 md:pt-16 md:pb-12 flex flex-col items-center text-center gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic mb-4">
                CHRONOS<span className="text-chrono-cyan text-neon">.ALPHA</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-chrono-cyan/60 text-sm leading-relaxed max-w-sm"
            >
              A temporal reconstruction engine. Submit any artifact fragment and watch history reassemble itself across the quantum continuum.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col items-center gap-3 w-full max-w-xs"
          >
            <motion.button
              onClick={handleAuth}
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(188,19,254,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 bg-chrono-purple/10 border-2 border-chrono-purple text-chrono-purple font-black uppercase tracking-[0.4em] rounded-xl shadow-[0_0_20px_rgba(188,19,254,0.2)] hover:bg-chrono-purple/20 transition-colors italic"
            >
              Sync Timeline
            </motion.button>
            <p className="text-[9px] text-white/20 uppercase tracking-widest">
              Powered by Pollinations AI Nexus
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 md:gap-8 w-full border-t border-white/5 pt-8"
          >
            {[
              { label: 'Protocol', val: 'Deep-Scan Vision' },
              { label: 'Encryption', val: 'Neural Nexus v.4' },
              { label: 'Safety', val: 'Timeline Anchored' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-1.5 h-1.5 bg-chrono-cyan rounded-full shadow-[0_0_10px_#00f2ff]" />
                <div className="text-[9px] text-center uppercase font-bold tracking-wider">
                  <span className="block text-white/50">{item.label}</span>
                  <span className="text-white/25">{item.val}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="px-6 py-3 border-t border-white/5 bg-black/60 flex justify-between items-center text-[9px] font-mono text-chrono-cyan/30 uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            NODE_ACTIVE: DC-7
          </span>
          <span className="hidden sm:inline">MEM_POOL: 8192TB</span>
          <span className="digital-fire-text">SECURITY_LEVEL: HIGH</span>
        </div>
      </div>
    </div>
  );
};

