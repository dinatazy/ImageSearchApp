import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { styles } from './Styles'
import { ImagesController } from '../../controller/images'
import { HistoryController } from '../../controller/history'
import { SearchBar, Image, ListItem, Icon } from 'react-native-elements';


const ImageSearch = () => {

    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [historyTexts, setHistoryTexts] = useState([]);

    // load more images on reaching the end of the images list
    const loadMoreImages = async () => {
        if (searchText != '' && searchText.length >= 3) {
            setIsLoadingMore(true);
            let loadedImages = await ImagesController.getImages(searchText, page);
            let newImageList = images.concat(loadedImages);
            setImages(newImageList);
            setIsLoadingMore(false);
        }
    }

    // load images' urls to display them
    const loadImages = async () => {
        if (searchText != '' && searchText.length >= 3) {
            setPage(1);
            setIsLoading(true);
            let loadedImages = await ImagesController.getImages(searchText, page);
            setImages(loadedImages);
            setIsLoading(false);
        }
    }

    // load Search history texts
    const loadHistory = async () => {
        let historyTexts = await HistoryController.getSearchHistory();
        if (historyTexts) {
            setHistoryTexts(historyTexts)
        }
    }

    // setting the next page number
    const incrementPage = () => {
        let totalPages = ImagesController.total;
        let nextPage = page + 1;
        if (!isLoadingMore && nextPage <= totalPages) {
            setPage(nextPage);
        }
    }

    useEffect(() => {
        loadHistory();
        loadImages();
    }, [])

    useEffect(() => {
        if (page > 1) {
            loadMoreImages();
        }
    }, [page])

    useEffect(() => {
        loadImages();
    }, [searchText])

    const updateSearchText = (text) => {
        setSearchText(text);
    }

    const updateSearchHistory = async () => {
        let historyTexts = await HistoryController.updateSearchHistory(searchText);
        setHistoryTexts(historyTexts);
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
        return (
            <View style={styles.imageContainer}>
                <Image key={item.id} style={styles.image} source={{ uri: item.url, }} />
            </View>
        )
    }

    const renderSearchBar = () => {
        return (
            <SearchBar
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainer}
                placeholder="Type Here..."
                onChangeText={(text) => updateSearchText(text)}
                onEndEditing={() => updateSearchHistory()}
                autoCorrect={false}
                value={searchText}
                lightTheme
            />
        )
    }

    const renderSearchHistory = () => {
        if (historyTexts && historyTexts.length > 0) {
            return (
                historyTexts.map((item, i) => (
                    <ListItem containerStyle={{ backgroundColor: 'transparent' }} key={i} bottomDivider>
                        <Icon name={"history"} />
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            )
        }
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
            {renderSearchHistory()}
            {renderImages()}
            {renderLoading()}
        </View>
    )
}



export { ImageSearch }
