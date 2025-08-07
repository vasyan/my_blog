'use client'

import { ThaiPageWrapper } from '../../components/ThaiPageWrapper'
import { AudioPlayer } from '../../components/AudioPlayer'
import Link from 'next/link'

interface ThaiContentClientProps {
  thaiData: any
  thaiContentId: number
}

export function ThaiContentClient({ thaiData, thaiContentId }: ThaiContentClientProps) {
  return (
    <ThaiPageWrapper thaiContentId={thaiContentId}>
      <main className="main-container d-flex align-items-center">
        <div className="container px-2">
          <div className="container px-2">
            <nav>
              <Link href="/thai/list/1">Back to list</Link>
            </nav>
          </div>
          <h1>{thaiData.front}</h1>
          <h3 className="mb-4 hiddable-content">{thaiData.back}</h3>
          
          <div className="thai-content">
            {thaiData.examples.length > 0 && (
              <div className="usage-examples hiddable-content">
                <h3>Usage Examples:</h3>
                {thaiData.examples.map((example: any) => {
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
    </ThaiPageWrapper>
  )
}
