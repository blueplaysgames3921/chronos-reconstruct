const LabBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 scanline-overlay" />
      <div className="absolute inset-0 bg-radial-at-t from-cyan-glow/5 to-transparent" />
    </div>
  );
};

export default LabBackground;
