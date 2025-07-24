import { Artwork } from "@/models/Artwork"

export type Exhibition = {
    name: string;
    id: string;
    isShared: boolean;
    author: string;
    artwork_ids: string[];
    thumbnail: string | null;
  };
  
  export type ExhibitionDetails = {
    name: string;
    id: string;
    isShared: boolean;
    author: string;
    artworks: Artwork[];
  }
