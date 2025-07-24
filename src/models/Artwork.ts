export class Artwork {
    _id: string;
    _image: string;
    _title: string;
    _artist: string;
    _classification: string;
    _date: string;
    _technique: string;
    _dimensions: string

    constructor(id: string, image: string, title: string, artist: string, classification: string, date: string, technique: string, dimensions: string) {
      this._id = id;
      this._image = image;
      this._title = title;
      this._artist = artist;
      this._classification = classification;
      this._date = date;
      this._technique = technique;
      this._dimensions = dimensions;
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

    get date() {
      return this._date
    }

    get technique() {
      return this._technique;
    }

    get dimensions() {
      return this._dimensions;
    }

    


    toJSON() {
      return {
        id: this.id,
        image: this.image,
        title: this.title,
        artist: this.artist,
        classification: this.classification,
        date: this.date,
        technique: this.technique,
        dimensions: this.dimensions
      }
    }
  }