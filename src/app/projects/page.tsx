export default function ProjectsPage() {
  return (
    <main className="main-container d-flex align-items-center">
      <div className="container px-2">
        <div className="row justify-content-center gap-2">
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="/aperture">
            <div>
              Photography aperture effect with css blur
            </div>
          </a>
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="/life-in-weeks">
            <div>
              My life in weeks
            </div>
          </a>
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="#">
            <div>
              (RIP) Motorcycle exhaust player: <span className="text-decoration-underline d-inline">RevFella.com</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
