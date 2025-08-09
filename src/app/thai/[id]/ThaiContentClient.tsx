'use client'

import { ThaiPageWrapper } from '../../components/ThaiPageWrapper'
import { AudioPlayer } from '../../components/AudioPlayer'
import Link from 'next/link'
import { useMemo } from 'react'

interface ThaiContentClientProps {
  thaiData: any
  thaiContentId: number
}

export function ThaiContentClient({ thaiData, thaiContentId }: ThaiContentClientProps) {
  const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : null
  const isReviewMode = useMemo(() => sessionStorage?.getItem('thai-review-mode') === 'true', [sessionStorage])

  const targetItemFragment = thaiData.examples.find((fragment: any) => fragment.fragment_type === 'target_learning_item')
  const examples = thaiData.examples.filter((fragment: any) => fragment.id !== targetItemFragment.id)

  return (
    <ThaiPageWrapper thaiContentId={thaiContentId}>
      <main className=" d-md-flex d-sm-block align-items-center py-sm-1 py-md-2">
        <div className="container px-md-2 px-sm-0">
          {!isReviewMode && (
            <nav className="mb-2">
              <Link href="/thai/list/1">Back</Link>
            </nav>
          )}
          <h1 className="mb-2">{thaiData.front}</h1>
          {targetItemFragment && targetItemFragment.assets.length > 0 && (
            <div key={targetItemFragment.id} className="audio-example mb-2 d-flex justify-content-center">
              <AudioPlayer 
                base64Data={targetItemFragment.assets[0].asset_data}
              />
            </div>
          )}
          <h3 className="mb-4 hiddable-content">{thaiData.back}</h3>
          
          <div className="thai-content">
            {examples.length > 0 && (
              <div className="usage-examples hiddable-content">
                <h3>Usage Examples:</h3>
                {examples.map((example: any) => {
                  const topAsset = example.assets?.[0];

                  return (
                    <div key={example.id}>
                      <div className="d-flex gap-2 align-items-center mb-2">
                        <h3 className="mb-0 text-nowrap" style={{ fontSize: '1.2rem' }}>{example.native_text}</h3>
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
