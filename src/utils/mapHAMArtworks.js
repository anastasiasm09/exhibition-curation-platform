import { Artwork } from "@/models/Artwork"

export function mapHAMArtworks(hamDataArtworks) {
    return hamDataArtworks
    .filter(item => item.primaryimageurl)
    .map((item) => {
        const imageUrl = item.primaryimageurl
        const artist = item.people?.[0]?.name || 'Unknown'

        return new Artwork(
            imageUrl,
            item.title,
            artist,
            item.classification || 'Unknown',
        )
    })
}