import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getParticleCount = () => {
    if (dimensions.width < 640) return 8;
    if (dimensions.width < 1024) return 12;
    return 20;
  };

  const getParticleSize = () => {
    if (dimensions.width < 640) return 'w-1 h-1';
    return 'w-2 h-2';
  };

  if (dimensions.width === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(getParticleCount())].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${getParticleSize()} bg-white rounded-full opacity-20`}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, -100, dimensions.height + 100],
            opacity: [0.2, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
