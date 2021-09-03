import {
    StyleSheet,
} from 'react-native';
import { FONT, COLOR } from '../../theme'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR.BACKGROUND,
        flex: 1,
    },
    headerText: {
        fontFamily: FONT.PRIMARY_SEMI_BOLD,
        fontSize: 40,
        marginBottom: 20,
        marginLeft: 20,
    },
    listContainer: {
        paddingBottom: 60,
        paddingTop: 50,
    },
    image:{
        width:40,
        height:40
    }
})