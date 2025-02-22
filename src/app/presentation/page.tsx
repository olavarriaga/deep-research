'use client';

import { Presentation } from '@/components/presentation/Presentation';
import { Slide } from '@/components/presentation/Slide';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <Presentation onSlideChange={handleSlideChange}>
      {/* Welcome Slide */}
      <Slide isActive={currentSlide === 0}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Deep Research
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing academic research with AI-powered insights and comprehensive data analysis
          </p>
        </motion.div>
      </Slide>

      {/* Problem Statement Slide */}
      <Slide isActive={currentSlide === 1}>
        <div className="grid grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-6">The Challenge</h2>
            <div className="space-y-4 text-xl text-gray-300">
              <p>Traditional research methods are:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Time-consuming and repetitive</li>
                <li>Limited by human processing capacity</li>
                <li>Prone to missing crucial connections</li>
                <li>Difficult to scale effectively</li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-8 rounded-2xl"
          >
            <div className="aspect-square rounded-xl bg-white/10 flex items-center justify-center">
              <span className="text-6xl">🔍</span>
            </div>
          </motion.div>
        </div>
      </Slide>

      {/* Solution Slide */}
      <Slide isActive={currentSlide === 2}>
        <div className="space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Solution
          </motion.h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                title: 'AI-Powered Analysis',
                icon: '🤖',
                description: 'Advanced machine learning algorithms process vast amounts of research data'
              },
              {
                title: 'Smart Connections',
                icon: '🔗',
                description: 'Automatically identify relationships between different research papers'
              },
              {
                title: 'Real-time Updates',
                icon: '⚡',
                description: 'Stay current with the latest research in your field'
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="bg-white/10 p-8 rounded-xl text-center hover:bg-white/15 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Slide>

      {/* Features & Benefits Slide */}
      <Slide isActive={currentSlide === 3}>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-gray-300">Transforming research workflows</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">📊 Data Analysis</h3>
                <p className="text-gray-300">Process and analyze research papers at scale</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">🎯 Citation Tracking</h3>
                <p className="text-gray-300">Track and manage citations automatically</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">🔄 Integration</h3>
                <p className="text-gray-300">Seamless integration with existing tools</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">📱 Accessibility</h3>
                <p className="text-gray-300">Access your research from anywhere</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Slide>

      {/* Get Started Slide */}
      <Slide isActive={currentSlide === 4}>
        <div className="text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Ready to Transform Your Research?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of researchers who are already using Deep Research to accelerate their work
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                Get Started
              </button>
              <button className="bg-white/10 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </Slide>
    </Presentation>
  );
} 