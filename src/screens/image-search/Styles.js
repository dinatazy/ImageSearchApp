import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { FONT, COLOR } from '../../theme'
const { width, height } = Dimensions.get('window');


export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.BACKGROUND,
        flex: 1,
    },
    emptyScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyScreenText:{
        fontSize:20,
        fontFamily:FONT.PRIMARY_SEMI_BOLD
    },
    headerText: {
        fontFamily: FONT.PRIMARY_SEMI_BOLD,
        fontSize: 40,
        marginBottom: 20,
        marginLeft: 20,
    },
    historyText:{
        fontFamily:FONT.PRIMARY,
    },
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    loadMore: {
        alignSelf: 'center'
    },

    imageContainer: {
        marginRight: 10,
        marginBottom: 10,
    },

    image: {
        width: width * 0.45,
        height: height * 0.15
    },
    searchContainer: {
        backgroundColor: COLOR.BACKGROUND
    },
    inputContainer: {
        backgroundColor: COLOR.BACKGROUND
    }
})