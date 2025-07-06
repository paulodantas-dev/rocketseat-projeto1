import type { LinkProps } from '@/types/link';
import type { Response } from '@/types/response';
import { API } from './api';

export async function getLink(id: string) {
  const data = await API<Response<LinkProps>>(`get-link?id=${id}`, {
    method: 'GET',
  });

  return data;
}
