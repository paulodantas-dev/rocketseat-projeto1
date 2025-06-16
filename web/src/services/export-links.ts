const API_URL = import.meta.env.VITE_API_URL;

export const exportLinks = async () => {
  const response = await fetch(`${API_URL}/export-link`, {
    method: "GET",
  });

  const data = await response.json();

  const url = data.data.url;

  const a = document.createElement("a");
  a.href = url;
  a.download = "shortened_links.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
