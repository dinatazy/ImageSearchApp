import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, ActivityIndicator } from 'react-native';
import { styles } from './Styles'
import { ImagesController } from '../../controller/images'
import { SearchBar } from 'react-native-elements';

const ImageSearch = () => {

    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);


    const loadMoreImages = async () => {
        if (searchText != '' && searchText.length >= 3) {
            setIsLoadingMore(true);
            let loadedImages = await ImagesController.getImages(searchText, page);
            let newImageList = images.concat(loadedImages);
            setImages(newImageList);
            setIsLoadingMore(false);
        }
    }

    const loadImages = async () => {
        if (searchText != '' && searchText.length >= 3) {
            setIsLoading(true);
            let loadedImages = await ImagesController.getImages(searchText, page);
            setImages(loadedImages);
            setIsLoading(false);
        }
    }

    const incrementPage = () => {
        let nextPage = page + 1;
        setPage(nextPage);
    }

    useEffect(() => {
        loadImages();
    }, [])

    useEffect(() => {
        loadMoreImages();
    }, [page])

    useEffect(() => {
        loadImages();
    }, [searchText])

    const updateSearchText = (text) => {
        setSearchText(text);
    }

    const renderFooter = () => {
        if (isLoadingMore) {
            return (
                <ActivityIndicator style={styles.loadMore} size="small" color="black" />
            )
        }
    }

    const renderLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator
                        size="large"
                        color="black"
                    />
                </View>
            )
        }
    }

    const renderImage = ({ item }) => {
        console.log('Item', item)
        return (
            <View style={styles.imageContainer}>
                <Image key={item.id} style={styles.image} source={{ uri: item.url, }} />
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
                    keyExtractor={(item) => item.url}
                    numColumns={2}
                    onEndReached={() => incrementPage()}
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
            {renderLoading()}
        </View>
    )
}



export { ImageSearch }
