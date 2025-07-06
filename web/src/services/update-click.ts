import type { LinkProps } from '@/types/link';
import type { Response } from '@/types/response';
import { API } from './api';

export async function updateClick(id: string) {
  const data = await API<Response<LinkProps>>(`update-click`, {
    method: 'POST',
    body: JSON.stringify({ id }),
  });

  return data;
}
