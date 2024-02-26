import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import remarkIgnore, { ignoreStart, ignoreEnd } from 'remark-ignore';
import stringify from 'rehype-stringify';
import remark2rehype from 'remark-rehype';
import remarkAttr from 'remark-attr';


// import markdown from 'remark-parse';
// import remark2rehype from 'remark-rehype';
// import html from 'rehype-stringify';

import { visit } from 'unist-util-visit';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      id: fileName.replace(/\.md$/, ''),
    };
  });
}

export async function getPostById(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // const result = await (new Promise((resolve, reject) => {
  //   engine(
  //     {
  //       color: true,
  //       extensions: ['md', 'markdown', 'mkd', 'mkdn', 'mkdown'],
  //       filePath: fullPath,
  //       ignoreName: '.remarkignore',
  //       packageField: 'remarkConfig',
  //       pluginPrefix: 'remark',
  //       processor: remark,
  //       rcName: '.remarkrc'
  //     },
  //     resolve
  //   )
  // }))

  // console.log('result', result);
  // const processedContent = await unified()
  const processedContent = await remark()
    .use(remarkParse)
    // .use((...args) => {
    //   console.log('args', args);
    // })
    .use(remarkIgnore)
    // .use(ignoreStart)
    .use(remarkAttr)
    // .use(remark2rehype)
    // .use(stringify)
    .use(remarkHtml)
    // .use(ignoreEnd)
    .process(matterResult.content);
    // .process(await read(fullPath));

  const contentHtml = String(processedContent);

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

