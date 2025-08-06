import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="main-container">
      <div className="container text-center" style={{ padding: '4rem 0' }}>
        <h2>Not Found</h2>
        <p>The requested Thai content could not be found.</p>
        <Link href="/thai" className="text-decoration-underline">
          Return to Thai content
        </Link>
      </div>
    </main>
  );
} 
