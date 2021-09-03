
class Api {

    getImages = async (query) => {
        const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=11c40ef31e4961acf4f98c8ff4e945d7&format=json&nojsoncallback=1&per_page=20&text=${query}`);
        let data = await response.json();
        console.log('DATA', data);
        return data;
    }

}

export default new Api();
