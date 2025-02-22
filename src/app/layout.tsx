import * as React from 'react'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/navigation'
import { AuthProvider } from '@/components/providers/AuthProvider'
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-gray-900`}>
        <AuthProvider>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1 pt-16">{children}</main>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
} 