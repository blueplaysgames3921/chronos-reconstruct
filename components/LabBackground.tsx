const LabBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 scanline-overlay" />
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'radial-gradient(circle at top, rgba(0, 242, 255, 0.15) 0%, transparent 70%)' 
        }} 
      />
    </div>
  );
};

export default LabBackground;
