//Harvard Art Museums API

import { mapHAMArtworks } from "@/utils/mapHAMArtworks";

export const apiKey = () => import.meta.env.VITE_HAM_API_KEY;

export async function getHAMArtworks(page = 1, search = null) {
  //const url = `https://api.harvardartmuseums.org/object?classification=Paintings&apikey=${apiKey()}&size=6&page=${page}`;

  const base = 'https://api.harvardartmuseums.org/object';

  const params = new URLSearchParams({
    apikey: apiKey(),
    classification: 'Paintings',
    page: page,
    size: '6',
  });

  if (search) {
    params.append('keyword', search);
  }

  const url = `${base}?${params.toString()}`;

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
