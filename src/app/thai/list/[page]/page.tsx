import type { Metadata } from 'next'
import { getThaiContentByPage, getAllThaiPages } from '../../../../../lib/thai-content'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
    
    return (
      <main className="main-container d-flex align-items-center">
        <div className="container px-2">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Thai Content - Page {pageNumber}</h1>
            <div className="pagination-info">
              <span className="text-muted">
                Showing {content.length} items (Page {pagination.current_page})
              </span>
            </div>
          </div>

          <ul className="list-unstyled">
            {content.map((item) => (
              <li key={item.id} className="mb-4">
                <Link 
                  href={`/thai/${item.id}`}
                  className="card border flex-nowrap shadow-sm project-card-item text-decoration-none"
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title}
                    </h5>
                    
                    <div className="row">
                      {/* <div className="col-md-6">
                        <p className="card-text">
                          <strong>Thai:</strong> {item.content_metadata.thai_script}
                        </p>
                        <p className="card-text">
                          <strong>English:</strong> {item.content_metadata.english_translation}
                        </p>
                      </div> */}
                      <div className="col-md-6">
                        <p className="card-text">
                          <strong>IPA:</strong> {item.content_metadata.ipa_transcript}
                        </p>
                        <p className="card-text">
                          <strong>Type:</strong> {item.content_type}
                        </p>
                      </div>
                    </div>
                    
                    {/* {item.tags.length > 0 && (
                      <div className="mt-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="badge bg-secondary me-1">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )} */}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Pagination Navigation */}
          <nav aria-label="Thai content pagination" className="mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {pageNumber > 1 && (
                  <Link 
                    href={`/thai/list/${pageNumber - 1}`}
                    className="btn btn-outline-primary"
                  >
                    ← Previous
                  </Link>
                )}
              </div>
              
              <span className="text-muted">Page {pageNumber}</span>
              
              <div>
                {pagination.has_next && (
                  <Link 
                    href={`/thai/list/${pageNumber + 1}`}
                    className="btn btn-outline-primary"
                  >
                    Next →
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </main>
    )
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
