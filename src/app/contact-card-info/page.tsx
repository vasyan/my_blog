export default function ContactCardInfo() {
  return (
    <main className="main-container d-flex align-items-center">
      <div className="container px-2">
        <div className="row justify-content-center gap-2">
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="tel:+660633304626">
            <div>
              Call: <span className="text-decoration-underline d-inline">+666 333 0 46 26</span>
            </div>
          </a>
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="mailto:vasilyator@gmail.com">
            <div>
              Mail: <span className="text-decoration-underline">vasilyator@gmail.com</span>
            </div>
          </a>
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="https://www.linkedin.com/in/styazhkinv">
            <div>
              LinkedIn: <span className="text-decoration-underline">#styazhkinv</span>
            </div>
          </a>
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="https://t.me/vasilyator">
            <div>
              Telegram: <span className="text-decoration-underline">@vasilyator</span>
            </div>
          </a>
          <a className="col-12 col-md-6 card border p-2 flex-nowrap shadow-sm contact-card-item" href="https://docs.google.com/document/d/1Ezvjj1htxyeDSfk6eO5T4AwxJ6pPhWbm6FI5FkruZ8o/edit?usp=sharing">
            <div>
              CV
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
