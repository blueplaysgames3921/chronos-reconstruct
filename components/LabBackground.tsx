'use client';
import { motion } from 'framer-motion';

const LabBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-void">
      <div className="nebula-bg" />
      <div className="absolute inset-0 water-flow-overlay opacity-30" />
      
      {/* Matrix Ghost Rain */}
      <div className="absolute inset-0 opacity-[0.05] matrix-fade flex justify-around">
         {[...Array(15)].map((_, i) => (
           <div key={i} className="text-[10px] leading-none animate-[matrix-scroll_25s_linear_infinite] text-chrono-purple" 
                style={{ animationDelay: `${i * 1.2}s` }}>
             {Array(60).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('\n')}
           </div>
         ))}
      </div>

      {/* Purple Blast Poppers (History Marks) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`blast-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2, 0], 
            opacity: [0, 0.4, 0],
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: i * 2 }}
          className="absolute w-64 h-64 bg-chrono-purple blur-[120px] rounded-full"
        />
      ))}

      {/* Blue Digital Fire Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-20">
        <div className="absolute inset-0 rounded-full border-2 border-chrono-cyan/30 animate-[spin_60s_linear_infinite] shadow-[0_0_100px_rgba(0,242,255,0.4)]" />
        <div className="absolute inset-20 rounded-full border border-chrono-purple/20 animate-[spin_40s_linear_reverse_infinite]" />
        <div className="absolute inset-0 bg-radial-at-center from-chrono-cyan/30 via-chrono-purple/10 to-transparent blur-3xl" />
      </div>

      {/* Red Burst Poppers */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`red-${i}`}
          animate={{ 
            y: [-20, 20, -20],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-1 h-20 bg-history-red blur-md"
          style={{ left: `${i * 15}%`, top: `${Math.random() * 100}%` }}
        />
      ))}
      
      <div className="absolute inset-0 scanline-overlay opacity-20" />
    </div>
  );
};

export default LabBackground;
