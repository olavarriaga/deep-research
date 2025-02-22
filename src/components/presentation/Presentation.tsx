import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PresentationProps {
  children: ReactNode[];
  onSlideChange?: (currentSlide: number) => void;
}

export const Presentation = ({ children, onSlideChange }: PresentationProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = children.length;

  const goToNextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  useEffect(() => {
    onSlideChange?.(currentSlide);
  }, [currentSlide, onSlideChange]);

  // Handle touch/swipe events
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
      setTouchStart(null);
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence>
        {children}
      </AnimatePresence>
      
      {/* Progress Indicator */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-3 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/30 w-4'
            }`}
            initial={false}
            animate={{
              scale: index === currentSlide ? 1.1 : 1,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}; 