"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import rssImgSrc from '../../../public/rss.svg'

export const Navigation = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleNavigate = () => {
    const elem = ref.current?.querySelector('.collapse');
    if (!elem || !elem.classList.contains('show')) return;

    const { Collapse } = require('bootstrap');

    new Collapse(elem).hide(); 
  }

  return (
    <nav className="navbar fixed-top navbar-light bottom-shadow bg-body px-3 px-md-4 py-2" ref={ref}>
      <div className="px-0 d-flex w-100">
        <ul className="d-flex flex-row gap-2 navbar-nav w-100">
          <li className="nav-item">
            <a onClick={handleNavigate} className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a onClick={handleNavigate} className="nav-link" href="/blog">Blog</a>
          </li>
          <li className="nav-item">
            <a onClick={handleNavigate} className="nav-link" href="https://github.com/vasyan">Github</a>
          </li>
          <li className="nav-item">
            <a onClick={handleNavigate} className="nav-link" href="https://www.linkedin.com/in/styazhkinv/">LinkedIn</a>
          </li>
          <li className="nav-item">
            <a onClick={handleNavigate} className="nav-link" href="mailto:vasilyator@gmail.com">Mail</a>
          </li>
          <li className="nav-item">
            <a onClick={handleNavigate} className="nav-link" href="https://revfella.com">RevFella</a>
          </li>
        </ul>
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