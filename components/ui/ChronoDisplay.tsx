'use client';

import { motion } from 'framer-motion';

export function ChronoDisplay({ imageUrl, videoUrl }: { imageUrl: string | null; videoUrl: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {imageUrl && (
        <div className="mb-4">
          <img src={imageUrl} alt="Restored Artifact" className="w-full rounded-lg shadow-lg" />
        </div>
      )}
      {videoUrl && (
        <div>
          <video src={videoUrl} controls autoPlay loop className="w-full rounded-lg shadow-lg" />
        </div>
      )}
    </motion.div>
  );
}
