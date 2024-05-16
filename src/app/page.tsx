import type { Metadata } from 'next'
import Script from 'next/script';
import { Navigation } from './components/Navigation';

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
      <Navigation path="/" />
      {/* <Script id="poopaloopa">{import('./lab/script.ts')}</Script> */}
      <main className="draw-here">
      </main>
      <footer className="footer pb-2">
        <hr className="m-0 mb-2"/>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-2 text-color-secondary">
          Styazhkin Vasily © 2024
        </div>
      </footer>
      <Script src="/checkboxing.js" strategy='worker'/>
    </>
  )
}
