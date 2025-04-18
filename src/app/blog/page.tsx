import type { Metadata } from 'next'
import { getSortedPostsData } from '../../../lib/posts'
import { generateRssFeed } from '../../../lib/generate-rss-feed'

export const metadata: Metadata = {
  title: 'Vasily Styazhkin blog',
  description: "My thoughts about technologies and more",
}


export default function Posts(props: any) {
  const allPostsData = getSortedPostsData();
  generateRssFeed();

  return (
    <main className="main-container">
      <div className="container">
        <ul className="">
          {allPostsData?.map((item: any) => {
            const { id, date, title, description, categories } = item
            return (
              <li className="" key={id}>
                <a className="heading-sub text-decoration-underline" href={`/blog/${id}`}>{title}</a>
                <p className="text-paragraph-small">{description}</p>
                {categories ? (
                  <p className="text-paragraph-small">{categories.map((v: any) => `#${v}`).join(' ')}</p>
                ) : null}
                <p className="text-paragraph-small">{date}</p>
                <hr />
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
