'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

type AuthStatus = 'PROCESSING' | 'SUCCESS' | 'FAILED';

const API_KEY_STORAGE_KEY = 'chronos_api_key';

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>('PROCESSING');

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const apiKey = fragment.get('api_key');

    if (apiKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
      setStatus('SUCCESS');
      const timer = setTimeout(() => {
        router.replace('/');
      }, 1800);
      return () => clearTimeout(timer);
    } else {
      setStatus('FAILED');
    }
  }, [router]);

  return (
    <main className="min-h-screen w-screen flex items-center justify-center bg-void font-mono overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,19,254,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="p-px rounded-2xl bg-gradient-to-b from-white/20 to-transparent shadow-2xl">
          <div className="bg-void/95 backdrop-blur-3xl rounded-2xl border border-white/10 overflow-hidden">

            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50 shadow-[0_0_8px_red]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className={`w-3 h-3 rounded-full transition-colors duration-700 ${status === 'SUCCESS' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-green-500/50'}`} />
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] text-chrono-cyan/50 uppercase">
                Project Chronos // Auth_Callback
              </span>
            </div>

            <div className="px-10 py-12 flex flex-col items-center text-center gap-8">
              <div className="relative w-20 h-20 flex items-center justify-center">
                {status === 'PROCESSING' && (
                  <>
                    <div className="absolute w-4 h-4 bg-chrono-cyan rounded-full animate-ping opacity-60" />
                    <div className="absolute w-2 h-2 bg-chrono-cyan rounded-full" />
                    <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" className="text-chrono-cyan/20" />
                      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="60 220" className="text-chrono-cyan" />
                    </svg>
                  </>
                )}

                {status === 'SUCCESS' && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                    className="w-full h-full rounded-full border-2 border-chrono-cyan/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.3)]"
                  >
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="w-8 h-8 text-chrono-cyan"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </motion.div>
                )}

                {status === 'FAILED' && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                    className="w-full h-full rounded-full border-2 border-history-red/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,49,49,0.2)]"
                  >
                    <svg className="w-8 h-8 text-history-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>
                )}
              </div>

              <motion.div
                key={status}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {status === 'PROCESSING' && (
                  <>
                    <p className="text-base font-black uppercase italic tracking-[0.3em] digital-fire-text mb-2">
                      Syncing Timeline
                    </p>
                    <p className="text-[11px] text-white/30 font-mono uppercase tracking-widest">
                      Establishing temporal uplink...
                    </p>
                  </>
                )}

                {status === 'SUCCESS' && (
                  <>
                    <p className="text-base font-black uppercase italic tracking-[0.3em] text-chrono-cyan mb-2">
                      Timeline Anchored
                    </p>
                    <p className="text-[11px] text-white/30 font-mono uppercase tracking-widest">
                      Quantum signature verified. Entering nexus...
                    </p>
                  </>
                )}

                {status === 'FAILED' && (
                  <>
                    <p className="text-base font-black uppercase italic tracking-[0.3em] text-history-red mb-2">
                      Auth Anomaly
                    </p>
                    <p className="text-[11px] text-white/30 font-mono uppercase tracking-widest mb-6">
                      No temporal signature detected in callback.
                    </p>
                    <button
                      onClick={() => router.replace('/')}
                      className="px-8 py-3 border-2 border-chrono-purple/50 text-chrono-purple font-black uppercase italic tracking-widest rounded-xl hover:border-chrono-purple hover:shadow-[0_0_20px_rgba(188,19,254,0.3)] transition-all text-xs"
                    >
                      Return to Origin
                    </button>
                  </>
                )}
              </motion.div>
            </div>

            <div className="px-6 py-3 border-t border-white/5 bg-black/60 flex justify-between items-center text-[9px] font-mono text-chrono-cyan/30 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${status === 'PROCESSING' ? 'bg-chrono-cyan animate-pulse' : status === 'SUCCESS' ? 'bg-green-500' : 'bg-history-red'}`} />
                {status === 'PROCESSING' ? 'AUTH_PENDING' : status === 'SUCCESS' ? 'AUTH_GRANTED' : 'AUTH_FAILED'}
              </span>
              <span className="digital-fire-text">SECURITY_LEVEL: HIGH</span>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

