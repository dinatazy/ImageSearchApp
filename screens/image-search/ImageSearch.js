import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Platform
} from 'react-native';

class ImageSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            title: '',
          });
    }



    render() {
        return (
            <View
                style={{ flex: 1 }}
            >
            </View>
        )
    }
}



export {ImageSearch}
