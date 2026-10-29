export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function fetchBikes(params?: {
  city?: string;
  category?: string;
  q?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params?.city) query.set('city', params.city);
  if (params?.category) query.set('category', params.category);
  if (params?.q) query.set('q', params.q);
  if (params?.sort) query.set('sort', params.sort);
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());

  const url = `${API_URL}/bikes${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  
  if (!res.ok) throw new Error('Failed to fetch bikes');
  return res.json();
}

export async function fetchBikeById(id: string) {
  const res = await fetch(`${API_URL}/bikes/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch bike');
  return res.json();
}

export function getImageUrl(url: string): string {
  return url || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop&q=80';
}
