import type { Metadata } from 'next'
import { getSortedPostsData } from '../../../lib/posts'
import { generateRssFeed } from '../../../lib/generate-rss-feed'
import { Navigation } from '../components/Navigation'

export const metadata: Metadata = {
  title: 'Vasily Styazhkin blog',
  description: "My toughts about technologies",
}


export default function Posts(props: any) {
  const allPostsData = getSortedPostsData();
  generateRssFeed();
  
  return (
    <>
      <Navigation path="/blog" />
      <main className="main-container">
        <div className="container">
          <ul className="">
            {allPostsData?.map(({ id, date, title, description }: any) => (
              <li className="" key={id}>
                <a className="heading-sub text-decoration-underline" href={`/blog/${id}`}>{title}</a>
                <p className="text-paragraph-small">{description}</p>
                <p className="text-paragraph-small">{date}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
