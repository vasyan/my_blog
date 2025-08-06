export default function Loading() {
  return (
    <main className="main-container">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Thai Content - Loading...</h1>
        </div>
        
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading Thai content...</span>
          </div>
        </div>
      </div>
    </main>
  )
}
