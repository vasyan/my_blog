import fs from 'fs';
import { Feed } from 'feed';
import { getSortedPostsData } from './posts';

export function generateRssFeed() {
  const allPosts = getSortedPostsData();
  const site_url = process.env.NEXT_PUBLIC_SITE_URL;

  const feedOptions = {
    title: 'Blog posts | RSS Feed',
    description: "Welcome to Vasilyator' posts!",
    id: site_url,
    link: site_url,
    language: "en",
    image: `${site_url}/favicon.ico`,
    favicon: `${site_url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Vasily Styazhkin`,
    generator: 'Feed for Node.js',
    author: {
      name: "Vasily Styahzkin",
      email: "vasilyator@gmail.com",
      link: site_url,
    },
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      json: `${site_url}/rss.json`,
      atom: `${site_url}/atom.xml`,
    },
  };

  const feed = new Feed(feedOptions as any);

  allPosts.forEach((post: any) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.id}`,
      link: `${site_url}/blog/${post.id}`,
      description: post.description,
      date: new Date(post.date),
    });
  });

  if (process.env.NEXT_PUBLIC_BUILD_ENV === 'production') {
    fs.writeFileSync('./public/rss.xml', feed.rss2());
    fs.writeFileSync('./public/rss.json', feed.json1());
    fs.writeFileSync('./public/atom.xml', feed.atom1());
  }
}
