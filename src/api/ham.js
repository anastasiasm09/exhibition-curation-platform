//Harvard Art Museums API

import { mapHAMArtworks } from "@/utils/mapHAMArtworks";

export const apiKey = () => import.meta.env.VITE_HAM_API_KEY;

export async function getHAMArtworks(page = 1) {
  const url = `https://api.harvardartmuseums.org/object?classification=Paintings&apikey=${apiKey()}&size=6&page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const artworks = mapHAMArtworks(data.records)
  return {
    artworks,
    currentPage: data.info.page,
    totalPages: data.info.pages,
  };
}
