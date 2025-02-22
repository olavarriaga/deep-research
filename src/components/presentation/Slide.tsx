'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';

interface SlideProps {
  children: ReactNode;
  isActive: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Slide = ({ children, isActive }: SlideProps) => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number }>>([]);
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height
      }))
    );
  }, [dimensions]);

  return (
    <motion.div
      initial="enter"
      animate={isActive ? "center" : "exit"}
      variants={slideVariants}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
          // Swipe right
          console.log('swipe right');
        } else if (swipe > swipeConfidenceThreshold) {
          // Swipe left
          console.log('swipe left');
        }
      }}
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
        ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <motion.div 
        className="w-full max-w-6xl mx-auto px-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.9
        }}
        transition={{ 
          duration: 0.5,
          delay: isActive ? 0.2 : 0,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        {children}
      </motion.div>

      {/* Background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Particle effect */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.5 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ x: particle.x, y: particle.y }}
            animate={{
              y: [particle.y, Math.random() * dimensions.height],
              opacity: [0.2, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}; 