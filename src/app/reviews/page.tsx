'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase'
import { getNextDueCard, submitReview, getReviewStats, getSchedulingPreview, type DueCard } from '../../../lib/review-api'
import { ReviewScore } from '../../../lib/review-api'
import Link from 'next/link'

export default function ReviewsPage() {
	const [currentCard, setCurrentCard] = useState<DueCard | null>(null)
	const [user, setUser] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)
	const [stats, setStats] = useState<any>(null)
	const [reviewComplete, setReviewComplete] = useState(false)
	const [intervalPreview, setIntervalPreview] = useState<any>(null)
	const [lastReviewResult, setLastReviewResult] = useState<{ score: ReviewScore; message: string } | null>(null)
	const supabase = createClient()

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser()
			setUser(user)
			if (user) {
				await loadNextCard(user.id)
				await loadStats(user.id)
			}
			setLoading(false)
		}
		getUser()
	}, [supabase])

	const loadNextCard = async (userId: string) => {
		setLoading(true)
		setReviewComplete(false)
		setLastReviewResult(null) // Clear any previous review result message
		const card = await getNextDueCard(userId)
		setCurrentCard(card)
		
		// Load interval preview for the current card
		if (card) {
			const preview = await getSchedulingPreview(
				card.review_id ? {
					ease_factor: card.ease_factor!,
					interval_days: card.interval_days!,
					review_count: card.review_count!,
					stability: card.stability,
					difficulty: card.difficulty,
					lapses: card.lapses,
					state: card.state,
				} : undefined
			)
			setIntervalPreview(preview)
		}
		
		setLoading(false)
	}

	const loadStats = async (userId: string) => {
		const reviewStats = await getReviewStats(userId)
		setStats(reviewStats)
	}

	const handleReview = async (score: ReviewScore) => {
		if (!currentCard || !user || submitting) return

		setSubmitting(true)

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

		const success = await submitReview(user.id, currentCard.thai_content_id, score, existingReview)

		if (success) {
			// For failed reviews (Very Bad), immediately load next card for same-session retry
			if (score === 0) {
				setLastReviewResult({
					score: 0,
					message: "Card scheduled for review shortly. Let's try another card or retry this one!"
				})
				await loadStats(user.id)
				await loadNextCard(user.id) // Immediately get next card (might be same card for retry)
				setSubmitting(false)
				return
			}
			
			// For successful reviews, show completion message
			setReviewComplete(true)
			await loadStats(user.id)
		} else {
			alert('Failed to submit review')
		}

		setSubmitting(false)
	}

	const handleNext = async () => {
		if (!user) return
		await loadNextCard(user.id)
	}

	const getScoreText = (score: ReviewScore) => {
		switch (score) {
			case 0:
				return 'Very Bad 👎'
			case 1:
				return 'Not Good 😐'
			case 2:
				return 'Good 👍'
		}
	}

	const getScoreColor = (score: ReviewScore) => {
		switch (score) {
			case 0:
				return 'btn-danger'
			case 1:
				return 'btn-warning'
			case 2:
				return 'btn-success'
		}
	}

	const getIntervalText = (score: ReviewScore) => {
		if (!intervalPreview) return ''
		switch (score) {
			case 0:
				return intervalPreview.veryBad.description
			case 1:
				return intervalPreview.notGood.description
			case 2:
				return intervalPreview.good.description
		}
	}

	if (loading) {
		return (
			<div className="container">
				<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
					<div>Loading...</div>
				</div>
			</div>
		)
	}

	if (!user) {
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-8 mx-auto">
						<div className="card mt-4">
							<div className="card-body text-center">
								<h3 className="card-title">Sign in to Review</h3>
								<p className="card-text">Please sign in to access the spaced repetition review system.</p>
								<button
									onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
									className="btn btn-primary"
								>
									Sign in with Google
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
      <main className="">
        <div className="container">
			<div className="row">
				<div className="col-lg-8 mx-auto">
					{stats && (
						<div className="card mt-4">
							<div className="card-body">
								<h5 className="card-title">Review Statistics</h5>
								<div className="row text-center">
									<div className="col">
										<div className="h4 text-primary">{stats.dueCards}</div>
										<small className="text-muted">Due Now</small>
									</div>
									<div className="col">
										<div className="h4 text-info">{stats.totalCards}</div>
										<small className="text-muted">Total Cards</small>
									</div>
									<div className="col">
										<div className="h4 text-success">{stats.totalReviews}</div>
										<small className="text-muted">Reviews Done</small>
									</div>
								</div>
								{/* FSRS-specific stats */}
								{(stats.learningCards !== undefined || stats.reviewCards !== undefined) && (
									<div className="row text-center mt-3">
										<div className="col">
											<div className="h6 text-warning">{stats.learningCards || 0}</div>
											<small className="text-muted">Learning</small>
										</div>
										<div className="col">
											<div className="h6 text-primary">{stats.reviewCards || 0}</div>
											<small className="text-muted">Review</small>
										</div>
										<div className="col">
											<div className="h6 text-danger">{stats.relearningCards || 0}</div>
											<small className="text-muted">Relearning</small>
										</div>
									</div>
								)}
							</div>
						</div>
					)}

					{!currentCard ? (
						<div className="card mt-4">
							<div className="card-body text-center">
								<h3 className="card-title">🎉 No cards due for review!</h3>
								<p className="card-text">Check back later or add more cards to your collection.</p>
								<Link href="/thai" className="btn btn-primary">
									Browse Thai Content
								</Link>
							</div>
						</div>
					) : (
						<div className="card mt-4">
							<div className="card-body">
								{!reviewComplete ? (
									<>
										<h3 className="card-title">Review This Content</h3>
										<div className="mb-4">
											<div className="card">
												<div className="card-body">
													<Link
														href={`/thai/${currentCard.thai_content_id}`}
														target="_blank"
														rel="noopener noreferrer"
														className="btn btn-outline-primary btn-lg w-100"
													>
														Thai Content #{currentCard.thai_content_id}
														<br />
														<small>Click to open content →</small>
													</Link>
												</div>
											</div>
										</div>

										{/* Last review result message */}
										{lastReviewResult && (
											<div className={`alert ${lastReviewResult.score === 0 ? 'alert-warning' : 'alert-success'} mb-3`}>
												<small>
													<strong>
														{lastReviewResult.score === 0 ? '⚠️ ' : '✅ '}
														{lastReviewResult.message}
													</strong>
												</small>
											</div>
										)}

										{/* Card info */}
										{currentCard.review_id && (
											<div className="alert alert-info mb-3">
												<small>
													Reviews: {currentCard.review_count} | 
													Difficulty: {currentCard.difficulty ? currentCard.difficulty.toFixed(1) : 'N/A'} | 
													State: {currentCard.state || 'Unknown'}
													{currentCard.lapses && currentCard.lapses > 0 && (
														<> | Lapses: {currentCard.lapses}</>
													)}
												</small>
											</div>
										)}

										<div>
											<h5>How well do you know this content?</h5>
											<div className="row g-3">
												{[0, 1, 2].map(score => (
													<div key={score} className="col-12 col-md-4">
														<button
															onClick={() => handleReview(score as ReviewScore)}
															disabled={submitting}
															className={`btn ${getScoreColor(score as ReviewScore)} w-100 py-1`}
															style={{ minHeight: '80px' }}
														>
															<div className="d-flex flex-column align-items-center">
																<div className="fw-bold mb-1">
																	{getScoreText(score as ReviewScore)}
																</div>
																{getIntervalText(score as ReviewScore) && (
																	<small className="">
																		{getIntervalText(score as ReviewScore)}
																	</small>
																)}
															</div>
														</button>
													</div>
												))}
											</div>
										</div>

										{submitting && (
											<div className="text-center mt-3">
												<div className="spinner-border text-primary" role="status">
													<span className="visually-hidden">Submitting review...</span>
												</div>
											</div>
										)}
									</>
								) : (
									<div className="text-center">
										<h3 className="text-success">✅ Review Submitted!</h3>
										<p>Great job! Ready for the next card?</p>
										<button onClick={handleNext} className="btn btn-primary btn-lg">
											Next Card
										</button>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
    </main>
	)
}
