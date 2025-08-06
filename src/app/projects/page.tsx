import Image from 'next/image'

export default function ProjectsPage() {
  return (
    <main className="main-container d-flex align-items-center">
      <div className="container px-2">
        <div className="row justify-content-center">
          {[
            ['thai-ed', 'Thai learning app', 'My overingineered way to lear Thai language with repsonalized examples.', '/thai'],
            ['cathouse', 'Our offline feline heaven', `Experience Bangkok differently at Cathouse BKK by Nicha – where seven friendly cats make your stay unforgettable. Our cozy homestay combines Thai hospitality with purr-fect companionship!`, 'https://cathousebkk.com?ref=vasyan'],
            ['revfella', 'Motorcycle exhaust player for RevFella.com (RIP)', 'One day, I was wondering if there is any difference in the sound of aftermarket motorcycle exhausts. Here are the results of hours of audio editing using samples found on the internet ( it turned out - there is not )'],
            ['aperture', 'Photography aperture effect with css blur', 'Photography is cool. But CSS can be artistic also.'],
            ['life-in-weeks', 'My life in weeks', 'I got so much motivation to do stuff by just looking at how much time I did nothing.'],
          ].map(([id, title, description, url]) => <ProjectCard id={id} title={title} description={description} url={url} key={id} />)}
        </div>
      </div>
    </main>
  )
}

interface ProjectCardProps {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  url?: string;
}
function ProjectCard ({ id, title, description, url }: ProjectCardProps) {
  return (
    <div className="col-12 col-md-6 col-lg-4 p-1">
      <a
        className="card border flex-nowrap shadow-sm project-card-item"
        href={url ?? `/projects/${id}`}
      >
        <Image
          src={`/thumbs/${id}.jpg`}
          className="card-img-top" alt={`${id} project thumbnail`}
          height={350}
          width={300}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </a>
    </div>
  )
}
