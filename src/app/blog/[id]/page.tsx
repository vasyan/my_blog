import type { Metadata, ResolvingMetadata } from 'next'
import { getPostById, getAllPostIds } from '../../../../lib/posts';
import './styles.scss'

type PageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Post({ params }: any) {
  const postData = await getPostById(params.id as string) as any;

  return (
    <main className="main-container pb-2">
      <div className="container">
        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </main>
  );
}

export const generateStaticParams = async () => {
  return getAllPostIds();
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
 
  const post = await getPostById(id) as any;
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: post.title,
    description: post.description
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  }
}
