'use client';

const LabBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none">
      {/* Deep Space Layer */}
      <div className="nebula-bg" />
      
      {/* Matrix Ghost Rain */}
      <div className="absolute inset-0 opacity-[0.03] matrix-fade flex justify-around">
         {[...Array(10)].map((_, i) => (
           <div key={i} className="text-[10px] leading-none animate-[matrix-scroll_20s_linear_infinite]" 
                style={{ animationDelay: `${i * 1.5}s` }}>
             {Array(50).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('\n')}
           </div>
         ))}
      </div>

      {/* The Central Time Anomaly */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
        <div className="absolute inset-0 rounded-full border-2 border-chrono-cyan/30 animate-[spin_60s_linear_infinite]" />
        <div className="absolute inset-10 rounded-full border border-chrono-cyan/10 animate-[spin_40s_linear_reverse_infinite]" />
        <div className="absolute inset-0 bg-radial-at-center from-chrono-cyan/20 to-transparent blur-3xl" />
      </div>

      {/* Grid Floor */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 242, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(200px)',
          transformOrigin: 'bottom'
        }} 
      />
      
      <div className="absolute inset-0 scanline-overlay" />
    </div>
  );
};

export default LabBackground;
