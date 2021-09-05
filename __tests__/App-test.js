/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { ImagesController } from '../src/controller/images'
import fetch from "node-fetch";


it('renders correctly', () => {
  renderer.create(<App />);
});

test('Flicker image search Api returns defined data', async () => {
  let query = 'cat';
  let page = 1;
  const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=11c40ef31e4961acf4f98c8ff4e945d7&format=json&nojsoncallback=1&page=${page}&per_page=20&text=${query}`);
  return response.json().then((data) => {
    expect(data).toBeDefined()
  });
});

test('images urls are constructed correctly ', () => {
  let images = [
    { farm: 66, id: "51427364765", secret: "407d359ea1", server: "65535" },
    { farm: 66, id: "51427145269", secret: "7668840c02", server: "65535" },
    { farm: 66, id: "51427345755", secret: "532a5847f0", server: "65535" },
    { farm: 66, id: "51427345745", secret: "546ec4bdae", server: "65535" }
  ]

  let constructedImages = ImagesController.constructImageUrl(images);
  let expectedConstructedImages = [
    { id: "51427364765", url: "http://farm66.static.flickr.com/65535/51427364765_407d359ea1.jpg" },
    { id: "51427145269", url: "http://farm66.static.flickr.com/65535/51427145269_7668840c02.jpg" },
    { id: "51427345755", url: "http://farm66.static.flickr.com/65535/51427345755_532a5847f0.jpg" },
    { id: "51427345745", url: "http://farm66.static.flickr.com/65535/51427345745_546ec4bdae.jpg" },
  ]
  expect(constructedImages).toStrictEqual(expectedConstructedImages)

});

