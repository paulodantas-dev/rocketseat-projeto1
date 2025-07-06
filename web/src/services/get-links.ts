import type { LinkProps } from '@/types/link';
import type { Response } from '@/types/response';
import { API } from './api';

export async function getLinks() {
  const data = await API<Response<LinkProps[]>>(`list-links`, {
    method: 'GET',
  });

  return data;
}
