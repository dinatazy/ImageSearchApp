
import image from '../model/image'
import Api from '../api'

class Images {

    getImages = async (searchText, page) => {
        let data = await Api.getImages(searchText, page);
        if (data && data.photos && data.photos.photo) {
            let images = data.photos.photo;
           let constructedUrlArray = this.constructImageUrl(images);
           return constructedUrlArray;
        } else {
            return [];
        }
    }

    constructImageUrl(images) {
        let imageArray = [];
        images.forEach((image => {
            let { farm, server, id, secret } = image;
            let url = `http://farm${farm}.static.flickr.com/${server}/${id}_${secret}.jpg`
            let imageObject = {id, url};
            imageArray.push(imageObject);
        }))
        return imageArray;
    }

}

export const ImagesController = new Images();