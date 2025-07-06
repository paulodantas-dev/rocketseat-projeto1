import { API } from './api';

export async function exportLinks() {
  const data = await API<{ data: { url: string } }>(`export-link`, {
    method: 'GET',
  });

  const url = data.data.url;

  const a = document.createElement('a');
  a.href = url;
  a.download = 'shortened_links.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
