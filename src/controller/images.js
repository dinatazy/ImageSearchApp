
import Api from '../api'

class Images {

    constructor() {
        this.total = 0;
    }

    // Gets the Images based on the written search text 
    getImages = async (searchText, page) => {
        try {
            let data = await Api.getImages(searchText, page);
            if (data && data.photos && data.photos.photo) {
                this.total = data.photos.total;
                let images = data.photos.photo;
                let constructedUrlArray = this.constructImageUrl(images);
                return constructedUrlArray;
            } else {
                return [];
            }
        } catch (err) {
            return [];
        }
    }

    // Construct each Image's url 
    constructImageUrl(images) {
        let imageArray = [];
        images.forEach((image => {
            let { farm, server, id, secret } = image;
            let url = `http://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`
            let imageObject = { id, url };
            imageArray.push(imageObject);
        }))
        return imageArray;
    }

}

export const ImagesController = new Images();