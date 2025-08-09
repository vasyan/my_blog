'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../../../../lib/supabase'
import { User } from '@supabase/supabase-js'
import { ThaiAuthControls } from '../../../components/ThaiAuthControls'
import { getNextDueCard } from '../../../../../lib/review-api'

interface ThaiListClientProps {
  content: any[]
  pagination: any
  pageNumber: number
}

export function ThaiListClient({ content, pagination, pageNumber }: ThaiListClientProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check auth state
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleReviewModeChange = async (enabled: boolean) => {
    // If entering review mode, navigate to the most urgent card
    if (enabled && user) {
      const nextCard = await getNextDueCard(user.id)
      if (nextCard) {
        router.push(`/thai/${nextCard.thai_content_id}`)
      } else {
        alert('No cards due for review!')
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="main-container d-flex align-items-center">
      <div className="container px-2">
      {/* Auth controls header */}
      <div className="bg-light border-bottom py-2 mb-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center gap-2">
            <span className="fw-bold text-nowrap">Thai Learning App</span>
            <ThaiAuthControls onReviewModeChange={handleReviewModeChange} />
          </div>
        </div>
      </div>

      <div>
        <div className="container px-2">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4">
            <h1>Thai Content: <span className="text-nowrap">Page {pageNumber}</span></h1>
            <div className="pagination-info">
              <span className="text-muted">
                Showing {content.length} items
              </span>
            </div>
          </div>

          <ul className="list-unstyled">
            {content.map((item) => (
              <li key={item.id} className="mb-4">
                <Link 
                  href={`/thai/${item.id}`}
                  className="card border flex-nowrap shadow-sm project-card-item text-decoration-none"
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title}
                    </h5>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <p className="card-text">
                          <strong>IPA:</strong> {item.content_metadata.ipa_transcript}
                        </p>
                        <p className="card-text">
                          <strong>Type:</strong> {item.content_type}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Pagination Navigation */}
          <nav aria-label="Thai content pagination" className="mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {pageNumber > 1 && (
                  <Link 
                    href={`/thai/list/${pageNumber - 1}`}
                    className="btn btn-link"
                  >
                    ← Previous
                  </Link>
                )}
              </div>
              
              <div className="text-muted">Page {pageNumber}</div>
              
              <div>
                {pagination.has_next && (
                  <Link 
                    href={`/thai/list/${pageNumber + 1}`}
                    className="btn btn-link"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      </div>
    </main>
  )
}
