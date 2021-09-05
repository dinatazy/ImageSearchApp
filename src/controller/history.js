import AsyncStorage from '@react-native-async-storage/async-storage';


class History {

    //Get Search history saved in storage
    getSearchHistory = async () => {
        try {
            let historyTexts = await AsyncStorage.getItem('historyTexts')
            if (historyTexts) {
                historyTexts = JSON.parse(historyTexts);
                return historyTexts;
            } else {
                return [];
            }
        } catch (err) {
            return []
        }
    }

    // Update the search history array by inserting a new search text and limiting the saved texts to the recent 3 texts
    updateSearchHistory = async (searchText) => {
        if (searchText && searchText.length >= 3) {
            let historyTexts = await AsyncStorage.getItem('historyTexts')

            if (historyTexts) {
                historyTexts = JSON.parse(historyTexts)
            } else {
                historyTexts = [];
            }

            if (historyTexts.length < 3) {
                historyTexts.unshift({ title: searchText });
            } else {
                historyTexts.pop();
                historyTexts.unshift({ title: searchText });
            }

            await AsyncStorage.setItem('historyTexts', JSON.stringify(historyTexts));
            return historyTexts;
        }
    }

}

export const HistoryController = new History();