'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HistoryEntry } from '@/hooks/useChronos';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onClearHistory: () => void;
}

const formatTimestamp = (timestamp: number): string => {
  const d = new Date(timestamp);
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const HistorySidebar = ({ isOpen, onClose, history, onClearHistory }: HistorySidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-void border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/50 flex-shrink-0">
              <div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">
                  Temporal_Archive
                </h2>
                <p className="text-[9px] text-chrono-cyan/40 mt-0.5 font-mono">
                  {history.length} reconstruction{history.length !== 1 ? 's' : ''} logged
                </p>
              </div>

              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={onClearHistory}
                    className="text-[9px] font-black uppercase tracking-wider text-history-red/50 hover:text-history-red border border-history-red/15 hover:border-history-red/40 px-3 py-1.5 rounded-lg transition-all"
                  >
                    PURGE_ALL
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-white/30 hover:text-white transition-colors rounded-lg border border-white/10 hover:border-white/20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 opacity-25 px-8">
                  <div className="w-12 h-12 border border-chrono-cyan/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-chrono-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-chrono-cyan text-center">
                    No Archives Found
                  </p>
                  <p className="text-[9px] text-white/30 text-center font-mono">
                    Completed reconstructions will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {history.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="p-4 hover:bg-white/[0.03] transition-colors group"
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border border-white/10 bg-black/60">
                          <img
                            src={entry.imageUrl}
                            alt="Archived artifact"
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <span className="text-[8px] md:text-[9px] font-black text-chrono-cyan/50 uppercase tracking-widest truncate">
                              {formatTimestamp(entry.timestamp)}
                            </span>
                            {entry.videoUrl && (
                              <span className="flex-shrink-0 text-[7px] font-black text-chrono-purple/60 border border-chrono-purple/25 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                VIDEO
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] md:text-[10px] text-white/35 leading-relaxed font-mono line-clamp-3">
                            {entry.lore.substring(0, 130)}...
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-white/5 bg-black/60 flex-shrink-0">
              <p className="text-[8px] text-chrono-cyan/20 font-mono uppercase tracking-[0.2em] text-center">
                ARCHIVE_STABLE // LOCAL_STORAGE_SECURED
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

