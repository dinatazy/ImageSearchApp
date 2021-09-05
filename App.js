import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ImageSearch } from './src/screens/image-search/ImageSearch'

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImageSearch">
        <Stack.Screen name="ImageSearch" component={ImageSearch} options={{ title: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
