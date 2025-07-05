import type { LinkProps } from "@/types/link";
import type { Response } from "@/types/response";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getLink = async (id: string): Promise<Response<LinkProps>> => {
  const response = await fetch(`${API_URL}/get-link?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};
