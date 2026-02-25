
const LabBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-grid -z-20"></div>
      <div className="absolute top-0 left-0 w-full h-full scanline-overlay -z-10"></div>
    </div>
  );
};

export default LabBackground;
