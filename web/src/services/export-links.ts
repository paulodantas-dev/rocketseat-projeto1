const API_URL = import.meta.env.VITE_API_URL;

export const exportLinks = async () => {
  const response = await fetch(`${API_URL}/export-link`, {
    method: "GET",
  });

  const csv = await response.text();

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "links.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
