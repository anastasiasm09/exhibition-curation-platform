import { Artwork } from "@/models/Artwork";

export function mapAICArtworks(aicDataArtworks) {
  return aicDataArtworks.map((item) => {
    const imageUrl = item.image_id
      ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
      : null;


    const classification = item.classification_title.charAt(0).toUpperCase() + item.classification_title.slice(1)
    //const classification_titles = item.classification_titles.charAt(0).toUpperCase() + item.classification_titles.slice(1)


    return new Artwork(
      item.id,
      imageUrl,
      item.title,
      item.artist_title || 'Unknown',
      classification || item.classification_titles[0] || 'Unknown'
    );
  });
}
