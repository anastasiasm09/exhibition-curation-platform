//Harvard Art Museums API

import { mapHAMArtworks } from "@/utils/mapHAMArtworks";

export const apiKey = () => import.meta.env.VITE_HAM_API_KEY;

export async function getHAMArtworks(page = 1, search = null, classification = null) {

  const base = 'https://api.harvardartmuseums.org/object';

  const params = new URLSearchParams({
    apikey: apiKey(),
    page: page,
    size: '6',
  });

  if (search) {
    params.append('keyword', search);
  }

  if (classification) {
    const classificationFirstLetter = classification[0].toUpperCase() + classification.slice(1)
    params.append('classification', classificationFirstLetter);
  } else {
    params.append('classification', 'Paintings');
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