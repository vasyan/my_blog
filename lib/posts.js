import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse'
import { unified } from 'unified'

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

function remarkIgnore() {
  return (tree) => {
    visit(tree, 'html', (node, index, parent) => {
      // console.log('visit', node.value);
      if (node.value.includes('<!--remark-ignore-start-->')) {
        let endIndex = index;
        while (endIndex < parent.children.length) {
          if (parent.children[endIndex].type === 'html' &&
            parent.children[endIndex].value.includes('<!--remark-ignore-end-->')) {
            // console.log('endIndex', endIndex);
              
            break;
          }
          endIndex++;
        }
        parent.children.splice(index, endIndex - index + 1);
      }
    });
  };
}

export async function getPostById(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(matterResult.content);

  const contentHtml = String(processedContent);

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

