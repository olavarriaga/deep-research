'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BeakerIcon, Cog6ToothIcon, Squares2X2Icon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useSession, signOut } from 'next-auth/react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { data: session } = useSession()

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <nav className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
        >
          <BeakerIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          <span>Deep Research</span>
        </Link>

        <div className="flex items-center gap-2">
          {session ? (
            <>
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

              <Menu as="div" className="relative">
                <Menu.Button className="group relative rounded-lg p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800">
                  <UserCircleIcon className="h-5 w-5" />
                  <span className="absolute left-full ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-all group-hover:opacity-100 dark:bg-gray-700">
                    Account
                  </span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                    <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {session.user?.name || session.user?.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {session.user?.email}
                      </p>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            active
                              ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          ) : (
            pathname !== '/login' &&
            pathname !== '/signup' && (
              <Link
                href="/login"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
              >
                Sign in
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  )
}