import { Artwork } from "@/models/Artwork";

export function mapAICArtworks(aicDataArtworks) {
  return aicDataArtworks.map((item) => {
    const imageUrl = item.image_id
      ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
      : null;


    let classification
    if (item.classification_title) {
      classification = item.classification_title.charAt(0).toUpperCase() + item.classification_title.slice(1)
    }

    return new Artwork(
      item.id,
      imageUrl,
      item.title,
      item.artist_title || 'Unknown',
      classification || item.classification_titles[0] || 'Unknown',
      item.date_display || 'Unknown',
      item.medium_display || item.medium || 'Unknown',
      item.dimensions || 'Unknown'
    );
  });
}
