import type { LinkProps } from "@/types/link";
import type { Response } from "@/types/response";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function createLink(
  longUrl: string
): Promise<Response<LinkProps>> {
  const response = await fetch(`${API_URL}/create-link`, {
    method: "POST",
    body: JSON.stringify({ longUrl }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
