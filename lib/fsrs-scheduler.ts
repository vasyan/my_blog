import { FSRS, Card, Rating, State, RecordLog, fsrs, createEmptyCard, ReviewLog } from 'ts-fsrs'

export interface FSRSCard {
	due: Date
	stability: number
	difficulty: number
	elapsed_days: number
	scheduled_days: number
	reps: number
	lapses: number
	state: State
	last_review?: Date
}

export interface FSRSReviewResult {
	card: Card
	log: ReviewLog
}

export type FSRSRating = Rating // 1=Again, 2=Hard, 3=Good, 4=Easy

// Map our 3-point system to FSRS 4-point system
export function mapScoreToFSRSRating(score: 0 | 1 | 2): FSRSRating {
	switch (score) {
		case 0: // Very Bad -> Again
			return Rating.Again
		case 1: // Not Good -> Hard
			return Rating.Hard
		case 2: // Good -> Good
			return Rating.Good
	}
}

// Initialize FSRS with default parameters
// You can customize these parameters based on your needs
const DEFAULT_PARAMS = {
	request_retention: 0.9, // Target 90% retention rate
	maximum_interval: 365, // Max interval of 1 year
	w: [
		0.4197, 1.1869, 3.0412, 15.2441, 7.1434, 0.6477, 1.0007, 0.0674, 1.6597,
		0.1712, 1.1178, 2.0225, 0.0904, 0.3025, 2.1214, 0.2498, 2.9466, 0.4891,
		0.6468,
	], // Default FSRS-4.5 weights
	enable_fuzz: true, // Add small randomization to prevent pattern memorization
	enable_short_term: true, // Enable short-term scheduling
}

export class FSRSScheduler {
	private fsrs: FSRS

	constructor(params = DEFAULT_PARAMS) {
		this.fsrs = fsrs(params)
	}

	/**
	 * Parse state string to State enum
	 */
	private parseState(stateStr?: string): State | null {
		if (!stateStr) return null
		switch (stateStr.toLowerCase()) {
			case 'new':
				return State.New
			case 'learning':
				return State.Learning
			case 'review':
				return State.Review
			case 'relearning':
				return State.Relearning
			default:
				return null
		}
	}

	/**
	 * Create a new card for first-time review
	 */
	createNewCard(): Card {
		return createEmptyCard()
	}

	/**
	 * Convert database record to FSRS Card
	 */
	databaseToCard(dbRecord: {
		next_review: string
		ease_factor: number
		interval_days: number
		review_count: number
		last_reviewed?: string
		// New fields we'll need to add
		stability?: number
		difficulty?: number
		lapses?: number
		state?: string
	}): Card {
		// If we have FSRS-specific fields, use them
		if (dbRecord.stability !== undefined && dbRecord.difficulty !== undefined) {
			return {
				due: new Date(dbRecord.next_review),
				stability: dbRecord.stability,
				difficulty: dbRecord.difficulty,
				elapsed_days: 0,
				scheduled_days: dbRecord.interval_days,
				reps: dbRecord.review_count,
				lapses: dbRecord.lapses || 0,
				state: this.parseState(dbRecord.state) || State.Review,
				last_review: dbRecord.last_reviewed ? new Date(dbRecord.last_reviewed) : undefined,
				learning_steps: 0, // Current step in learning/relearning stages
			}
		}

		// Otherwise, migrate from old SM2-style data
		// This is an approximation - actual values would be recalculated over time
		const state = dbRecord.review_count === 0 ? State.New : State.Review

		// Approximate stability from interval and ease factor
		// In FSRS, stability is roughly the interval at which retention is 90%
		const stability = dbRecord.interval_days * 0.9

		// Approximate difficulty from ease factor
		// SM2 ease factor of 2.5 is neutral, FSRS difficulty of 5 is neutral
		// SM2 range: 1.3-4.0, FSRS range: 1-10
		const difficulty = Math.max(1, Math.min(10, (2.5 - dbRecord.ease_factor) * 2 + 5))

		return {
			due: new Date(dbRecord.next_review),
			stability: stability,
			difficulty: difficulty,
			elapsed_days: 0,
			scheduled_days: dbRecord.interval_days,
			reps: dbRecord.review_count,
			lapses: 0, // We don't track this in the old system
			state: state,
			last_review: dbRecord.last_reviewed ? new Date(dbRecord.last_reviewed) : undefined,
			learning_steps: 0, // Current step in learning/relearning stages
		}
	}

	/**
	 * Schedule the next review based on user rating
	 */
	scheduleReview(
		card: Card,
		rating: FSRSRating,
		reviewTime: Date = new Date()
	): FSRSReviewResult {
		const schedulingCards = this.fsrs.repeat(card, reviewTime)
		
		// Find the record item for the given rating
		let selectedItem
		const schedulingArray = Array.from(schedulingCards)
		for (let i = 0; i < schedulingArray.length; i++) {
			const item = schedulingArray[i]
			if (item.log.rating === rating) {
				selectedItem = item
				break
			}
		}
		
		if (!selectedItem) {
			throw new Error(`Rating ${rating} not found in scheduling results`)
		}
		
		return {
			card: selectedItem.card,
			log: selectedItem.log,
		}
	}

	/**
	 * Get all possible scheduling options for a card
	 * This is useful for showing the user what intervals they'll get for each rating
	 */
	getSchedulingOptions(card: Card, reviewTime: Date = new Date()) {
		const schedulingCards = this.fsrs.repeat(card, reviewTime)
		
		// Create a map of rating to scheduling info
		const optionsMap = new Map()
		const schedulingArray = Array.from(schedulingCards)
		for (let i = 0; i < schedulingArray.length; i++) {
			const item = schedulingArray[i]
			optionsMap.set(item.log.rating, {
				interval: item.card.scheduled_days,
				nextReview: item.card.due,
			})
		}
		
		return {
			again: optionsMap.get(Rating.Again),
			hard: optionsMap.get(Rating.Hard),
			good: optionsMap.get(Rating.Good),
			easy: optionsMap.get(Rating.Easy),
		}
	}

	/**
	 * Convert FSRS card back to database format
	 */
	cardToDatabase(card: Card) {
		return {
			next_review: card.due.toISOString(),
			interval_days: Math.round(card.scheduled_days),
			review_count: card.reps,
			// FSRS-specific fields
			stability: card.stability,
			difficulty: card.difficulty,
			lapses: card.lapses,
			state: card.state,
			// Keep ease_factor for backwards compatibility (approximate from difficulty)
			ease_factor: Math.max(1.3, Math.min(4.0, 2.5 - (card.difficulty - 5) * 0.15)),
		}
	}

	/**
	 * Get a human-readable description of when the next review is due
	 */
	getNextReviewDescription(nextReview: Date): string {
		const now = new Date()
		const diffMs = nextReview.getTime() - now.getTime()
		const diffMinutes = Math.round(diffMs / (1000 * 60))
		const diffHours = Math.round(diffMs / (1000 * 60 * 60))
		const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

		// Handle overdue or immediate
		if (diffMs <= 0) {
			return 'Due now'
		}
		
		// Handle short intervals (minutes)
		if (diffMinutes < 60) {
			return diffMinutes === 1 ? '1 min' : `${diffMinutes} mins`
		}
		
		// Handle medium intervals (hours)
		if (diffHours < 24) {
			return diffHours === 1 ? '1 hour' : `${diffHours} hours`
		}
		
		// Handle longer intervals (days/weeks/months/years)
		if (diffDays === 1) {
			return 'Tomorrow'
		} else if (diffDays <= 7) {
			return `${diffDays} days`
		} else if (diffDays <= 30) {
			return `${Math.round(diffDays / 7)} weeks`
		} else if (diffDays <= 365) {
			return `${Math.round(diffDays / 30)} months`
		} else {
			return `${Math.round(diffDays / 365)} year${Math.round(diffDays / 365) > 1 ? 's' : ''}`
		}
	}

	/**
	 * Rollback a card to its previous state (useful for undo functionality)
	 */
	rollback(card: Card, log: ReviewLog): Card {
		return this.fsrs.rollback(card, log)
	}

	/**
	 * Forget a card (reset it to new state)
	 */
	forget(card: Card, resetCount: boolean = false): Card {
		const result = this.fsrs.forget(card, new Date(), resetCount)
		// forget returns a RecordLogItem, we need to extract the card
		return result.card
	}
}

// Export a default instance
export const fsrsScheduler = new FSRSScheduler()