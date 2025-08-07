'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import type { User } from '@supabase/supabase-js'

export default function ReviewsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const supabase = createClient()

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser()
			setUser(user)
			setLoading(false)
		}

		getUser()

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null)
		})

		return () => subscription.unsubscribe()
	}, [supabase.auth])

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
      <main className="main-container d-flex align-items-center">
        <div className="container px-2">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card mt-5">
                <div className="card-body">
                  <h1 className="card-title text-center mb-4">Login to Review</h1>
                  <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={['google']}
                    redirectTo={`${window.location.origin}/reviews`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
			</main>
		)
	}

	return (
    <main className="main-container">
      <div className="container px-2">
				<nav className="d-flex justify-content-between align-items-center py-3 border-bottom">
					<h2 className="mb-0">Spaced Repetition</h2>
					<div className="d-flex align-items-center gap-3">
						<span className="text-muted">Hello, {user.email}</span>
						<button
							className="btn btn-outline-secondary btn-sm"
							onClick={() => supabase.auth.signOut()}
						>
							Sign Out
						</button>
					</div>
				</nav>
			</div>
			{children}
		</main>
	)
}
