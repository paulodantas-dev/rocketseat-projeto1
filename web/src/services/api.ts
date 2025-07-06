export async function API<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  };

  return fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
  }).then(async (response) => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  });
}
