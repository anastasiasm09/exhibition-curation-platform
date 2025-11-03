import { Artwork } from "@/models/Artwork"
import { getGoogleToken } from "./Auth"
import { Exhibition, ExhibitionDetails } from "@/models/Exhibition"
export const exbApi = () => (import.meta as any).env.VITE_EXHIBITIONS_API_KEY;


export function createExhibition(name: string, description: string) {
    return fetch(
        `${exbApi()}/api/exhibitions`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                description,
            })
        }
    )
}

export function deleteExhibition(exhibitionId: string) {
    return fetch(
        `${exbApi()}/api/exhibitions/${exhibitionId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            }
        }

    )
}

export function addArtworkToExhibition(exhibitionId: string, artwork: Artwork) {
    return fetch(
        `${exbApi()}/api/exhibitions/${exhibitionId}/artworks`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artwork)
        }
    )
}

export function deleteArtworkFromExhibition(exhibitionId: string, artworkId: string) {
    return fetch(
        `${exbApi()}/api/exhibitions/${exhibitionId}/artworks/${artworkId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function getNumberOfArworks(exhibition: Exhibition) {
    return exhibition.artwork_ids.length
}

export function renameExhibition(exhibitionId: string, newName: string) {
    return fetch(
        `${exbApi()}/api/exhibitions/${exhibitionId}?name=${newName}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function getEhibitionDetails(exhibitionId: string): Promise<ExhibitionDetails> {
    return fetch(
        `${exbApi()}/publicapi/exhibitions/${exhibitionId}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
        }
    ).then(res => res.json())
}

export function getAllExhibitions(): Promise<Exhibition[]> {
    return fetch(
        `${exbApi()}/api/exhibitions`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
        }
    ).then(res => res.json())
}

export function isArtworkInExhibition(exhibition: Exhibition, artwork: Artwork) {
    return exhibition.artwork_ids.includes(artwork.id);
}

export function getUserDetails() {
    return fetch(
        `${exbApi()}/api/me`,
        {
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch user data");
            }
            return res.json();
        })
}

export function markAnExhibitionAsShared(exhibitionId: string): void {
    fetch(
        `${exbApi()}/api/exhibitions/${exhibitionId}/share`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function stopSharingAnExhibition(exhibitionId: string): void {
    fetch(
        `${exbApi()}/api/exhibitions/${exhibitionId}/share`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
        }
    )
}
