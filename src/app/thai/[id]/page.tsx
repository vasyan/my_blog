import type { Metadata, ResolvingMetadata } from 'next'
import { getThaiContentById, getAllThaiIds } from '../../../../lib/thai-content'
import { notFound } from 'next/navigation'
import { AudioPlayer } from '../../components/AudioPlayer'
import './styles.scss'
import Link from 'next/link'

type PageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ThaiPage({ params }: PageProps) {
  try {
    // Ensure ID is properly passed as expected by the API
    const thaiData = await getThaiContentById(params.id);
    
    return (
      <main className="main-container d-flex align-items-center">
        <div className="container px-2">
        <div className="container px-2">
          <nav>
            <Link href="/thai/list/1">Back to list</Link>
          </nav>
        </div>
          <h1>{thaiData.front}</h1>
          <h3 className="mb-4">{thaiData.back}</h3>
          
          <div className="thai-content">
            {/* <div className="thai-script">
              <p className="thai-text">
                {thaiData.front}
              </p>
              <p className="text-muted">{thaiData.back}</p>
            </div> */}
            
            {thaiData.examples.length > 0 && (
              <div className="usage-examples">
                <h3>Usage Examples:</h3>
                {thaiData.examples.map((example) => {
                  const topAsset = example.assets?.[0];

                  return (
                    <div key={example.id}>
                      <div className="d-flex gap-2 align-items-center">
                        <div>
                          <h3 className="mb-0">{example.native_text}</h3>
                        </div>
                        {topAsset && (
                          <div key={topAsset.id} className="audio-example">
                            <AudioPlayer 
                              base64Data={topAsset.asset_data}
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-muted">{example.ipa}</p>
                      <p className="text-muted">{example.body_text}</p>
                      <p className="text-muted">{example.extra}</p>
                      <hr/>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    );
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
      title: thaiData.front,
      description: thaiData.back
    };
  } catch (error) {
    return {
      title: 'Content Not Found',
      description: 'The requested Thai content could not be found'
    };
  }
} 
