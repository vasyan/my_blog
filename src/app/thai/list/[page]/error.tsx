'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="main-container">
      <div className="container text-center" style={{ padding: '4rem 0' }}>
        <h2>Something went wrong!</h2>
        <p>There was a problem loading this page of Thai content.</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => reset()}
          >
            Try again
          </button>
          <Link href="/thai/list/1" className="btn btn-outline-secondary">
            Go to first page
          </Link>
        </div>
      </div>
    </main>
  )
}
