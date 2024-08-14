export default function ProjectsPage() {
  return (
    <main className="main-container d-flex align-items-center">
      <div className="container px-2">
        <div className="row justify-content-center gap-2">
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="projects/aperture">
            <div>
              Photography aperture effect with css blur
            </div>
          </a>
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="projects/life-in-weeks">
            <div>
              My life in weeks
            </div>
          </a>
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="projects/revfella">
            <div>
              Motorcycle exhaust player for RevFella.com (RIP)
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
