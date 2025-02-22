import * as React from 'react'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/navigation'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { headers } from 'next/headers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Deep Research',
  description: 'Automate in-depth research using AI and external search APIs',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const isPresentation = pathname.startsWith('/presentation')

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900`}>
        <AuthProvider>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              {!isPresentation && <Navigation />}
              <main className={!isPresentation ? "flex-1 pt-16" : "flex-1"}>
                {children}
              </main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
} 