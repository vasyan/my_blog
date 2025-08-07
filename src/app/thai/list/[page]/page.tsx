import type { Metadata } from 'next'
import { getThaiContentByPage, getAllThaiPages } from '../../../../../lib/thai-content'
import { notFound } from 'next/navigation'
import { ThaiListClient } from './ThaiListClient'
import './styles.scss'

type PageProps = {
  params: { page: string }
}

export default async function ThaiListPage({ params }: PageProps) {
  const pageNumber = parseInt(params.page, 10)
  
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound()
  }
  
  try {
    const data = await getThaiContentByPage(pageNumber, 25)
    const { content, pagination } = data
    
    return <ThaiListClient content={content} pagination={pagination} pageNumber={pageNumber} />
  } catch (error) {
    console.error('Error fetching Thai content:', error)
    notFound()
  }
}

export async function generateStaticParams() {
  return getAllThaiPages(25)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageNumber = parseInt(params.page, 10)
  
  return {
    title: `Thai Content - Page ${pageNumber}`,
    description: `Browse Thai vocabulary and phrases - Page ${pageNumber} of 25 items per page`
  }
}
