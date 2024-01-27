import '../styles/styles.scss';
import { Navigation } from './components/Navigation'
import { roboto } from '../styles/fonts';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={[roboto.variable].join(' ')}>
      <body suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
