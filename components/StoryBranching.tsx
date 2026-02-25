
'use client';

interface StoryBranchingProps {
  chronoPaths: string[];
  onExport: () => void;
}

export const StoryBranching = ({ chronoPaths, onExport }: StoryBranchingProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h3 className="text-xl font-bold text-center text-emerald-500 mb-4">TIMELINE ANALYSIS COMPLETE</h3>
      <div className="flex flex-col gap-4">
        {chronoPaths.map((path, index) => (
          <button key={index} className="px-4 py-3 bg-void border border-emerald-500 text-emerald-500 font-bold rounded-md glow-expansion">
            {path}
          </button>
        ))}
         <button onClick={onExport} className="mt-4 px-4 py-3 bg-emerald-500 text-void font-bold rounded-md glow-expansion">
          Export Time-Capsule
        </button>
      </div>
    </div>
  );
};
