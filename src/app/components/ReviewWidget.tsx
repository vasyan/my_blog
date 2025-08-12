'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useReview } from '../hooks/useReview'
import { ReviewScore } from '../../../lib/review-api'
import { getNextDueCard } from '../../../lib/review-api'
import { buryCard } from '../../../lib/card-management'

interface ReviewWidgetProps {
  userId: string
  thaiContentId: number
}

export function ReviewWidget({ userId, thaiContentId }: ReviewWidgetProps) {
  const router = useRouter()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const {
    currentCard,
    loading,
    submitting,
    stats,
    intervalPreview,
    lastReviewResult,
    handleReview,
  } = useReview({ userId, thaiContentId })

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hide/show content based on flip state
  useEffect(() => {
    const elements = document.querySelectorAll('.hiddable-content')
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.filter = isFlipped ? 'none' : 'blur(8px)'
        el.style.userSelect = isFlipped ? 'auto' : 'none'
        el.style.pointerEvents = isFlipped ? 'auto' : 'none'
      }
    })
  }, [isFlipped])

  const handleReviewAndNavigate = async (score: ReviewScore) => {
    const success = await handleReview(score)
    
    if (success && score !== 0) {
      // Reset flip state for next card
      setIsFlipped(false)
      // For successful reviews (Not Good or Good), navigate to next card
      setTimeout(async () => {
        const nextCard = await getNextDueCard(userId)
        if (nextCard) {
          router.push(`/thai/${nextCard.thai_content_id}`)
        } else {
          // No more cards due, exit review mode
          sessionStorage.removeItem('thai-review-mode')
          window.location.reload() // Reload to update UI
        }
      }, 1500) // Brief delay to show success message
    } else if (success && score === 0) {
      // For failed reviews, optionally navigate to next card after a delay
      // or stay on the same page for immediate retry
      setTimeout(async () => {
        const nextCard = await getNextDueCard(userId)
        if (nextCard && nextCard.thai_content_id !== thaiContentId) {
          setIsFlipped(false) // Reset flip state
          router.push(`/thai/${nextCard.thai_content_id}`)
        }
        // If same card is due again, stay on the page
      }, 2000)
    }
  }

  const handleNextCard = async () => {
    setIsFlipped(false) // Reset flip state
    const nextCard = await getNextDueCard(userId)
    if (nextCard) {
      router.push(`/thai/${nextCard.thai_content_id}`)
    } else {
      // No more cards due
      sessionStorage.removeItem('thai-review-mode')
      window.location.reload()
    }
  }

  const handleBury = async () => {
    if (confirm('Bury this card? It will no longer appear in reviews.')) {
      const success = await buryCard(userId, thaiContentId)
      if (success) {
        // Navigate to next card after burying
        const nextCard = await getNextDueCard(userId)
        if (nextCard) {
          router.push(`/thai/${nextCard.thai_content_id}`)
        } else {
          // No more cards due
          sessionStorage.removeItem('thai-review-mode')
          window.location.reload()
        }
      } else {
        alert('Failed to bury card. Please try again.')
      }
    }
  }

  const getScoreText = (score: ReviewScore) => {
    switch (score) {
      case 0: return 'Very Bad 👎'
      case 1: return 'Not Good 😐'
      case 2: return 'Good 👍'
    }
  }

  const getScoreColor = (score: ReviewScore) => {
    switch (score) {
      case 0: return 'btn-danger'
      case 1: return 'btn-warning'
      case 2: return 'btn-success'
    }
  }

  const getIntervalText = (score: ReviewScore) => {
    if (!intervalPreview) return ''
    switch (score) {
      case 0: return intervalPreview.veryBad.description
      case 1: return intervalPreview.notGood.description
      case 2: return intervalPreview.good.description
    }
  }

  if (loading) {
    return (
      <div className={`review-widget card shadow-lg border-primary ${isMobile ? 'mobile-widget' : ''}`} style={
        isMobile ? {
          position: 'sticky',
          bottom: 0,
          width: '100%',
          borderRadius: '0',
          marginTop: '2rem'
        } : {
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '400px',
          maxWidth: '90vw',
          zIndex: 1000
        }
      }>
        <div className="card-body">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`review-widget card shadow-lg border-primary ${isMobile ? 'mobile-widget' : ''}`} style={
      isMobile ? {
        position: 'sticky',
        bottom: 0,
        width: '100%',
        borderRadius: '0',
        marginTop: '2rem',
        marginBottom: 0
      } : {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        maxWidth: '90vw',
        zIndex: 1000
      }
    }>
      <div className="card-header bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Review Mode</h5>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm btn-danger"
              onClick={handleBury}
              disabled={submitting}
              title="Bury this card - won't appear in reviews"
            >
              Bury
            </button>
            <button 
              className="btn btn-sm btn-light"
              onClick={handleNextCard}
              disabled={submitting}
            >
              Skip →
            </button>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        {stats && (
          <div className="mb-3">
            <div className="row text-center small">
              <div className="col-4">
                <div className="fw-bold text-primary">{stats.dueCards}</div>
                <div className="text-muted">Due</div>
              </div>
              <div className="col-4">
                <div className="fw-bold text-info">{stats.totalCards}</div>
                <div className="text-muted">Total</div>
              </div>
              <div className="col-4">
                <div className="fw-bold text-success">{stats.totalReviews}</div>
                <div className="text-muted">Reviews</div>
              </div>
            </div>
          </div>
        )}

        {lastReviewResult && (
          <div className={`alert ${lastReviewResult.score === 0 ? 'alert-warning' : 'alert-success'} mb-3 py-2`}>
            <small>
              <strong>
                {lastReviewResult.score === 0 ? '⚠️ ' : '✅ '}
                {lastReviewResult.message}
              </strong>
            </small>
          </div>
        )}

        {currentCard && currentCard.review_id && (
          <div className="alert alert-info mb-3 py-2 d-none d-sm-block">
            <small>
              Reviews: {currentCard.review_count} | 
              Difficulty: {currentCard.difficulty ? currentCard.difficulty.toFixed(1) : 'N/A'} | 
              State: {currentCard.state || 'New'}
              {currentCard.lapses && currentCard.lapses > 0 && (
                <> | Lapses: {currentCard.lapses}</>
              )}
            </small>
          </div>
        )}

        <div>
          {!isFlipped ? (
            <>
              <button
                onClick={() => setIsFlipped(true)}
                className="btn btn-primary btn-lg w-100"
                disabled={submitting}
              >
                <span className="fw-bold">🔄 Reveal</span>
              </button>
              <small className="text-muted d-block mt-2 text-center d-none d-sm-block">
                The translation and examples are hidden
              </small>
            </>
          ) : (
            <>
              <h6 className="mb-3">How well do you know this content?</h6>
              <div className="d-grid gap-2">
                {[0, 1, 2].map(score => (
                  <button
                    key={score}
                    onClick={() => handleReviewAndNavigate(score as ReviewScore)}
                    disabled={submitting}
                    className={`btn ${getScoreColor(score as ReviewScore)}`}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">
                        {getScoreText(score as ReviewScore)}
                      </span>
                      {getIntervalText(score as ReviewScore) && (
                        <small className="text-white-50">
                          {getIntervalText(score as ReviewScore)}
                        </small>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {submitting && (
          <div className="text-center mt-3">
            <div className="spinner-border text-primary spinner-border-sm" role="status">
              <span className="visually-hidden">Submitting...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
