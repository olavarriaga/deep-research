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
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { researchService } from '@/lib/research'
import type { ResearchSession } from '@/lib/research'

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentSession, setCurrentSession] = useState<ResearchSession | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

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

  // Group findings by category
  const groupFindingsByCategory = (findings: string[]) => {
    const categories = new Map<string, string[]>()
    
    findings.forEach(finding => {
      const words = finding.toLowerCase().split(' ')
      let category = ''
      
      if (words.some(w => ['performance', 'speed', 'benchmark', 'fps'].includes(w))) {
        category = 'Performance Analysis'
      } else if (words.some(w => ['feature', 'capability', 'support'].includes(w))) {
        category = 'Features and Capabilities'
      } else if (words.some(w => ['comparison', 'versus', 'compared', 'vs'].includes(w))) {
        category = 'Comparative Analysis'
      } else if (words.some(w => ['market', 'price', 'cost', 'value'].includes(w))) {
        category = 'Market Analysis'
      } else if (words.some(w => ['technical', 'specification', 'architecture'].includes(w))) {
        category = 'Technical Specifications'
      } else {
        category = 'General Findings'
      }
      
      const existing = categories.get(category) || []
      categories.set(category, [...existing, finding])
    })
    
    return categories
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const sessions = researchService.getSessions()

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Collapsible Sidebar */}
      <div className={`relative transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="fixed h-screen border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <div className={`flex h-full flex-col ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4">
              {!isSidebarCollapsed && (
                <h2 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Research History
                </h2>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isSidebarCollapsed ? (
                  <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            
            <button
              onClick={handleNewResearch}
              className={`mx-4 mb-6 flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 ${
                isSidebarCollapsed ? 'w-8 px-0' : ''
              }`}
            >
              <PlusIcon className="h-5 w-5" />
              {!isSidebarCollapsed && 'New Research'}
            </button>

            <div className="flex-1 space-y-2 overflow-y-auto p-4">
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
                  {isSidebarCollapsed ? (
                    '•'
                  ) : (
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(session.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {currentSession ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentSession.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Research conducted on {new Date(currentSession.timestamp).toLocaleString()}
              </p>
            </div>

            <div className="mb-6 flex gap-4">
              <button
                onClick={handleRefineQuery}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <BeakerIcon className="h-5 w-5" />
                Refine Research
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

            {/* Research Report */}
            <div className="prose prose-gray max-w-none dark:prose-invert">
              {/* Research Focus */}
              <div className="mb-8">
                <button
                  onClick={() => toggleSection('focus')}
                  className="flex w-full items-center gap-2 text-left"
                >
                  <ChevronDownIcon
                    className={`h-5 w-5 transform transition-transform ${
                      expandedSections['focus'] ? 'rotate-180' : ''
                    }`}
                  />
                  <h2 className="m-0">Research Focus</h2>
                </button>
                {expandedSections['focus'] && (
                  <div className="mt-4">
                    {currentSession.query.split('\n').slice(1).map((line, i) => {
                      if (line.startsWith('Q: ')) {
                        return (
                          <p key={i} className="mb-2 font-semibold">
                            {line.slice(3)}
                          </p>
                        )
                      } else if (line.startsWith('A: ')) {
                        return (
                          <p key={i} className="mb-4 ml-4 text-gray-600 dark:text-gray-400">
                            {line.slice(3)}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                )}
              </div>

              {/* Research Findings */}
              {currentSession.results.map((result, index) => {
                const categories = groupFindingsByCategory(result.learnings)
                
                return (
                  <div key={index} className="mb-8">
                    <button
                      onClick={() => toggleSection(`phase-${index}`)}
                      className="flex w-full items-center gap-2 text-left"
                    >
                      <ChevronDownIcon
                        className={`h-5 w-5 transform transition-transform ${
                          expandedSections[`phase-${index}`] ? 'rotate-180' : ''
                        }`}
                      />
                      <h2 className="m-0">Research Phase {index + 1}</h2>
                    </button>
                    
                    {expandedSections[`phase-${index}`] && (
                      <div className="mt-4">
                        {Array.from(categories.entries()).map(([category, findings], i) => (
                          <div key={i} className="mb-6">
                            <h3 className="mb-4 text-lg font-semibold">{category}</h3>
                            <div className="space-y-4">
                              {findings.map((finding, j) => (
                                <p key={j} className="text-gray-600 dark:text-gray-400">
                                  {finding}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                        
                        {/* Sources */}
                        <div className="mt-8">
                          <h3 className="mb-4 text-lg font-semibold">Reference Sources</h3>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {result.visitedUrls.map((url, i) => {
                              try {
                                const urlObj = new URL(url)
                                const title = urlObj.hostname
                                  .replace('www.', '')
                                  .split('.')
                                  .slice(0, -1)
                                  .join('.')
                                  .split('-')
                                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(' ')
                                return (
                                  <a
                                    key={i}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                  >
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                                      {title.charAt(0)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate font-medium">{title}</p>
                                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                        {urlObj.hostname}
                                      </p>
                                    </div>
                                  </a>
                                )
                              } catch {
                                return (
                                  <a
                                    key={i}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate rounded-lg border border-gray-200 bg-white p-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                  >
                                    {url}
                                  </a>
                                )
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
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