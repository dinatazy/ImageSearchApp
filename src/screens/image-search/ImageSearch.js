import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { styles } from './Styles'
import { ImagesController } from '../../controller/images'
import { SearchBar } from 'react-native-elements';

const ImageSearch = () => {

    const [images, setImages] = useState([])
    const [searchText, setSearchText] = useState('Cat')


    const loadImages = async () => {
        let images = await ImagesController.getImages(searchText);
        setImages(images);
    }

    useEffect(() => {
        loadImages();
    }, [])

    const updateSearchText = (text) => {
        setSearchText(text);
    }

    const renderImage = ({ item }) => {
        console.log('Item', item)
        return (
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.url }} />
            </View>
        )
    }

    const renderSearchBar = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                onChangeText={(text) => updateSearchText(text)}
                value={searchText}
                lightTheme
            />
        )
    }

    const renderImages = () => {
        if (images.length > 0) {
            return (
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={images}
                    renderItem={(item) => renderImage(item)}
                    numColumns={2}
                    extraData={images}
                />
            )
        }
    }

    return (
        <View style={styles.container}>
            {renderSearchBar()}
            {renderImages()}
        </View>
    )
}



export { ImageSearch }
