import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, ActivityIndicator } from 'react-native';
import { styles } from './Styles'
import { ImagesController } from '../../controller/images'
import { SearchBar } from 'react-native-elements';

const ImageSearch = () => {

    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')


    const loadImages = async () => {
        let loadedImages = await ImagesController.getImages(searchText, page);
        let newImageList = images.concat(loadedImages);
        setImages(newImageList);
    }

    const loadMoreImages = async () => {
        let nextPage = page + 1;
        setPage(nextPage);
    }

    useEffect(() => {
        loadImages();
    }, [])

    useEffect(() => {
        setImages([]);
    }, [searchText])

    useEffect(() => {
        loadImages();
    }, [searchText, page])

    const updateSearchText = (text) => {
        setSearchText(text);
    }

    const renderFooter = () => {
        return (
            <ActivityIndicator style={styles.loadMore} size="small" color="black" />
        )
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
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    onEndReached={() => loadMoreImages()}
                    ListFooterComponent={renderFooter()}
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
