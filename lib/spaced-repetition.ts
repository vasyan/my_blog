export interface ReviewResult {
	ease_factor: number
	interval_days: number
	next_review: Date
}

export type ReviewScore = 0 | 1 | 2 // Very Bad | Not Good | Good

/**
 * Calculate next review based on spaced repetition algorithm (simplified SM2)
 * @param currentEase Current ease factor (starts at 2.5)
 * @param currentInterval Current interval in days
 * @param reviewCount Number of times this card has been reviewed
 * @param score User's rating: 0=Very Bad, 1=Not Good, 2=Good
 * @returns New ease factor, interval, and next review date
 */
export function calculateNextReview(
	currentEase: number,
	currentInterval: number,
	reviewCount: number,
	score: ReviewScore
): ReviewResult {
	let ease_factor = currentEase
	let interval_days: number

	// Adjust ease factor based on score
	if (score === 0) {
		// Very Bad - significant penalty
		ease_factor = Math.max(1.3, ease_factor - 0.2)
		interval_days = 1 // Reset to 1 day
	} else if (score === 1) {
		// Not Good - moderate penalty
		ease_factor = Math.max(1.3, ease_factor - 0.15)
		interval_days = 1 // Reset to 1 day
	} else {
		// Good - increase ease factor slightly
		ease_factor = ease_factor + (0.1 - (3 - score) * (0.08 + (3 - score) * 0.02))

		// Calculate next interval based on review count
		if (reviewCount === 0) {
			interval_days = 1 // First review: 1 day
		} else if (reviewCount === 1) {
			interval_days = 6 // Second review: 6 days
		} else {
			// Subsequent reviews: multiply previous interval by ease factor
			interval_days = Math.round(currentInterval * ease_factor)
		}
	}

	// Ensure minimum interval of 1 day
	interval_days = Math.max(1, interval_days)

	const next_review = new Date()
	next_review.setDate(next_review.getDate() + interval_days)

	return {
		ease_factor,
		interval_days,
		next_review,
	}
}

/**
 * Get a human-readable description of when the next review is due
 */
export function getNextReviewDescription(nextReview: Date): string {
	const now = new Date()
	const diffMs = nextReview.getTime() - now.getTime()
	const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

	if (diffDays <= 0) {
		return 'Due now'
	} else if (diffDays === 1) {
		return 'Due tomorrow'
	} else if (diffDays <= 7) {
		return `Due in ${diffDays} days`
	} else {
		return `Due in ${Math.round(diffDays / 7)} weeks`
	}
}
