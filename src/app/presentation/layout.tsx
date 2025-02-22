import { ReactNode } from 'react'

export const metadata = {
  title: 'Presentation - Deep Research',
  description: 'Deep Research Project Presentation',
}

export default function PresentationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      {children}
    </div>
  )
} 