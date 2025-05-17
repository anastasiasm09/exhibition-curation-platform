//Harvard Art Museums API

import { mapHAMArtworks } from "@/utils/mapHAMArtworks";

export const apiKey = () => import.meta.env.VITE_HAM_API_KEY;

export async function getHAMArtworks() {
    const url = `https://api.harvardartmuseums.org/object?classification=Paintings&apikey=${apiKey()}&size=6`;
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    const artworks = mapHAMArtworks(data.records)
    return artworks;
  }
