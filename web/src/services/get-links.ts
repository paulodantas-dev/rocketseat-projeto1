import type { LinkProps } from "@/types/link";
import type { Response } from "@/types/response";

const API_URL = import.meta.env.VITE_API_URL;

export const getLinks = async (): Promise<Response<LinkProps[]>> => {
  const response = await fetch(`${API_URL}/list-links`);
  return await response.json();
};
