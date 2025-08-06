export default function Loading() {
  return (
    <main className="main-container">
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading-ding-ding...</span>
        </div>
      </div>
    </main>
  );
} 
