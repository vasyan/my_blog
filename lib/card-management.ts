import { createClient } from './supabase'

/**
 * Bury a card - marks it so it won't appear in reviews
 */
export async function buryCard(userId: string, thaiContentId: number): Promise<boolean> {
  const supabase = createClient()
  
  // Check if card exists for user
  const { data: existingCard } = await supabase
    .from('user_card_reviews')
    .select('id, tags')
    .eq('user_id', userId)
    .eq('thai_content_id', thaiContentId)
    .single()

  if (existingCard) {
    // Update existing card - add buried tag if not already present
    const currentTags = existingCard.tags || []
    if (!currentTags.includes('buried')) {
      const { error } = await supabase
        .from('user_card_reviews')
        .update({ 
          tags: [...currentTags, 'buried']
        })
        .eq('id', existingCard.id)
      
      return !error
    }
    return true // Already buried
  } else {
    // Create new card with buried tag
    const { error } = await supabase
      .from('user_card_reviews')
      .insert({
        user_id: userId,
        thai_content_id: thaiContentId,
        tags: ['buried'],
        // Set far future date so it never appears as due
        next_review: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 100).toISOString(), // 100 years
        ease_factor: 2.5,
        interval_days: 36500, // 100 years
        review_count: 0,
        last_reviewed: new Date().toISOString()
      })
    
    return !error
  }
}

/**
 * Unbury a card - removes the buried tag
 */
export async function unburyCard(userId: string, thaiContentId: number): Promise<boolean> {
  const supabase = createClient()
  
  const { data: existingCard } = await supabase
    .from('user_card_reviews')
    .select('id, tags')
    .eq('user_id', userId)
    .eq('thai_content_id', thaiContentId)
    .single()

  if (existingCard && existingCard.tags) {
    const newTags = existingCard.tags.filter((tag: string) => tag !== 'buried')
    const { error } = await supabase
      .from('user_card_reviews')
      .update({ tags: newTags })
      .eq('id', existingCard.id)
    
    return !error
  }
  
  return true // Nothing to unbury
}

/**
 * Check if a card is buried
 */
export async function isCardBuried(userId: string, thaiContentId: number): Promise<boolean> {
  const supabase = createClient()
  
  const { data } = await supabase
    .from('user_card_reviews')
    .select('tags')
    .eq('user_id', userId)
    .eq('thai_content_id', thaiContentId)
    .single()

  return data?.tags?.includes('buried') || false
}