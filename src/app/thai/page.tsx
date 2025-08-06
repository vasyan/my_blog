import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Learn Thai for Bangkok Expats | Personalized Thai Language Learning',
  description: 'Master Thai language with content designed specifically for expats living in Bangkok. Learn practical Thai phrases for daily life, work, and cultural situations through personalized lessons based on real expat experiences.',
}

export default function ThaiContentHome() {
  redirect('/thai/list/1')
}
