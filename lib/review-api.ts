import { createClient } from './supabase'
import { fsrsScheduler, mapScoreToFSRSRating } from './fsrs-scheduler'
import { State } from 'ts-fsrs'

export interface DueCard {
	thai_content_id: number
	review_id?: string
	ease_factor?: number
	interval_days?: number
	review_count?: number
	next_review?: string
	// FSRS fields
	stability?: number
	difficulty?: number
	lapses?: number
	state?: string
}

export type ReviewScore = 0 | 1 | 2 // Very Bad | Not Good | Good

/**
 * Get the next card due for review for a specific user
 * Returns either a due review or a new unreviewed card
 */
export async function getNextDueCard(userId: string): Promise<DueCard | null> {
	const supabase = createClient()

	// First, try to get a due review
	const { data: dueReviews } = await supabase
		.from('user_card_reviews')
		.select('*')
		.eq('user_id', userId)
		.lte('next_review', new Date().toISOString())
		.order('next_review', { ascending: true })
		.limit(1)

	if (dueReviews && dueReviews.length > 0) {
		const review = dueReviews[0]
		return {
			thai_content_id: review.thai_content_id,
			review_id: review.id,
			ease_factor: review.ease_factor,
			interval_days: review.interval_days,
			review_count: review.review_count,
			next_review: review.next_review,
			stability: review.stability,
			difficulty: review.difficulty,
			lapses: review.lapses,
			state: review.state,
		}
	}

	// If no due reviews, get a new unreviewed card
	// We need to get all reviewed card IDs first, then find one that's not in that list
	const { data: reviewedCards } = await supabase
		.from('user_card_reviews')
		.select('thai_content_id')
		.eq('user_id', userId)

	const reviewedIds = reviewedCards?.map(r => r.thai_content_id) || []

	// For now, let's return a simple incremental ID that hasn't been reviewed
	// In the future, you might want to get this from your Thai API
	// For MVP, we'll start with ID 1 and increment
	let candidateId = 1
	while (reviewedIds.includes(candidateId)) {
		candidateId++
		// Safety check - don't go beyond reasonable limits
		if (candidateId > 1000) {
			return null // No more cards available
		}
	}

	return {
		thai_content_id: candidateId,
	}
}

/**
 * Submit a review for a card and update the spaced repetition schedule using FSRS
 */
export async function submitReview(
	userId: string,
	thaiContentId: number,
	score: ReviewScore,
	existingReview?: {
		id: string
		ease_factor: number
		interval_days: number
		review_count: number
		stability?: number
		difficulty?: number
		lapses?: number
		state?: string
	}
): Promise<boolean> {
	const supabase = createClient()
	const fsrsRating = mapScoreToFSRSRating(score)

	if (existingReview) {
		// Convert existing review to FSRS card
		const card = fsrsScheduler.databaseToCard({
			next_review: new Date().toISOString(), // Will be recalculated
			ease_factor: existingReview.ease_factor,
			interval_days: existingReview.interval_days,
			review_count: existingReview.review_count,
			stability: existingReview.stability,
			difficulty: existingReview.difficulty,
			lapses: existingReview.lapses,
			state: existingReview.state,
			last_reviewed: new Date().toISOString(),
		})

		// Schedule next review using FSRS
		const result = fsrsScheduler.scheduleReview(card, fsrsRating)
		const dbData = fsrsScheduler.cardToDatabase(result.card)

		// Update existing review
		const { error } = await supabase
			.from('user_card_reviews')
			.update({
				last_reviewed: new Date().toISOString(),
				next_review: dbData.next_review,
				ease_factor: dbData.ease_factor,
				interval_days: dbData.interval_days,
				review_count: dbData.review_count,
				last_score: score,
				// FSRS fields
				stability: dbData.stability,
				difficulty: dbData.difficulty,
				lapses: dbData.lapses,
				state: dbData.state,
				scheduled_days: dbData.interval_days,
				elapsed_days: 0,
			})
			.eq('id', existingReview.id)

		if (error) {
			console.error('Error updating review:', error)
			return false
		}
	} else {
		// Create new card and schedule first review
		const newCard = fsrsScheduler.createNewCard()
		const result = fsrsScheduler.scheduleReview(newCard, fsrsRating)
		const dbData = fsrsScheduler.cardToDatabase(result.card)

		// Create new review
		const { error } = await supabase
			.from('user_card_reviews')
			.insert({
				user_id: userId,
				thai_content_id: thaiContentId,
				last_reviewed: new Date().toISOString(),
				next_review: dbData.next_review,
				ease_factor: dbData.ease_factor,
				interval_days: dbData.interval_days,
				review_count: 1,
				last_score: score,
				// FSRS fields
				stability: dbData.stability,
				difficulty: dbData.difficulty,
				lapses: dbData.lapses,
				state: dbData.state,
				scheduled_days: dbData.interval_days,
				elapsed_days: 0,
			})

		if (error) {
			console.error('Error creating review:', error)
			return false
		}
	}

	return true
}

/**
 * Get review statistics for a user
 */
export async function getReviewStats(userId: string) {
	const supabase = createClient()

	const { data: reviews } = await supabase
		.from('user_card_reviews')
		.select('next_review, review_count, state, lapses')
		.eq('user_id', userId)

	if (!reviews) return null

	const now = new Date().toISOString()
	const dueCount = reviews.filter(r => r.next_review <= now).length
	const totalReviews = reviews.reduce((sum, r) => sum + r.review_count, 0)
	
	// Additional FSRS-specific stats
	const learningCards = reviews.filter(r => r.state === State.Learning).length
	const reviewCards = reviews.filter(r => r.state === State.Review).length
	const relearningCards = reviews.filter(r => r.state === State.Relearning).length
	const totalLapses = reviews.reduce((sum, r) => sum + (r.lapses || 0), 0)

	return {
		totalCards: reviews.length,
		dueCards: dueCount,
		totalReviews,
		// New FSRS stats
		learningCards,
		reviewCards,
		relearningCards,
		totalLapses,
	}
}

/**
 * Get scheduling preview for a card
 * Shows what intervals the user will get for each rating option
 */
export async function getSchedulingPreview(
	existingReview?: {
		ease_factor: number
		interval_days: number
		review_count: number
		stability?: number
		difficulty?: number
		lapses?: number
		state?: string
		last_reviewed?: string
	}
) {
	const card = existingReview
		? fsrsScheduler.databaseToCard({
				next_review: new Date().toISOString(),
				ease_factor: existingReview.ease_factor,
				interval_days: existingReview.interval_days,
				review_count: existingReview.review_count,
				stability: existingReview.stability,
				difficulty: existingReview.difficulty,
				lapses: existingReview.lapses,
				state: existingReview.state,
				last_reviewed: existingReview.last_reviewed,
		  })
		: fsrsScheduler.createNewCard()

	const options = fsrsScheduler.getSchedulingOptions(card)

	// Map to our 3-rating system
	return {
		veryBad: {
			interval: options.again.interval,
			description: fsrsScheduler.getNextReviewDescription(options.again.nextReview),
		},
		notGood: {
			interval: options.hard.interval,
			description: fsrsScheduler.getNextReviewDescription(options.hard.nextReview),
		},
		good: {
			interval: options.good.interval,
			description: fsrsScheduler.getNextReviewDescription(options.good.nextReview),
		},
	}
}