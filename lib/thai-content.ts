const API_BASE_URL = process.env.NEXT_PUBLIC_THAI_API_BASE_URL ?? 'http://localhost:8000/web';

export async function getAllThaiIds() {
  const response = await fetch(`${API_BASE_URL}/thai/ids`, {
    next: { revalidate: 3600 },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch Thai content IDs');
  }
  
  const data = await response.json();
  
  return data.map((id: number) => ({
    id: String(id),
  }));
}

interface ThaiContentDto {
  id: number;
  title: string;
  content_type: string;
  language: string;
  native_text: string;
  back_template: string;
  difficulty_level: number;
  tags: string[];
  content_metadata: {
    thai_script: string;
    english_translation: string;
    ipa_transcript: string;
  };
  created_at: string;
  updated_at: string;
}

interface PaginatedThaiResponse {
  content: ThaiContentDto[];
  pagination: {
    has_next: boolean;
    current_page: number;
    per_page: number;
  };
}

export async function getAllThaiContent() {
  const response = await fetch(`${API_BASE_URL}/thai/list`, {
    next: { revalidate: 3600 },
  });


  
  if (!response.ok) {
    throw new Error('Failed to fetch Thai content list');
  }
  
  return response.json() as Promise<PaginatedThaiResponse>;
}

interface ThaiContentByIdDTO {
  front: string;
  back: string;
  examples: {
    id: number;
    native_text: string;
    ipa: string;
    body_text: string;
    extra: string;
    assets: {
      id: number;
      asset_type: string;
      asset_data: string;
    }[]
  }[];
}

export async function getThaiContentById(id: string): Promise<ThaiContentByIdDTO> {
  const response = await fetch(`${API_BASE_URL}/thai/content/${id}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Thai content with ID: ${id}`);
  }
  
  return response.json() as Promise<ThaiContentByIdDTO>;
}

export async function getThaiContentByPage(page: number, pageSize: number = 25): Promise<PaginatedThaiResponse> {
  const response = await fetch(`${API_BASE_URL}/thai/list?page=${page}&page_size=${pageSize}`, {
    next: { revalidate: 3600 },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Thai content for page ${page}`);
  }
  
  return response.json();
}

export async function getAllThaiPages(pageSize: number = 25): Promise<{ page: string }[]> {
  const pages: { page: string }[] = [];
  let currentPage = 1;
  let hasNext = true;
  
  while (hasNext) {
    try {
      const response = await getThaiContentByPage(currentPage, pageSize);
      pages.push({ page: String(currentPage) });
      
      hasNext = response.pagination.has_next;
      currentPage++;
      
      if (currentPage > 1000) {
        console.warn('Reached maximum page limit (1000) during static generation');
        break;
      }
    } catch (error) {
      console.error(`Error fetching page ${currentPage}:`, error);
      break;
    }
  }
  
  return pages;
}
