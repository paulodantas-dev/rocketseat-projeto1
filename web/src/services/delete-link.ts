import { API } from './api';

export async function deleteLink(linkId: string) {
  return await API(`delete-link/${linkId}`, {
    method: 'DELETE',
  });
}
