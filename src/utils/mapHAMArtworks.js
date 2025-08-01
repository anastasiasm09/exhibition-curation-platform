import { Artwork } from "@/models/Artwork"

export function mapHAMArtworks(hamDataArtworks) {
    return hamDataArtworks
    .filter(item => item.primaryimageurl)
    .map((item) => {
        const imageUrl = item.primaryimageurl
        const artist = item.people?.[0]?.name || 'Unknown'

        return new Artwork(
            `ham-${item.id}`,
            imageUrl,
            item.title,
            artist,
            item.classification || 'Unknown',
            item.date || 'Unknown',
            item.technique || item.medium || 'Unknown',
            item.dimensions || 'Unknown'
        )
    })
}