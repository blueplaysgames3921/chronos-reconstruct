'use client';
import { motion } from 'framer-motion';

const LabBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-void">
      {/* Base Layer: Nebula Drift */}
      <div className="nebula-bg" />
      
      {/* Flow Layer: Water Texture */}
      <div className="absolute inset-0 water-flow-overlay opacity-20" />

      {/* Blue Digital Fire (Center Focus) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] flex items-center justify-center">
        <div className="relative w-[800px] h-[800px]">
          <div className="absolute inset-0 rounded-full border-2 border-chrono-cyan/20 animate-[spin_60s_linear_infinite] shadow-[0_0_80px_rgba(0,242,255,0.2)]" />
          <div className="absolute inset-20 rounded-full border border-chrono-purple/30 animate-[spin_40s_linear_reverse_infinite]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.15)_0%,transparent_70%)] blur-3xl" />
        </div>
      </div>

      {/* Purple History Poppers (Anomalies) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`history-mark-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.3, 0],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: i * 3, ease: "easeInOut" }}
          className="absolute w-96 h-96 bg-chrono-purple blur-[140px] rounded-full"
        />
      ))}

      {/* Matrix Ghost Rain (Purple Variant) */}
      <div className="absolute inset-0 opacity-[0.03] matrix-fade flex justify-around">
         {[...Array(12)].map((_, i) => (
           <div key={i} className="text-[10px] leading-none animate-[matrix-scroll_30s_linear_infinite] text-chrono-purple font-mono"
                style={{ animationDelay: `${i * 1.5}s` }}>
             {Array(50).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('\n')}
           </div>
         ))}
      </div>

      {/* Red Burst Scanlines (Temporal Friction) */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-10">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`friction-${i}`}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 10 + i, repeat: Infinity, ease: "linear" }}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-history-red to-transparent"
          />
        ))}
      </div>

      <div className="absolute inset-0 scanline-overlay opacity-10" />
    </div>
  );
};

export default LabBackground;
