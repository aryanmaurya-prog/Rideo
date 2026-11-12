export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://rideo.onrender.com/api'
    : 'http://localhost:4000/api')
).replace(/\/+$/, '');

export async function fetchAdminApi(path: string, init: RequestInit = {}): Promise<Response> {
  const token = window.localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    throw new Error('Your session has expired. Please sign in again.');
  }

  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path.startsWith('/') ? path : `/${path}`}`, {
    ...init,
    headers,
  });
  if (response.status === 401) {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return response;
}
