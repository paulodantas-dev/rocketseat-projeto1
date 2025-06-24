import type { Response } from "@/types/response";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const deleteLink = async (linkId: string): Promise<Response<null>> => {
  const response = await fetch(`${API_URL}/delete-link/${linkId}`, {
    method: "DELETE",
  });

  return await response.json();
};
