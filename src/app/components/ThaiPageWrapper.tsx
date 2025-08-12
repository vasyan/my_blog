'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase'
import { User } from '@supabase/supabase-js'
import { ThaiAuthControls } from './ThaiAuthControls'
import { ReviewWidget } from './ReviewWidget'
import { getNextDueCard } from '../../../lib/review-api'

interface ThaiPageWrapperProps {
  children: React.ReactNode
  thaiContentId: number
}

export function ThaiPageWrapper({ children, thaiContentId }: ThaiPageWrapperProps) {
  const [user, setUser] = useState<User | null>(null)
  const [reviewMode, setReviewMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check auth state
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      // Check review mode from sessionStorage
      const savedReviewMode = sessionStorage.getItem('thai-review-mode') === 'true'
      setReviewMode(savedReviewMode && !!user)
      
      setLoading(false)
    }
    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setReviewMode(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleReviewModeChange = async (enabled: boolean) => {
    setReviewMode(enabled)
    
    // If entering review mode, navigate to the most urgent card
    if (enabled && user) {
      const nextCard = await getNextDueCard(user.id)
      if (nextCard && nextCard.thai_content_id !== thaiContentId) {
        router.push(`/thai/${nextCard.thai_content_id}`)
      }
      // If current card is the most urgent or no cards due, stay on current page
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main className="main-container">
      <div className="container px-2">
        {/* Auth controls header */}
        <div className="bg-light border-bottom py-2 mb-3">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              {/* <div className="d-flex align-items-center gap-3">
                <span className="fw-bold">Thai Learning App</span>
              </div> */}
              <ThaiAuthControls onReviewModeChange={handleReviewModeChange} />
            </div>
          </div>
        </div>

        {/* Main content */}
        {children}

        {/* Review widget - only show when in review mode */}
        {reviewMode && user && (
          <ReviewWidget userId={user.id} thaiContentId={thaiContentId} />
        )}
      </div>
    </main>
  )
}
