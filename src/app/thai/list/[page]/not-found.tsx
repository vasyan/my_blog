import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="main-container">
      <div className="container text-center" style={{ padding: '4rem 0' }}>
        <h2>Page Not Found</h2>
        <p>The requested page of Thai content could not be found.</p>
        <Link href="/thai/list/1" className="text-decoration-underline">
          Go to first page
        </Link>
      </div>
    </main>
  )
}
