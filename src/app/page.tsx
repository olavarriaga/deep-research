'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { researchService } from '@/lib/research'
import { settingsService } from '@/lib/settings'
import { generateFeedback } from '@/feedback'

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentSessions, setRecentSessions] = useState<Array<{ id: string; query: string; timestamp: Date }>>([])
  const [feedbackQuestions, setFeedbackQuestions] = useState<string[]>([])
  const [feedbackAnswers, setFeedbackAnswers] = useState<string[]>([])
  const [showQuestions, setShowQuestions] = useState(false)
  const [depth, setDepth] = useState(2)
  const [breadth, setBreadth] = useState(4)

  useEffect(() => {
    const sessions = researchService.getSessions()
    setRecentSessions(sessions.slice(0, 3).map(s => ({
      id: s.id,
      query: s.query,
      timestamp: s.timestamp
    })))
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      toast.error('Please enter a research topic')
      return
    }

    if (!settingsService.hasValidApiKeys()) {
      toast.error('Please configure your API keys in Settings first')
      router.push('/settings')
      return
    }

    try {
      setIsLoading(true)
      const questions = await generateFeedback({ query: searchQuery })
      setFeedbackQuestions(questions)
      setFeedbackAnswers(new Array(questions.length).fill(''))
      setShowQuestions(true)
    } catch (error) {
      console.error('Feedback generation error:', error)
      toast.error('Failed to generate questions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartResearch = async () => {
    if (feedbackAnswers.some(answer => !answer.trim())) {
      toast.error('Please answer all questions')
      return
    }

    try {
      setIsLoading(true)
      const combinedQuery = `
Initial Query: ${searchQuery}
Follow-up Questions and Answers:
${feedbackQuestions.map((q, i) => `Q: ${q}\nA: ${feedbackAnswers[i]}`).join('\n')}
`
      const session = await researchService.startResearch(combinedQuery, breadth, depth)
      router.push(`/dashboard?session=${session.id}`)
    } catch (error) {
      console.error('Research error:', error)
      toast.error('Failed to start research. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl text-center"
      >
        <div className="mb-12">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto mb-6 h-24 w-24 text-primary-600 dark:text-primary-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 2v7.527a2 2 0 01-.211.896L4.72 20.55a1 1 0 001.832.785l1.055-2.47a1 1 0 011.832 0l1.055 2.47a1 1 0 001.832-.785l-5.069-10.127A2 2 0 016.046 9.527V2" />
              <path d="M14 2v7.527a2 2 0 00.211.896l5.069 10.127a1 1 0 01-1.832.785l-1.055-2.47a1 1 0 00-1.832 0l-1.055 2.47a1 1 0 01-1.832-.785l5.069-10.127a2 2 0 00.211-.896V2" />
            </svg>
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Deep Research
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Automate in-depth research using AI and external search APIs
          </p>
        </div>

        {!showQuestions ? (
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your research topic..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-12 text-lg shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400"
                disabled={isLoading}
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4">
                  <div className="flex h-8 items-center justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Research Depth
                    </label>
                    <div className="group relative">
                      <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <div className="absolute bottom-full right-0 mb-2 hidden w-48 rounded-lg border border-gray-200 bg-white p-2 text-xs text-gray-600 shadow-lg group-hover:block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        Controls how many levels of follow-up questions are explored (1-5)
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-left text-xs text-gray-500 dark:text-gray-400">
                    Deeper research explores more follow-up questions
                  </p>
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={depth}
                    onChange={(e) => setDepth(parseInt(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-600 dark:bg-gray-700"
                  />
                  <div className="flex items-center justify-between px-1 text-sm">
                    <span className="font-medium text-gray-500 dark:text-gray-400">Shallow</span>
                    <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                      {depth} Levels
                    </span>
                    <span className="font-medium text-gray-500 dark:text-gray-400">Deep</span>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                      Estimated Usage
                    </p>
                    <div className="mt-1 grid grid-cols-2 gap-2 text-center text-xs text-gray-500 dark:text-gray-400">
                      <div>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{depth * breadth * 1000}</span> input
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">{depth * breadth * 500}</span> output
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-4">
                  <div className="flex h-8 items-center justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                      Research Breadth
                    </label>
                    <div className="group relative">
                      <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <div className="absolute bottom-full right-0 mb-2 hidden w-48 rounded-lg border border-gray-200 bg-white p-2 text-xs text-gray-600 shadow-lg group-hover:block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        Controls how many parallel search queries are generated (2-10)
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-left text-xs text-gray-500 dark:text-gray-400">
                    Wider research covers more parallel topics
                  </p>
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-4">
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={breadth}
                    onChange={(e) => setBreadth(parseInt(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary-600 dark:bg-gray-700"
                  />
                  <div className="flex items-center justify-between px-1 text-sm">
                    <span className="font-medium text-gray-500 dark:text-gray-400">Focused</span>
                    <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                      {breadth} Queries
                    </span>
                    <span className="font-medium text-gray-500 dark:text-gray-400">Wide</span>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                      Estimated Cost
                    </p>
                    <div className="mt-1 grid grid-cols-1 text-center text-xs text-gray-500 dark:text-gray-400">
                      <div>
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          ${((depth * breadth * 1500) / 1000 * 0.03).toFixed(2)}
                        </span>
                        <span> USD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              {isLoading ? 'Generating Questions...' : 'Continue'}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-left"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Please answer these questions to help focus the research:
            </h2>
            <div className="space-y-4">
              {feedbackQuestions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {question}
                  </label>
                  <input
                    type="text"
                    value={feedbackAnswers[index]}
                    onChange={(e) => {
                      const newAnswers = [...feedbackAnswers]
                      newAnswers[index] = e.target.value
                      setFeedbackAnswers(newAnswers)
                    }}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Your answer..."
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowQuestions(false)
                  setFeedbackQuestions([])
                  setFeedbackAnswers([])
                }}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleStartResearch}
                disabled={isLoading}
                className="flex-1 rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-400"
              >
                {isLoading ? 'Starting Research...' : 'Start Research'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Recent Searches */}
        {!showQuestions && recentSessions.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Recent Searches
            </h2>
            <div className="space-y-2">
              {recentSessions.map(session => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-400"
                  onClick={() => router.push(`/dashboard?session=${session.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                      {session.query}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
} 