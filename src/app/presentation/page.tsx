'use client';

import { Presentation } from '@/components/presentation/Presentation';
import { Slide } from '@/components/presentation/Slide';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ClockIcon, DocumentTextIcon, RocketLaunchIcon, MagnifyingGlassIcon, GlobeAltIcon, PencilIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Presentation onSlideChange={setCurrentSlide} currentSlide={currentSlide}>
      {/* Welcome/Introduction Slide */}
      <Slide isActive={currentSlide === 0}>
        <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-8">
          <motion.div className="text-center space-y-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
            >
              Deep-Research
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl text-gray-200"
            >
              AI-Powered Research Assistant
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Automate your research, get structured insights, and make informed decisions—faster than ever.
            </motion.p>
          </motion.div>
        </div>
      </Slide>

      {/* Problem/Challenge Slide */}
      <Slide isActive={currentSlide === 1}>
        <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 gap-16 items-center w-full">
            <motion.div className="space-y-8">
              <h2 className="text-4xl font-bold text-white">Traditional research is slow, manual, and inefficient.</h2>
              <ul className="space-y-6">
                {[
                  { icon: ClockIcon, text: "Time-Consuming: Finding reliable information takes hours" },
                  { icon: DocumentTextIcon, text: "Unstructured Data: Manually organizing research is tedious" },
                  { icon: ChartBarIcon, text: "Overwhelming Information: Too many sources, hard to filter relevant insights" },
                  { icon: RocketLaunchIcon, text: "Lack of AI Integration: Current tools don't automate deep-dive research" }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * index }}
                    className="flex items-center gap-4 text-gray-300"
                  >
                    <item.icon className="h-6 w-6 text-blue-500 shrink-0" />
                    <span>{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </Slide>

      {/* Solution Overview Slide */}
      <Slide isActive={currentSlide === 2}>
        <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-8">
          <div className="space-y-12 w-full">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center text-white"
            >
              AI-Powered Research in Minutes, Not Hours
            </motion.h2>
            <div className="grid grid-cols-3 gap-8">
              {[
                {
                  icon: MagnifyingGlassIcon,
                  title: "Automated Research",
                  description: "AI generates search queries, extracts key insights, and organizes research automatically"
                },
                {
                  icon: DocumentTextIcon,
                  title: "Structured Summaries",
                  description: "AI compiles research into clear, actionable reports instead of messy, unstructured notes"
                },
                {
                  icon: RocketLaunchIcon,
                  title: "Next-Step Suggestions",
                  description: "AI doesn't just summarize—it provides next research steps to refine your insights"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 flex flex-col items-center text-center"
                >
                  <feature.icon className="h-12 w-12 text-blue-500 mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* Key Benefits/Features Slide */}
      <Slide isActive={currentSlide === 3}>
        <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-8">
          <div className="space-y-12 w-full">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-center text-white mb-8"
            >
              Key Benefits
            </motion.h2>
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center"
              >
                <ClockIcon className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">Save 80% of Research Time</h3>
                <p className="text-gray-400 text-sm">Get insights instantly instead of spending hours searching</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center"
              >
                <PencilIcon className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">No More Manual Note-Taking</h3>
                <p className="text-gray-400 text-sm">AI auto-organizes your findings into reports</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center"
              >
                <GlobeAltIcon className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">High-Quality Sources</h3>
                <p className="text-gray-400 text-sm">Pulls data from trusted research databases and the web</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center"
              >
                <ChartBarIcon className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-3">Actionable AI Suggestions</h3>
                <p className="text-gray-400 text-sm">AI doesn't just summarize—it guides your research forward</p>
              </motion.div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Call to Action Slide */}
      <Slide isActive={currentSlide === 4}>
        <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto px-8">
          <div className="text-center space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white"
            >
              Start Automating Your Research Today!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400"
            >
              Stop wasting hours—let AI handle the heavy lifting
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-8"
            >
              <button className="px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors">
                Try Deep-Research Now
              </button>
              <button className="px-8 py-4 bg-gray-800 text-white rounded-xl text-lg font-semibold hover:bg-gray-700 transition-colors">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </Slide>
    </Presentation>
  );
} 