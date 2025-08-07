'use client'

import { useState, useEffect } from 'react'
import { createClient } from '../../../lib/supabase'
import { User } from '@supabase/supabase-js'

interface ThaiAuthControlsProps {
  onReviewModeChange?: (enabled: boolean) => void
}

export function ThaiAuthControls({ onReviewModeChange }: ThaiAuthControlsProps) {
  const [user, setUser] = useState<User | null>(null)
  const [reviewMode, setReviewMode] = useState(false)
  const [loading, setLoading] = useState(true)
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
      }
    })

    // Check for existing review mode in sessionStorage
    const savedReviewMode = sessionStorage.getItem('thai-review-mode') === 'true'
    setReviewMode(savedReviewMode)
    onReviewModeChange?.(savedReviewMode)

    return () => subscription.unsubscribe()
  }, [supabase, onReviewModeChange])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/thai`
      }
    })
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
    <div className="d-flex align-items-center gap-3">
      {!user ? (
        <button 
          onClick={handleLogin}
          className="btn btn-primary btn-sm"
        >
          Login to Thai App
        </button>
      ) : (
        <>
          <div className="form-check form-switch">
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
          <div className="text-muted small d-sm-none">
            {user.email}
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-outline-secondary btn-sm"
          >
            Logout
          </button>
        </>
      )}
    </div>
  )
}
