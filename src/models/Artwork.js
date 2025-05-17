export class Artwork {
    constructor(image, title, artist, classification) {
      this._image = image;
      this._title = title;
      this._artist = artist;
      this._classification = classification;
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