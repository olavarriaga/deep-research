'use client';

import { ReactNode, useEffect, Children } from 'react';
import { motion } from 'framer-motion';

interface PresentationProps {
  children: ReactNode;
  onSlideChange: (index: number) => void;
  currentSlide: number;
}

export const Presentation = ({ children, onSlideChange, currentSlide }: PresentationProps) => {
  const totalSlides = Children.count(children);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlide < totalSlides - 1) {
          onSlideChange(currentSlide + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          onSlideChange(currentSlide - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, totalSlides, onSlideChange]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
      {children}
      
      {/* Progress Indicator */}
      <motion.div 
        className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-4 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentSlide ? 'bg-blue-500 w-12' : 'bg-gray-600 w-6'
            }`}
            initial={false}
            animate={{
              scale: index === currentSlide ? 1.1 : 1,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => onSlideChange(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}; 