import type { Metadata, ResolvingMetadata } from 'next'
import { getThaiContentById, getAllThaiIds } from '../../../../lib/thai-content'
import { notFound } from 'next/navigation'
import { ThaiContentClient } from './ThaiContentClient'
import './styles.scss'

type PageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ThaiPage({ params }: PageProps) {
  try {
    // Ensure ID is properly passed as expected by the API
    const thaiData = await getThaiContentById(params.id);
    const thaiContentId = parseInt(params.id, 10);

    return <ThaiContentClient thaiData={thaiData} thaiContentId={thaiContentId} />;
  } catch (error) {
    console.error('Error fetching Thai content:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  return getAllThaiIds();
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const id = params.id;
    const thaiData = await getThaiContentById(id);
    
    return {
      title: `Thai word "${thaiData.front}" with examples`,
      description: `Learn Thai word "${thaiData.front}" with examples`,
      openGraph: {
        title: `Thai word "${thaiData.front}" with examples`,
        description: `Learn Thai word "${thaiData.front}" with examples`,
      }
    };
  } catch (error) {
    return {
      title: 'Content Not Found',
      description: 'The requested Thai content could not be found'
    };
  }
} 
