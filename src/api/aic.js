//Art Institute of Chicago API
import { mapAICArtworks } from '../utils/mapAICArtworks';
//`https://api.artic.edu/api/v1/artworks?page=${page}&limit=6`

export async function getAICArtworks(page = 1, search = null) {
    const endpoint = search
        ? `https://api.artic.edu/api/v1/artworks/search`
        : `https://api.artic.edu/api/v1/artworks`;

    const params = new URLSearchParams({
        fields: 'id,title,image_id,artist_display,date_display,classification_title,classification_titles',
        limit: '6',
        page: page,
    });

    if (search) {
        params.append('q', search)
    }

    const url = `${endpoint}?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const data = await res.json();
    const artworks = mapAICArtworks(data.data);
    return {
        artworks,
        currentPage: data.pagination.current_page,
        totalPages: data.pagination.total_pages,
    };
}


