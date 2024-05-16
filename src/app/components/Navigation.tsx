import React from 'react'
import Image from 'next/image'
import rssImgSrc from '../../../public/rss.svg'

interface NavigationProps {
  path: string;
}

export const Navigation = (props: NavigationProps) => {
  // const pathname = usePathname();
  const { path: pathname = '' } = props;

  return (
    <nav className={`navbar fixed-top navbar-light bg-body px-3 px-md-4 py-2 ${pathname !== '/' ? 'bottom-shadow' : ''}`}>
      <div className="px-0 d-flex w-100">
        <fieldset className="d-flex gap-1 flex-grow-1">
          <a href="/" className="d-flex align-content-center gap-1">
            <input type="radio" id="radio-home" name="nav" checked={pathname === '/'} />
            <label htmlFor="radio-home">Home</label>
          </a>
          <a href="/blog" className="d-flex align-content-center gap-1">
            <input type="radio" id="radio-blog" name="nav" checked={pathname.includes('/blog')}/>
            <label htmlFor="radio-home">Blog</label>
          </a>
          <a href="/contact-card-info" className="d-flex align-content-center gap-1">
            <input type="radio" id="radio-blog" name="nav" checked={pathname.includes('/contact-card')}/>
            <label htmlFor="radio-home">Contacts</label>
          </a>
          <a href="/projects" className="d-flex align-content-center gap-1">
            <input type="radio" id="radio-blog" name="nav" checked={pathname.includes('/projects')}/>
            <label htmlFor="radio-home">Projects</label>
          </a>
        </fieldset>
        <a
          className="img-rss"
          href="/rss.xml"
          rel="noreferrer"
          target="_blank"
        >
          <Image
            src={rssImgSrc}
            alt="rss feed"
            priority
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </a>
      </div>
    </nav>
  )
}
