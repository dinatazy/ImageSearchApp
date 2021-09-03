import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { styles } from './Styles'
import { ImagesController } from '../../controller/images'
import { SearchBar } from 'react-native-elements';

const ImageSearch = () => {

    const [images, setImages] = useState([])
    const [searchText, setSearchText] = useState('')


    const loadImages = async () => {
        let images = await ImagesController.getImages();
        setImages(images);
    }

    useEffect(() => {
        loadImages();
    }, [])

    const updateSearchText = (text) => {
        setSearchText(text);
    }

    const renderHeader = () => {
        return (
            <Text style={styles.headerText}>Flicker Image results</Text>
        )
    }

    const renderImage = ({ item }) => {
        console.log('Itom', item)
        return (
            <Image style={styles.image} source={{ uri: item.url }} />
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
                    ListHeaderComponent={renderHeader()}
                    data={images}
                    renderItem={(item) => renderImage(item)}
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
