import type { LinkProps } from '@/types/link';
import type { Response } from '@/types/response';
import { API } from './api';

export async function createLink({
  longUrl,
  shortenedUrl,
}: {
  longUrl: string;
  shortenedUrl: string;
}) {
  const data = await API<Response<LinkProps>>('create-link', {
    method: 'POST',
    body: JSON.stringify({ longUrl, shortenedUrl }),
  });

  return data;
}
