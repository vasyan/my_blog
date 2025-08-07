import { createBrowserClient } from '@supabase/ssr'

export type Database = {
	public: {
		Tables: {
			user_card_reviews: {
				Row: {
					id: string
					user_id: string
					thai_content_id: number
					last_reviewed: string
					next_review: string
					ease_factor: number
					interval_days: number
					review_count: number
					last_score: number | null
					created_at: string
					// FSRS fields
					stability: number
					difficulty: number
					lapses: number
					state: string
					elapsed_days: number
					scheduled_days: number
					// Card management
					tags?: any // JSONB array
				}
				Insert: {
					id?: string
					user_id: string
					thai_content_id: number
					last_reviewed?: string
					next_review?: string
					ease_factor?: number
					interval_days?: number
					review_count?: number
					last_score?: number | null
					created_at?: string
					// FSRS fields
					stability?: number
					difficulty?: number
					lapses?: number
					state?: string
					elapsed_days?: number
					scheduled_days?: number
					// Card management
					tags?: any // JSONB array
				}
				Update: {
					id?: string
					user_id?: string
					thai_content_id?: number
					last_reviewed?: string
					next_review?: string
					ease_factor?: number
					interval_days?: number
					review_count?: number
					last_score?: number | null
					created_at?: string
					// FSRS fields
					stability?: number
					difficulty?: number
					lapses?: number
					state?: string
					elapsed_days?: number
					scheduled_days?: number
					// Card management
					tags?: any // JSONB array
				}
			}
		}
	}
}

// Client-side supabase client
export const createClient = () =>
	createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)
