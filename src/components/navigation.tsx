'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BeakerIcon, Cog6ToothIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <nav className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
        >
          <BeakerIcon className="h-6 w-6" />
          Deep Research
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className={`group relative rounded-lg p-2 transition-colors ${
              pathname === '/dashboard'
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <Squares2X2Icon className="h-5 w-5" />
            <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-all group-hover:opacity-100 dark:bg-gray-700">
              Dashboard
            </span>
          </Link>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="group relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-all group-hover:opacity-100 dark:bg-gray-700">
              Toggle theme
            </span>
          </button>

          <Link
            href="/settings"
            className={`group relative rounded-lg p-2 transition-colors ${
              pathname === '/settings'
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <Cog6ToothIcon className="h-5 w-5" />
            <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-all group-hover:opacity-100 dark:bg-gray-700">
              Settings
            </span>
          </Link>
        </div>
      </nav>
    </header>
  )
} 