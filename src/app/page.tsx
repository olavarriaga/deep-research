'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { researchService } from '@/lib/research'
import { settingsService } from '@/lib/settings'

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentSessions, setRecentSessions] = useState<Array<{ id: string; query: string; timestamp: Date }>>([])

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
      const session = await researchService.startResearch(searchQuery)
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

        <form onSubmit={handleSearch} className="space-y-4">
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-400"
          >
            {isLoading ? 'Starting Research...' : 'Start Research'}
          </button>
        </form>

        {/* Recent Searches */}
        {recentSessions.length > 0 && (
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