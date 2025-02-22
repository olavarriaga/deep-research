import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-bold">Page Not Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400"
      >
        Return Home
      </Link>
    </div>
  )
} 