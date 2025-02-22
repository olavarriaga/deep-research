'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BeakerIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const comparisonFeatures = [
    {
      feature: 'Research Depth',
      deepResearch: 'Multi-level recursive research with adjustable depth (1-5 levels)',
      chatGPT: 'Single-level responses based on training data',
      better: true,
    },
    {
      feature: 'Source Coverage',
      deepResearch: 'Multiple parallel queries with adjustable breadth (2-10 parallel paths)',
      chatGPT: 'Limited to training data cutoff date',
      better: true,
    },
    {
      feature: 'Real-time Data',
      deepResearch: 'Live web search and data gathering',
      chatGPT: 'Knowledge cutoff date limited',
      better: true,
    },
    {
      feature: 'Research Focus',
      deepResearch: 'AI-generated follow-up questions for targeted exploration',
      chatGPT: 'User must manually guide the conversation',
      better: true,
    },
    {
      feature: 'Cost Control',
      deepResearch: 'Transparent cost estimation based on depth and breadth',
      chatGPT: 'Subscription or per-message pricing',
      better: true,
    },
    {
      feature: 'Research History',
      deepResearch: 'Permanent storage and organization of research sessions',
      chatGPT: 'Limited chat history retention',
      better: true,
    },
    {
      feature: 'Export Options',
      deepResearch: 'Structured reports with categorized findings',
      chatGPT: 'Copy-paste from chat',
      better: true,
    },
    {
      feature: 'API Integration',
      deepResearch: 'Customizable API keys for OpenAI and search services',
      chatGPT: 'Fixed API without customization',
      better: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/30" />
              <BeakerIcon className="relative h-8 w-8 text-primary-600 dark:text-primary-400" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              Deep Research
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
            >
              Automate your research process using AI and advanced search algorithms. Get comprehensive insights and save hours of manual work.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <Link
                href="/login"
                className="rounded-lg bg-primary-600 px-6 py-2.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-400"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-base font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-16 dark:bg-gray-800/50 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose Deep Research?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our platform combines cutting-edge AI with powerful search capabilities to transform your research process.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'AI-Powered Research',
                description: 'Leverage advanced AI models to analyze and synthesize information from multiple sources.',
              },
              {
                title: 'Comprehensive Coverage',
                description: 'Access a wide range of sources and get deep insights with our recursive search algorithm.',
              },
              {
                title: 'Time Saving',
                description: 'Reduce research time by up to 80% with automated information gathering and analysis.',
              },
              {
                title: 'Customizable Depth',
                description: 'Control how deep you want to go with adjustable research parameters.',
              },
              {
                title: 'Smart Summaries',
                description: 'Get concise, relevant summaries of your research findings.',
              },
              {
                title: 'Export & Share',
                description: 'Easily export your research findings or share them with your team.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-gray-50 py-16 dark:bg-gray-900/50 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Deep Research vs ChatGPT
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
            >
              See how our specialized research platform compares to general-purpose AI chat
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <th scope="col" className="w-1/4 px-8 py-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Feature
                    </th>
                    <th scope="col" className="w-2/5 px-8 py-6 text-left">
                      <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                        Deep Research
                      </span>
                    </th>
                    <th scope="col" className="w-2/5 px-8 py-6 text-left">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                        ChatGPT
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisonFeatures.map((item, index) => (
                    <motion.tr
                      key={item.feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-900/50'}
                    >
                      <td className="whitespace-nowrap px-8 py-6 text-sm font-medium text-gray-900 dark:text-white">
                        {item.feature}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{item.deepResearch}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.chatGPT}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Technical Deep Dive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              href="/technical-paper"
              className="group inline-flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <span>Read our technical paper on recursive research methodology</span>
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Learn how our multi-level research algorithm achieves 87% better coverage compared to traditional approaches
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16 dark:bg-primary-500 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Research Process?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
              Join thousands of researchers who are already saving time and getting better results.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/signup"
                className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-primary-600 shadow-sm transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 dark:bg-gray-800 dark:text-primary-400 dark:hover:bg-gray-700"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 