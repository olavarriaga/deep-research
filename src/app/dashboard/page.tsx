'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  BeakerIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { researchService } from '@/lib/research'
import type { ResearchSession } from '@/lib/research'

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSession, setCurrentSession] = useState<ResearchSession | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const sessionId = searchParams.get('session')
    if (sessionId) {
      const session = researchService.getSession(sessionId)
      if (session) {
        setCurrentSession(session)
      }
    }
  }, [searchParams])

  const handleNewResearch = () => {
    router.push('/')
  }

  const handleRefineQuery = async () => {
    if (!currentSession) return

    try {
      const session = await researchService.startResearch(currentSession.query)
      router.push(`/dashboard?session=${session.id}`)
    } catch (error) {
      console.error('Research error:', error)
      toast.error('Failed to refine research. Please try again.')
    }
  }

  const handleExport = async () => {
    if (!currentSession) return

    try {
      setIsExporting(true)
      const report = await researchService.exportReport(currentSession.id)
      
      // Create and download the report file
      const blob = new Blob([report], { type: 'text/markdown' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `research-report-${currentSession.id}.md`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('Report exported successfully')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export report. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const sessions = researchService.getSessions()

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <button
          onClick={handleNewResearch}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
        >
          <PlusIcon className="h-5 w-5" />
          New Research
        </button>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
            Past Research
          </h2>
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => router.push(`/dashboard?session=${session.id}`)}
              className={`w-full rounded-lg p-2 text-left transition-colors ${
                session.id === currentSession?.id
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {session.query}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {currentSession ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentSession.query}
              </h1>
            </div>

            <div className="mb-6 flex gap-4">
              <button
                onClick={handleRefineQuery}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <BeakerIcon className="h-5 w-5" />
                Refine Query
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <DocumentArrowDownIcon className="h-5 w-5" />
                {isExporting ? 'Exporting...' : 'Export Report'}
              </button>
            </div>

            {/* Research Results */}
            <div className="space-y-6">
              {currentSession.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Research Iteration {index + 1}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {result.timestamp.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                      <DocumentTextIcon className="h-5 w-5" />
                      Findings
                    </h4>
                    <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-400">
                      {result.learnings.map((learning, i) => (
                        <li key={i}>{learning}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                      <ArrowPathIcon className="h-5 w-5" />
                      Sources
                    </h4>
                    <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-400">
                      {result.visitedUrls.map((url, i) => (
                        <li key={i}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              Select a research session or start a new one
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 