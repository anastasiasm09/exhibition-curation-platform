export class Artwork {
    constructor(id, image, title, artist, classification) {
      this._id = id;
      this._image = image;
      this._title = title;
      this._artist = artist;
      this._classification = classification;
    }
    get id() {
      return this._id
    }
  
    get image() {
      return this._image;
    }
  
    get title() {
      return this._title;
    }
  
    get artist() {
      return this._artist;
    }
  
    get classification() {
      return this._classification;
    }
  }