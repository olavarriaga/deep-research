'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  KeyIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  CheckIcon,
  RocketLaunchIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { settingsService } from '@/lib/settings'
import type { ApiKeys } from '@/lib/settings'
import Link from 'next/link'

const FIRECRAWL_PLANS = [
  { id: 'free', name: 'Free', limits: '6 requests/min' },
  { id: 'hobby', name: 'Hobby', limits: '30 requests/min' },
  { id: 'standard', name: 'Standard', limits: '60 requests/min' },
  { id: 'growth', name: 'Growth', limits: '120 requests/min' },
] as const;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    openai: '',
    searchApi: '',
    firecrawlPlan: 'free',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load saved API keys
    const savedKeys = settingsService.getApiKeys()
    setApiKeys(savedKeys)
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await settingsService.saveApiKeys(apiKeys)
      setSaved(true)
      toast.success('API keys saved successfully')
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Failed to save API keys:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save API keys')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>

        {/* API Keys Section */}
        <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
            <KeyIcon className="h-6 w-6" />
            API Configuration
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label
                htmlFor="openai"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                OpenAI API Key
              </label>
              <input
                type="password"
                id="openai"
                value={apiKeys.openai}
                onChange={(e) =>
                  setApiKeys((prev) => ({ ...prev, openai: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="sk-..."
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="searchApi"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Search API Key
              </label>
              <input
                type="password"
                id="searchApi"
                value={apiKeys.searchApi}
                onChange={(e) =>
                  setApiKeys((prev) => ({ ...prev, searchApi: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your search API key"
                disabled={isLoading}
              />
            </div>

            {/* Firecrawl Plan Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Firecrawl Plan
              </label>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {FIRECRAWL_PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setApiKeys(prev => ({ ...prev, firecrawlPlan: plan.id as ApiKeys['firecrawlPlan'] }))}
                    className={`flex flex-col items-center justify-center rounded-lg border p-4 transition-all ${
                      apiKeys.firecrawlPlan === plan.id
                        ? 'border-primary-500 bg-primary-100 text-primary-800 shadow-md dark:border-primary-400 dark:bg-primary-900/40 dark:text-primary-300'
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <RocketLaunchIcon className="mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">{plan.name}</span>
                    <span className="mt-1 text-xs opacity-75">{plan.limits}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-400 disabled:opacity-50"
            >
              {saved ? (
                <>
                  <CheckIcon className="h-5 w-5" />
                  Saved!
                </>
              ) : isLoading ? (
                'Saving...'
              ) : (
                'Save API Keys'
              )}
            </button>
          </form>
        </section>

        {/* Theme Section */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Theme Preferences
          </h2>

          <div className="flex gap-4">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 ${
                theme === 'light'
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <SunIcon className="h-5 w-5" />
              Light
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 ${
                theme === 'dark'
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <MoonIcon className="h-5 w-5" />
              Dark
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 ${
                theme === 'system'
                  ? 'border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <ComputerDesktopIcon className="h-5 w-5" />
              System
            </button>
          </div>
        </section>
      </motion.div>
    </div>
  )
} 