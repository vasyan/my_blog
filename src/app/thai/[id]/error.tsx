'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="main-container">
      <div className="container text-center" style={{ padding: '4rem 0' }}>
        <h2>Something went wrong!</h2>
        <p>There was a problem loading the Thai content.</p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
          <Link href="/thai" className="btn btn-outline-secondary">
            Go back to Thai content
          </Link>
        </div>
      </div>
    </main>
  );
} 
