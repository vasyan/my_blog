import '../styles/styles.scss';
import { roboto } from '../styles/fonts';
import type { Metadata } from 'next'
import Script from 'next/script'

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
      {process.env.NEXT_PUBLIC_BUILD_ENV === 'production' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_TAG_MANAGER_ID}`} strategy="lazyOnload"/>
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_TAG_MANAGER_ID}');
            `}
          </Script>
        </>
      )}
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
