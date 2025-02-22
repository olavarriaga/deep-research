'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon, BeakerIcon, ChartBarIcon, ClockIcon, CpuChipIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export default function TechnicalPaperPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Overview', icon: LightBulbIcon },
    { id: 'technology', name: 'Technology', icon: CpuChipIcon },
    { id: 'performance', name: 'Performance', icon: ChartBarIcon },
    { id: 'future', name: 'Future', icon: BeakerIcon },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-400"
          >
            Try it Now
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-lg prose-gray mx-auto dark:prose-invert"
        >
          <div className="not-prose text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
            >
              Recursive Research Methodology
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
            >
              A revolutionary approach to AI-powered research that delivers deeper insights, better coverage, and faster results
            </motion.p>
          </div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="not-prose my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <ChartBarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Coverage Improvement</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">87%</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <ClockIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time Reduction</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">80%</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <CpuChipIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy Rate</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <BeakerIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Unique Sources</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">73%</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="not-prose mb-8">
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content Sections */}
          <div className={activeTab === 'overview' ? 'block' : 'hidden'}>
            <div className="not-prose mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Introduction</h2>
              <div className="mt-6 space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  Deep Research introduces a revolutionary approach to automated research that combines recursive exploration with parallel processing. 
                  Unlike traditional AI chat systems that rely solely on pre-trained knowledge, our system actively explores and synthesizes 
                  information from multiple sources in real-time, creating a comprehensive and dynamic research experience.
                </p>
                <p className="text-lg leading-relaxed">
                  Our platform stands out by employing a sophisticated tree-based exploration model that can delve up to five levels deep into any topic. 
                  This multi-level approach ensures that no stone is left unturned, capturing both broad overview information and granular details 
                  that might be missed by conventional research methods.
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">How It Works</h3>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">1</span>
                      <span>Initial query analysis and decomposition into multiple research paths</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">2</span>
                      <span>Parallel processing of research paths with real-time data gathering</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">3</span>
                      <span>AI-powered generation of contextual follow-up questions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">4</span>
                      <span>Recursive exploration of generated questions for deeper insights</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Key Advantages</h3>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 shrink-0 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Comprehensive coverage through multi-level exploration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 shrink-0 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Real-time data gathering ensures up-to-date information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 shrink-0 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Intelligent follow-up question generation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="h-6 w-6 shrink-0 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Efficient parallel processing reduces research time</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white dark:from-primary-600 dark:to-primary-500">
                <h3 className="mb-4 text-xl font-semibold">Research Capabilities</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium text-primary-100">Depth Control</h4>
                    <p className="text-sm">Adjust research depth from 1 to 5 levels, allowing for both quick overviews and deep dives into complex topics</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-primary-100">Breadth Control</h4>
                    <p className="text-sm">Configure 2-10 parallel research paths to balance between focused and broad exploration</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-primary-100">Source Integration</h4>
                    <p className="text-sm">Seamlessly combines information from academic databases, current news, and specialized sources</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-primary-100">Result Synthesis</h4>
                    <p className="text-sm">Advanced AI algorithms combine findings into coherent, well-structured research outputs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="not-prose my-8 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white dark:from-primary-600 dark:to-primary-500">
              <h3 className="mb-2 text-xl font-semibold">Why Deep Research?</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Multi-level recursive research</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Parallel processing architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Dynamic question generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Real-time data gathering</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={activeTab === 'technology' ? 'block' : 'hidden'}>
            <div className="not-prose mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Core Technology</h2>
              <div className="mt-6 space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  At the heart of Deep Research lies a sophisticated system that combines advanced AI algorithms with parallel processing capabilities.
                  Our technology stack is built on three core pillars: recursive exploration, parallel processing, and intelligent synthesis.
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Recursive Exploration</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our tree-based model generates contextual follow-up questions, diving deeper into each research path to uncover hidden insights.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      <span>Up to 5 levels of depth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      <span>Smart question generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      <span>Context-aware exploration</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Parallel Processing</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Multiple research paths are explored simultaneously, maximizing efficiency and coverage while minimizing research time.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                      <span>2-10 parallel queries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                      <span>Load balancing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                      <span>Optimized resource usage</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Smart Synthesis</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced algorithms combine and synthesize findings into coherent, well-structured research outputs.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                      <span>AI-powered analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                      <span>Cross-reference validation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                      <span>Structured output format</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Research Algorithm</h3>
                <div className="not-prose overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-700 dark:bg-gray-900/50">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <pre className="bg-gray-900 p-6">
                      <code className="text-sm text-white">
{`function recursiveResearch(query, depth, breadth) {
  if (depth === 0) return []
  
  // Generate parallel research paths
  const paths = generatePaths(query, breadth)
  
  // Execute parallel searches
  const results = await Promise.all(
    paths.map(async path => {
      const findings = await searchAPI(path)
      const questions = generateFollowUp(findings)
      
      // Recursive exploration
      const subResults = await Promise.all(
        questions.map(q => 
          recursiveResearch(q, depth - 1, breadth)
        )
      )
      
      return { findings, subResults }
    })
  )
  
  return synthesizeResults(results)
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
                <h3 className="mb-4 text-2xl font-bold">Technical Specifications</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <h4 className="mb-2 font-medium text-blue-100">Processing Power</h4>
                    <p className="text-sm">Up to 10 concurrent research paths with dynamic load balancing</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-blue-100">API Integration</h4>
                    <p className="text-sm">Multiple data sources with real-time aggregation</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-blue-100">Response Time</h4>
                    <p className="text-sm">Average 500ms per query with caching</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-blue-100">Scalability</h4>
                    <p className="text-sm">Horizontal scaling with distributed processing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={activeTab === 'performance' ? 'block' : 'hidden'}>
            <div className="not-prose mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Performance Analysis</h2>
              <div className="mt-6 space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  Deep Research has been extensively tested against traditional research methods and other AI systems. Our platform consistently 
                  demonstrates superior performance across all key metrics, from information coverage to processing efficiency.
                </p>
              </div>

              <div className="mt-8 grid gap-8">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">Comparative Analysis</h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Information Coverage</span>
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">87%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-2 rounded-full bg-primary-600 dark:bg-primary-400" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Processing Speed</span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">400%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-2 rounded-full bg-green-600 dark:bg-green-400" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Cost Efficiency</span>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">65%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-2 rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Coverage Metrics</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Information Coverage</span>
                          <span className="font-semibold text-primary-600 dark:text-primary-400">87% better</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Broader and deeper information gathering compared to traditional methods</p>
                      </li>
                      <li>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Unique Sources</span>
                          <span className="font-semibold text-primary-600 dark:text-primary-400">73% more</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Access to a wider range of reliable information sources</p>
                      </li>
                      <li>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Topic Depth</span>
                          <span className="font-semibold text-primary-600 dark:text-primary-400">92% deeper</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">More thorough exploration of subtopics and related concepts</p>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Efficiency Metrics</h3>
                    <ul className="space-y-4">
                      <li>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Time Saved</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">80% reduction</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Significant reduction in research completion time</p>
                      </li>
                      <li>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Cost per Research</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">65% lower</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">More cost-effective than traditional research methods</p>
                      </li>
                      <li>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Processing Speed</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">4x faster</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Rapid processing and synthesis of research findings</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
                  <h3 className="mb-6 text-2xl font-bold">Real-world Impact</h3>
                  <div className="grid gap-8 sm:grid-cols-3">
                    <div className="text-center">
                      <p className="text-4xl font-bold">500+</p>
                      <p className="mt-2 text-sm text-green-100">Research Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold">10,000+</p>
                      <p className="mt-2 text-sm text-green-100">Hours Saved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl font-bold">95%</p>
                      <p className="mt-2 text-sm text-green-100">Client Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={activeTab === 'future' ? 'block' : 'hidden'}>
            <div className="not-prose mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Future Innovations</h2>
              <div className="mt-6 space-y-6 text-gray-600 dark:text-gray-300">
                <p className="text-lg leading-relaxed">
                  We are committed to pushing the boundaries of automated research technology. Our roadmap includes several groundbreaking 
                  features and improvements that will further enhance the research experience and capabilities of our platform.
                </p>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Advanced Verification</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Implementing blockchain-based source verification and advanced fact-checking algorithms.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      <span>Blockchain source tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      <span>Cross-reference validation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      <span>Real-time fact verification</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Real-time Collaboration</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Enabling multiple researchers to work together in real-time with shared insights.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                      <span>Live collaboration tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                      <span>Shared research spaces</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                      <span>Real-time updates</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Custom Templates</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    Domain-specific research templates with customized workflows and outputs.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                      <span>Industry-specific formats</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                      <span>Custom export options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400"></span>
                      <span>Workflow automation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-white">
                <h3 className="mb-6 text-2xl font-bold">Future Innovations</h3>
                <p className="mb-4 text-lg">
                  Our commitment to innovation drives us to continuously enhance our platform with cutting-edge features and capabilities.
                </p>
                <p className="text-sm text-purple-100">
                  Stay tuned for announcements about new features and improvements.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="not-prose mt-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-center text-white dark:from-primary-600 dark:to-primary-500">
            <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Research?</h2>
            <p className="mb-6 text-lg text-primary-100">
              Join thousands of researchers who are already saving time and getting better results with Deep Research.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-lg font-semibold text-primary-600 shadow-sm transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700"
            >
              Start Free Trial
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 