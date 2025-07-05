import type { LinkProps } from "@/types/link";
import type { Response } from "@/types/response";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const updateClick = async (id: string): Promise<Response<LinkProps>> => {
  const response = await fetch(`${API_URL}/update-click`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return await response.json();
};
