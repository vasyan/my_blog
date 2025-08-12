'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase'
import { User } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

interface ThaiAuthControlsProps {
  onReviewModeChange?: (enabled: boolean) => void
}

export function ThaiAuthControls({ onReviewModeChange }: ThaiAuthControlsProps) {
  const [user, setUser] = useState<User | null>(null)
  const [reviewMode, setReviewMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        // Clear review mode if user logs out
        setReviewMode(false)
        sessionStorage.removeItem('thai-review-mode')
        onReviewModeChange?.(false)
      } else {
        // Close login modal when user successfully logs in
        setShowLoginModal(false)
      }
    })

    // Check for existing review mode in sessionStorage
    const savedReviewMode = sessionStorage.getItem('thai-review-mode') === 'true'
    setReviewMode(savedReviewMode)
    onReviewModeChange?.(savedReviewMode)

    return () => subscription.unsubscribe()
  }, [supabase, onReviewModeChange])

  const handleLogin = () => {
    setShowLoginModal(true)
  }

  const handleCloseModal = () => {
    setShowLoginModal(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setReviewMode(false)
    sessionStorage.removeItem('thai-review-mode')
    onReviewModeChange?.(false)
  }

  const toggleReviewMode = () => {
    const newMode = !reviewMode
    setReviewMode(newMode)
    sessionStorage.setItem('thai-review-mode', newMode.toString())
    onReviewModeChange?.(newMode)
  }

  if (loading) {
    return <div className="text-muted">Loading...</div>
  }

  return (
    <div className="d-flex align-items-center gap-3 w-100">
      {!user ? (
        <button 
          onClick={handleLogin}
          className="btn btn-primary btn-sm"
        >
          Login
        </button>
      ) : (
        <div className="d-flex align-items-center justify-content-between gap-2 w-100">
          <div className="form-check form-switch d-flex align-items-center gap-1">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="reviewModeToggle"
              checked={reviewMode}
              onChange={toggleReviewMode}
            />
            <label className="form-check-label" htmlFor="reviewModeToggle">
              Review Mode
            </label>
          </div>
          <div className="text-muted small d-none d-sm-block">
            {user.email}
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-outline-secondary btn-sm"
          >
            Logout
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login to Thai App</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Auth
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  providers={[]}
                  redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/thai`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
