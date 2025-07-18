import { Artwork } from "@/models/Artwork"
import { getGoogleToken } from "./Auth"
import { Exhibition } from "@/models/Exhibition"

export function createExhibition(name : string, description : string) {
    return fetch(
        "https://exhibitions-api-9f6e09.deno.dev/api/exhibitions",
        {
            method: "POST",
            headers: {
                "Authorization": getGoogleToken() ?? "",
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
        `https://exhibitions-api-9f6e09.deno.dev/api/exhibitions/${exhibitionId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": getGoogleToken() ?? "",
                'Content-Type': 'application/json'
            }
        }

    )
}


export function addArtworkToExhibition(exhibitionId: string, artwork: Artwork) {
    return fetch(
        `https://exhibitions-api-9f6e09.deno.dev/api/exhibitions/${exhibitionId}/artworks`,
        {
            method: "POST",
            headers: {
                "Authorization": getGoogleToken() ?? "",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artwork)
        }
    )
}


export function deleteArtworkFromExhibition(exhibitionId: string, artworkId: string) {
    return fetch(
        `https://exhibitions-api-9f6e09.deno.dev/api/exhibitions/${exhibitionId}/artworks/${artworkId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": getGoogleToken() ?? "",
                'Content-Type': 'application/json'
            },
        }
    )
}


export function getNumberOfArworks(exhibition: Exhibition) {
    return exhibition.artwork_ids.length
}


export function getExhibitionImage(exhibition: Exhibition) {
    return exhibition.thumbnail
} 


export function renameExhibition(exhibitionId: string, newName: string) {
    return fetch(
        `https://exhibitions-api-9f6e09.deno.dev/api/exhibitions/${exhibitionId}?name=${newName}`,
        {
            method: "PATCH",
            headers: {
                "Authorization": getGoogleToken() ?? "",
                'Content-Type': 'application/json'
            },
        }
    )
}


export function getAllExhibitions(): Promise<Exhibition[]> {
    return fetch(
        `https://exhibitions-api-9f6e09.deno.dev/api/exhibitions`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getGoogleToken() ?? ""}`,
                'Content-Type': 'application/json'
            },
        }
    ).then(res => res.json())
}


export function isArtworkInExhibition(exhibition: Exhibition, artworkId: string) { 
    return exhibition.artwork_ids.includes(artworkId)
}
