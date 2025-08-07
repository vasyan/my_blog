'use client'

import { useState, useEffect, useCallback } from 'react'
import { getNextDueCard, submitReview, getReviewStats, getSchedulingPreview, type DueCard, ReviewScore } from '../../../lib/review-api'

export interface UseReviewOptions {
  userId: string
  thaiContentId?: number
}

export function useReview({ userId, thaiContentId }: UseReviewOptions) {
  const [currentCard, setCurrentCard] = useState<DueCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [intervalPreview, setIntervalPreview] = useState<any>(null)
  const [lastReviewResult, setLastReviewResult] = useState<{ score: ReviewScore; message: string } | null>(null)

  // Load card data for specific Thai content ID
  const loadCardData = useCallback(async () => {
    if (!userId || !thaiContentId) return

    setLoading(true)
    try {
      // Check if this specific card has a review
      const { createClient } = await import('../../../lib/supabase')
      const supabase = createClient()
      
      const { data: existingReview } = await supabase
        .from('user_card_reviews')
        .select('*')
        .eq('user_id', userId)
        .eq('thai_content_id', thaiContentId)
        .single()

      const card: DueCard = existingReview ? {
        thai_content_id: thaiContentId,
        review_id: existingReview.id,
        ease_factor: existingReview.ease_factor,
        interval_days: existingReview.interval_days,
        review_count: existingReview.review_count,
        next_review: existingReview.next_review,
        stability: existingReview.stability,
        difficulty: existingReview.difficulty,
        lapses: existingReview.lapses,
        state: existingReview.state,
      } : {
        thai_content_id: thaiContentId
      }

      setCurrentCard(card)

      // Load interval preview
      if (card.review_id) {
        const preview = await getSchedulingPreview({
          ease_factor: card.ease_factor!,
          interval_days: card.interval_days!,
          review_count: card.review_count!,
          stability: card.stability,
          difficulty: card.difficulty,
          lapses: card.lapses,
          state: card.state,
        })
        setIntervalPreview(preview)
      } else {
        const preview = await getSchedulingPreview()
        setIntervalPreview(preview)
      }
    } catch (error) {
      console.error('Error loading card data:', error)
    } finally {
      setLoading(false)
    }
  }, [userId, thaiContentId])

  // Load stats
  const loadStats = useCallback(async () => {
    if (!userId) return
    const reviewStats = await getReviewStats(userId)
    setStats(reviewStats)
  }, [userId])

  // Handle review submission
  const handleReview = useCallback(async (score: ReviewScore) => {
    if (!currentCard || !userId || submitting) return false

    setSubmitting(true)
    setLastReviewResult(null)

    const existingReview = currentCard.review_id
      ? {
          id: currentCard.review_id,
          ease_factor: currentCard.ease_factor!,
          interval_days: currentCard.interval_days!,
          review_count: currentCard.review_count!,
          stability: currentCard.stability,
          difficulty: currentCard.difficulty,
          lapses: currentCard.lapses,
          state: currentCard.state,
        }
      : undefined

    const success = await submitReview(userId, currentCard.thai_content_id, score, existingReview)

    if (success) {
      // For failed reviews (Very Bad), set warning message
      if (score === 0) {
        setLastReviewResult({
          score: 0,
          message: "Card scheduled for review shortly. Continue reviewing other cards!"
        })
      } else {
        setLastReviewResult({
          score,
          message: "Review submitted successfully!"
        })
      }
      
      await loadStats()
      // Reload card data to get updated state
      await loadCardData()
    }

    setSubmitting(false)
    return success
  }, [currentCard, userId, submitting, loadStats, loadCardData])

  // Get next due card for navigation
  const getNextCard = useCallback(async () => {
    if (!userId) return null
    return await getNextDueCard(userId)
  }, [userId])

  // Initial load
  useEffect(() => {
    if (userId && thaiContentId) {
      loadCardData()
      loadStats()
    }
  }, [userId, thaiContentId, loadCardData, loadStats])

  return {
    currentCard,
    loading,
    submitting,
    stats,
    intervalPreview,
    lastReviewResult,
    handleReview,
    getNextCard,
    reload: loadCardData,
  }
}