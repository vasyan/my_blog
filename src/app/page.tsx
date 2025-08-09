import Image from 'next/image'
import type { Metadata } from 'next'
import heroImgSrc from '../../public/hero.svg'
import dockerImgSrc from '../../public/docker.svg'
import awsImgSrc from '../../public/aws.svg'
import nodejsImgSrc from '../../public/nodejs.svg'
import reactjsImgSrc from '../../public/reactjs.svg'
import postgresImgSrc from '../../public/postgres.svg'
import typescriptImgSrc from '../../public/typescript.svg'

export const metadata: Metadata = {
  title: 'Vasily Styazhkin - FullStack Developer',
  description: "Experienced web developer specializing in custom web solutions. Discover my portfolio for impressive designs and seamless functionality.",
  alternates: {
    canonical: "https://vasilyator.com",
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: 'rss' },
      ],
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default function Home() {
  return (
    <>
      <main className="main-container">
        <div className="container">
          <section id="hero" className="section d-flex flex-column flex-lg-row-reverse justify-content-center align-items-center">
            <div className="img-hero mb-2 col-lg-4">
              <Image
                src={heroImgSrc}
                alt=""
                priority
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className="text-md-center text-lg-start hero-text-block">
              <h1 className="hero-heading mb-2">Vasily Styazhkin</h1>
              <p className="text-paragraph mb-3">
                Code since 2013. Email me at <a href="mailto:vasilyator@gmail.com">vasilyator@gmail.com</a>
              </p>

              <p className="mb-0 text-nowrap btn btn-warning">
                Check out my <a href="/thai/list/1">Thai App</a>
              </p>
            </div>
          </section>
        </div>
        <div className="container">
          <section id="technologies" className="section pb-4">
            <h2 className="heading-small pb-2 topics-header text-md-center col-12 col-md-8 mx-auto">Technologies</h2>
            <div className="row">
              {[
                [typescriptImgSrc, 'typescript'],
                [nodejsImgSrc, 'nodejs'],
                [postgresImgSrc, 'postgres'],
                [reactjsImgSrc, 'reactjs'],
                [dockerImgSrc, 'docker'],
                [awsImgSrc, 'aws'],
              ].map(([src, alt]) => (
                <div className="col-4 col-lg" key={src}>
                  <Image
                    src={src}
                    alt={alt}
                    title={alt}
                    priority
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="footer pb-2">
        <hr className="m-0 mb-2"/>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-2 text-color-secondary">
          Styazhkin <a href="https://www.nesusvet.com/?lang=en&ref=vasyan">Brothers</a> © 2025
        </div>
      </footer>
    </>
  )
}
