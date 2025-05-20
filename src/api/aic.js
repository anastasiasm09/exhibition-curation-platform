//Art Institute of Chicago API
import { mapAICArtworks } from '../utils/mapAICArtworks';



export async function getAICArtworks(page = 1) {
    const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=6`)
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    const artworks = mapAICArtworks(data.data)
    return {
        artworks,
        currentPage: data.pagination.current_page,
        totalPages: data.pagination.total_pages,
    };
}
